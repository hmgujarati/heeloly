import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

async def update_faqs():
    print("🔄 Updating FAQs...")
    
    # Delete existing FAQs
    await db.faqs.delete_many({})
    print("✅ Deleted old FAQs")
    
    # Insert complete FAQs from the document
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
    print("✅ FAQs updated with complete data from document")
    
    # Also update the author bio with the complete text from the document
    author_bio = """Author of "A Journey Within" is a reflection of the author's own ideas and the viewpoint of a teenage girl who, upon witnessing and experiencing the judgmental nature of people and their desire to shape others' lives for their own satisfaction, finds herself engulfed in a whirlwind of thoughts. Along with her mother, father, and brother, she resides in Surat, a city in Gujarat, India. Her passion for reading began in the school library, where she eagerly awaited library time to immerse herself in a new tale. She is a book lover who loves dogs and chocolate desserts. She is eager to pursue her writing career and is passionate about allowing readers to explore her small world, where she lets her imagination run wild."""
    
    await db.admin_settings.update_one(
        {"id": "admin_settings"},
        {"$set": {
            "author_bio": author_bio,
            "updated_at": datetime.utcnow()
        }}
    )
    print("✅ Author bio also updated")
    
    print("✅ All updates complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(update_faqs())
