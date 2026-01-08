from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
import bcrypt
import uuid
import shutil
from models import *

ROOT_DIR = Path(__file__).parent
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Serve uploaded files statically
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================
# HELPER FUNCTIONS
# ============================================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

async def init_admin():
    """Initialize admin settings with default password"""
    existing = await db.admin_settings.find_one({"id": "admin_settings"})
    if not existing:
        default_password = hash_password("heeloly2025")
        admin = {
            "id": "admin_settings",
            "password_hash": default_password,
            "author_name": "Heeloly Upasani",
            "author_bio": "",
            "author_photo": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
            "author_email": "heelolyverse@gmail.com",
            "social_links": {
                "instagram": "https://www.instagram.com/authorheelolyupasani/",
                "goodreads": "https://www.goodreads.com/author/show/54936700.Heeloly_Upasani",
                "twitter": "https://x.com/heelolyupasani",
                "facebook": "#",
                "pinterest": "#",
                "spotify": "#"
            },
            "hero_image": "https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png",
            "hero_title": "Enter In Grey",
            "updated_at": datetime.utcnow()
        }
        await db.admin_settings.insert_one(admin)
        logger.info("Admin settings initialized")

async def init_hero_settings():
    """Ensure hero settings exist in admin_settings"""
    existing = await db.admin_settings.find_one({"id": "admin_settings"})
    if existing and "hero_image" not in existing:
        await db.admin_settings.update_one(
            {"id": "admin_settings"},
            {"$set": {
                "hero_image": "https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png",
                "hero_title": "Enter In Grey"
            }}
        )

