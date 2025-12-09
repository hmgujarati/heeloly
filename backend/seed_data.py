import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def seed_database():
    print("🌱 Seeding database...")
    
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
                        "has_link": False
                    },
                    {
                        "question": "Where do you get your inspiration for your books?",
                        "answer": "I never know where I find inspiration to write, but one thing is certain: even when I am working on other things, I continue to write because it has grown to be a significant aspect of who I am.",
                        "has_link": False
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
                        "has_link": False
                    }
                ],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.faqs.insert_many(faqs)
        print("✅ FAQs seeded")
    
    # Seed Extras
    existing_extras = await db.extras.count_documents({})
    if existing_extras == 0:
        extras = [
            {
                "id": "extra-playlist",
                "title": "Playlist",
                "description": "Listen to the curated playlist that inspired the stories and characters.",
                "icon": "Music",
                "url": "#",
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
                "url": "#",
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
                "url": "#",
                "order": 3,
                "active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        await db.extras.insert_many(extras)
        print("✅ Extras seeded")
    
    print("✅ Database seeding complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
