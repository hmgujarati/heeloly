from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Newsletter Model
class Newsletter(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True

class NewsletterCreate(BaseModel):
    email: EmailStr

# Contact Model
class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

# Book Model
class Book(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    author: str = "Heeloly Upasani"
    series: Optional[str] = "Standalone"
    book_number: Optional[int] = None
    cover_image: str
    blurb: str
    genres: List[str] = []
    status: str = "available"  # available, upcoming, new-release
    release_date: Optional[str] = None
    buy_links: List[dict] = []  # [{"name": "Amazon", "url": "https://..."}]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BookCreate(BaseModel):
    title: str
    author: str = "Heeloly Upasani"
    series: Optional[str] = "Standalone"
    book_number: Optional[int] = None
    cover_image: str
    blurb: str
    genres: List[str] = []
    status: str = "available"
    release_date: Optional[str] = None
    buy_links: List[dict] = []

class BookUpdate(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    series: Optional[str] = None
    book_number: Optional[int] = None
    cover_image: Optional[str] = None
    blurb: Optional[str] = None
    genres: Optional[List[str]] = None
    status: Optional[str] = None
    release_date: Optional[str] = None
    buy_links: Optional[List[dict]] = None

# FAQ Model
class FAQItem(BaseModel):
    question: str
    answer: str
    has_link: bool = False
    link_text: Optional[str] = None
    link_url: Optional[str] = None

class FAQ(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    questions: List[FAQItem] = []
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class FAQCreate(BaseModel):
    category: str
    questions: List[FAQItem] = []
    order: int = 0

class FAQUpdate(BaseModel):
    category: Optional[str] = None
    questions: Optional[List[FAQItem]] = None
    order: Optional[int] = None

# Extras/Links Model
class ExtraLink(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str  # lucide-react icon name
    url: str
    order: int = 0
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ExtraLinkCreate(BaseModel):
    title: str
    description: str
    icon: str
    url: str
    order: int = 0
    active: bool = True

class ExtraLinkUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    url: Optional[str] = None
    order: Optional[int] = None
    active: Optional[bool] = None

# Admin Settings Model
class AdminSettings(BaseModel):
    id: str = "admin_settings"
    password_hash: str
    author_name: str = "Heeloly Upasani"
    author_bio: str = ""
    author_photo: str = ""
    author_email: str = ""
    social_links: dict = {}
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PasswordChange(BaseModel):
    current_password: str
    new_password: str

class AdminLogin(BaseModel):
    password: str