# ============================================
# PUBLIC ROUTES
# ============================================

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload an image file and return the URL"""
    # Validate file type
    allowed_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Allowed: JPEG, PNG, GIF, WEBP")
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = UPLOADS_DIR / unique_filename
    
    # Save the file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        logger.error(f"Error saving file: {e}")
        raise HTTPException(status_code=500, detail="Failed to save file")
    
    # Return the URL (will be served from /uploads/)
    return {"url": f"/uploads/{unique_filename}", "filename": unique_filename}

@api_router.get("/")
async def root():
    return {"message": "Heeloly Upasani Author Website API"}

# Newsletter Routes
@api_router.post("/newsletter/subscribe", response_model=Newsletter)
async def subscribe_newsletter(input: NewsletterCreate):
    existing = await db.newsletters.find_one({"email": input.email})
    if existing:
        if existing.get("active", True):
            raise HTTPException(status_code=400, detail="Email already subscribed")
        await db.newsletters.update_one(
            {"email": input.email},
            {"$set": {"active": True, "subscribed_at": datetime.utcnow()}}
        )
        return Newsletter(**existing)
    
    newsletter = Newsletter(email=input.email)
    await db.newsletters.insert_one(newsletter.dict())
    return newsletter

# Contact Routes
@api_router.post("/contact/inquiry", response_model=Contact)
async def submit_inquiry(input: ContactCreate):
    contact = Contact(**input.dict())
    await db.contacts.insert_one(contact.dict())
    return contact

# Books Routes (Public)
@api_router.get("/books", response_model=List[Book])
async def get_books():
    books = await db.books.find().sort("created_at", -1).to_list(1000)
    return [Book(**book) for book in books]

@api_router.get("/books/{book_id}", response_model=Book)
async def get_book(book_id: str):
    book = await db.books.find_one({"id": book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return Book(**book)

# FAQ Routes (Public)
@api_router.get("/faqs", response_model=List[FAQ])
async def get_faqs():
    faqs = await db.faqs.find().sort("order", 1).to_list(1000)
    return [FAQ(**faq) for faq in faqs]

# Extras Routes (Public)
@api_router.get("/extras", response_model=List[ExtraLink])
async def get_extras():
    extras = await db.extras.find({"active": True}).sort("order", 1).to_list(1000)
    return [ExtraLink(**extra) for extra in extras]

# Author Info (Public)
@api_router.get("/author")
async def get_author_info():
    settings = await db.admin_settings.find_one({"id": "admin_settings"})
    if not settings:
        raise HTTPException(status_code=404, detail="Author info not found")
    return {
        "name": settings.get("author_name", "Heeloly Upasani"),
        "bio": settings.get("author_bio", ""),
        "photo": settings.get("author_photo", ""),
        "email": settings.get("author_email", ""),
        "social_links": settings.get("social_links", {})
    }

@api_router.get("/hero")
async def get_hero_settings():
    settings = await db.admin_settings.find_one({"id": "admin_settings"})
    if not settings:
        return {
            "hero_image": "https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png",
            "hero_title": "Enter In Grey"
        }
    return {
        "hero_image": settings.get("hero_image", "https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png"),
        "hero_title": settings.get("hero_title", "Enter In Grey")
    }

# ============================================
# ADMIN ROUTES
# ============================================

# Admin Login
@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    settings = await db.admin_settings.find_one({"id": "admin_settings"})
    if not settings:
        await init_admin()
        settings = await db.admin_settings.find_one({"id": "admin_settings"})
    
    if verify_password(credentials.password, settings["password_hash"]):
        return {"success": True, "message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid password")

# Change Password
@api_router.post("/admin/change-password")
async def change_password(data: PasswordChange):
    settings = await db.admin_settings.find_one({"id": "admin_settings"})
    if not settings:
        raise HTTPException(status_code=404, detail="Admin settings not found")
    
    if not verify_password(data.current_password, settings["password_hash"]):
        raise HTTPException(status_code=401, detail="Current password is incorrect")
    
    new_hash = hash_password(data.new_password)
    await db.admin_settings.update_one(
        {"id": "admin_settings"},
        {"$set": {"password_hash": new_hash, "updated_at": datetime.utcnow()}}
    )
    return {"success": True, "message": "Password changed successfully"}

# Newsletter Management
@api_router.get("/admin/newsletters", response_model=List[Newsletter])
async def get_newsletters():
    newsletters = await db.newsletters.find().sort("subscribed_at", -1).to_list(1000)
    return [Newsletter(**n) for n in newsletters]

# Contact Management
@api_router.get("/admin/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find().sort("submitted_at", -1).to_list(1000)
    return [Contact(**c) for c in contacts]

# Books Management (Admin)
@api_router.post("/admin/books", response_model=Book)
async def create_book(book: BookCreate):
    new_book = Book(**book.dict())
    await db.books.insert_one(new_book.dict())
    return new_book

@api_router.put("/admin/books/{book_id}", response_model=Book)
async def update_book(book_id: str, book: BookUpdate):
    existing = await db.books.find_one({"id": book_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Book not found")
    
    update_data = {k: v for k, v in book.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.books.update_one({"id": book_id}, {"$set": update_data})
    updated = await db.books.find_one({"id": book_id})
    return Book(**updated)

@api_router.delete("/admin/books/{book_id}")
async def delete_book(book_id: str):
    result = await db.books.delete_one({"id": book_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"success": True, "message": "Book deleted"}

# FAQ Management (Admin)
@api_router.post("/admin/faqs", response_model=FAQ)
async def create_faq(faq: FAQCreate):
    new_faq = FAQ(**faq.dict())
    await db.faqs.insert_one(new_faq.dict())
    return new_faq

@api_router.put("/admin/faqs/{faq_id}", response_model=FAQ)
async def update_faq(faq_id: str, faq: FAQUpdate):
    existing = await db.faqs.find_one({"id": faq_id})
    if not existing:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    update_data = {k: v for k, v in faq.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.faqs.update_one({"id": faq_id}, {"$set": update_data})
    updated = await db.faqs.find_one({"id": faq_id})
    return FAQ(**updated)

@api_router.delete("/admin/faqs/{faq_id}")
async def delete_faq(faq_id: str):
    result = await db.faqs.delete_one({"id": faq_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"success": True, "message": "FAQ deleted"}

# Extras Management (Admin)
@api_router.post("/admin/extras", response_model=ExtraLink)
async def create_extra(extra: ExtraLinkCreate):
    new_extra = ExtraLink(**extra.dict())
    await db.extras.insert_one(new_extra.dict())
    return new_extra

@api_router.put("/admin/extras/{extra_id}", response_model=ExtraLink)
async def update_extra(extra_id: str, extra: ExtraLinkUpdate):
    existing = await db.extras.find_one({"id": extra_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Extra not found")
    
    update_data = {k: v for k, v in extra.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.extras.update_one({"id": extra_id}, {"$set": update_data})
    updated = await db.extras.find_one({"id": extra_id})
    return ExtraLink(**updated)

@api_router.delete("/admin/extras/{extra_id}")
async def delete_extra(extra_id: str):
    result = await db.extras.delete_one({"id": extra_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Extra not found")
    return {"success": True, "message": "Extra deleted"}

# Author Info Management (Admin)
@api_router.put("/admin/author")
async def update_author_info(data: dict):
    await db.admin_settings.update_one(
        {"id": "admin_settings"},
        {"$set": {**data, "updated_at": datetime.utcnow()}}
    )
    return {"success": True, "message": "Author info updated"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db():
    await init_admin()
    await init_hero_settings()
    logger.info("Database initialized")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
