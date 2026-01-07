import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime
import bcrypt

load_dotenv()

mongo_url = os.environ.get('MONGO_URL')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

async def seed_database():
    print("🌱 Seeding database with Heeloly Upasani's data...")
    
    # Seed Books
    existing_books = await db.books.count_documents({})
    if existing_books == 0:
        books = [
            {
                "id": "journey-within-2024",
                "title": "A Journey Within",
                "author": "Heeloly Upasani",
                "series": "Standalone",
                "book_number": None,
                "cover_image": "https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/f4zt45d6_book2.jpg",
                "blurb": "\"A Journey Within\" is a heartfelt collection of poetry that explores the depths of life, dreams, self-discovery, and love. Through verses that touch on resilience, emotions, and the beauty of the human experience, this book invites readers to reflect, heal, and embrace their own inner journey.",
                "genres": ["Poetry", "Self-Discovery", "Personal Growth"],
                "status": "new-release",
                "release_date": "2024",
                "buy_links": [
                    {"name": "Amazon", "url": "https://amazon.com"},
                    {"name": "Goodreads", "url": "https://goodreads.com"}
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "upcoming-book-1",
                "title": "Coming Soon",
                "author": "Heeloly Upasani",
                "series": "TBA",
                "book_number": None,
                "cover_image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
                "blurb": "A new story is brewing... Stay tuned for updates on this upcoming release.",
                "genres": [],
                "status": "upcoming",
                "release_date": "TBA",
                "buy_links": [],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.books.insert_many(books)
        print("✅ Books seeded")
    else:
        print("ℹ️ Books already exist, skipping...")
    
    # Seed FAQs
    existing_faqs = await db.faqs.count_documents({})
    if existing_faqs == 0:
        faqs = [
            {
                "id": "faq-writing",
                "category": "About My Writing",
                "order": 1,
                "questions": [
                    {
                        "question": "How did you start writing?",
                        "answer": "I initially began writing to share my opinions on topics that left me wandering. Eventually, I developed the habit of sitting and thinking, which ultimately helped shape who I am today.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "Where do you get your inspiration for your books?",
                        "answer": "I never know where I find inspiration to write, but one thing is certain: even when I am working on other things, I continue to write because it has grown to be a significant aspect of who I am. When I'm not writing, I feel lost.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "What's your writing process like?",
                        "answer": "As I'm more of a silent-environment type, I won't notice how quickly time passes if I'm writing in a quiet place. Additionally, a significant portion is depending on my draft's current situation.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "What are you currently writing?",
                        "answer": "Through my newsletter and social media, you can get updates on my current draft.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "Do you plan on writing in other genres?",
                        "answer": "I am sticking to writing in the genre I have selected for the time being, but who knows what the future will bring.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "Is your next book a series or a standalone?",
                        "answer": "This information can be found on my website in the reading order section and on my social media accounts.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "Are you a full-time author?",
                        "answer": "I'm not a full-time writer because I am a student.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    }
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "faq-reading",
                "category": "Personal & Reading Preferences",
                "order": 2,
                "questions": [
                    {
                        "question": "What genres do you enjoy reading?",
                        "answer": "Thriller, mystery, romance, and fantasy.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "What are your hobbies besides reading?",
                        "answer": "I like to travel, listen to music, and watch my favourite shows.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    }
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "faq-bonus",
                "category": "Bonus Content, Access & Extras",
                "order": 3,
                "questions": [
                    {
                        "question": "Where can I read bonus content or exclusive extras?",
                        "answer": "You can read bonus content through my website's bonus section.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    }
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "faq-community",
                "category": "Community & Contact",
                "order": 4,
                "questions": [
                    {
                        "question": "How can readers contact you?",
                        "answer": "Readers can contact me through my social media handles or email me at heelolyverse@gmail.com",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    },
                    {
                        "question": "Do you have a reader group or community?",
                        "answer": "Yes, you can click the link to become a member of my reader group.",
                        "has_link": True,
                        "link_text": "Join Reader Group",
                        "link_url": "#"
                    },
                    {
                        "question": "Are you open to collaborations?",
                        "answer": "For the details, please email me. I'll review it and get back to you soon.",
                        "has_link": False,
                        "link_text": None,
                        "link_url": None
                    }
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.faqs.insert_many(faqs)
        print("✅ FAQs seeded")
    else:
        print("ℹ️ FAQs already exist, skipping...")
    
    # Seed Extras
    existing_extras = await db.extras.count_documents({})
    if existing_extras == 0:
        extras = [
            {
                "id": "extra-playlist",
                "title": "Playlist",
                "description": "Listen to the curated playlist that inspired the stories and characters.",
                "icon": "Music",
                "url": "www.spotify.com",
                "order": 1,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "extra-moodboard",
                "title": "Moodboard",
                "description": "Explore visual inspirations and aesthetics behind the stories.",
                "icon": "Image",
                "url": "www.pinterest.com",
                "order": 2,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "id": "extra-bonus",
                "title": "Bonus Chapters",
                "description": "Access exclusive bonus scenes and extended chapters from the books.",
                "icon": "BookOpen",
                "url": "www.test.com",
                "order": 3,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.extras.insert_many(extras)
        print("✅ Extras seeded")
    else:
        print("ℹ️ Extras already exist, skipping...")
    
    # Seed Admin Settings (Author Info)
    existing_settings = await db.admin_settings.count_documents({})
    if existing_settings == 0:
        # Default password: heeloly2025
        default_password = "heeloly2025"
        password_hash = bcrypt.hashpw(default_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        admin_settings = {
            "id": "admin_settings",
            "password_hash": password_hash,
            "author_name": "Heeloly Upasani",
            "author_bio": "Author of \"A Journey Within\" is a reflection of the author's own ideas and the viewpoint of a teenage girl who, upon witnessing and experiencing the judgmental nature of people and their desire to shape others' lives for their own satisfaction, finds herself engulfed in a whirlwind of thoughts. Along with her mother, father, and brother, she resides in Surat, a city in Gujarat, India. Her passion for reading began in the school library, where she eagerly awaited library time to immerse herself in a new tale. She is a book lover who loves dogs and chocolate desserts. She is eager to pursue her writing career and is passionate about allowing readers to explore her small world, where she lets her imagination run wild.",
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
            "updated_at": datetime.utcnow()
        }
        await db.admin_settings.insert_one(admin_settings)
        print("✅ Admin settings seeded (default password: heeloly2025)")
    else:
        print("ℹ️ Admin settings already exist, skipping...")
    
    print("\n✅ Database seeding complete!")
    print("\n📋 Summary:")
    print(f"   - Books: {await db.books.count_documents({})}")
    print(f"   - FAQs: {await db.faqs.count_documents({})}")
    print(f"   - Extras: {await db.extras.count_documents({})}")
    print(f"   - Admin Settings: {await db.admin_settings.count_documents({})}")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
