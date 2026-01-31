"""
Generate sample dataset for training if real dataset is not available
This creates synthetic data that mimics real Twitter bot detection datasets
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

def generate_diverse_username():
    """Generate diverse and unique usernames"""
    first_names = [
        "alex", "bailey", "casey", "diana", "emma", "frank", "grace", "henry",
        "isla", "james", "kate", "logan", "maya", "noah", "oliver", "patricia",
        "quinn", "rachel", "sam", "taylor", "una", "victor", "waylon", "xavier",
        "yara", "zach", "amber", "blake", "cameron", "drew", "eden", "frost",
        "gabriel", "harper", "iris", "julius", "kelsey", "liam", "morgan", "nero"
    ]
    
    last_names = [
        "anderson", "beta", "carter", "davies", "edwards", "fisher", "garcia",
        "hall", "irvine", "jackson", "kelly", "lewis", "miller", "nelson", "owen",
        "parker", "quinn", "robinson", "smith", "taylor", "unity", "vaughn",
        "walker", "xavier", "young", "zhang", "martinez", "johnson", "williams",
        "brown", "davis", "rodriguez", "martinez", "hernandez", "lopez", "gonzalez"
    ]
    
    domains = ["", "_real", "_official", "_pro", "_news", "_daily", "_hub", "_zone", 
               "_world", "_tv", "_media", "_ninja", "_rocks", "_codes", "_labs"]
    
    username = f"{random.choice(first_names)}{random.choice(last_names)}{random.choice(domains)}"
    return username

def generate_sample_dataset(n_samples=5000):
    """Generate synthetic account data for training"""
    
    print(f"Generating {n_samples} sample accounts...")
    
    data = []
    used_usernames = set()
    
    for i in range(n_samples):
        # Randomly decide if account is bot (30% bots, 70% real)
        is_bot = random.random() < 0.3
        
        # Generate unique username
        while True:
            username = generate_diverse_username()
            if username not in used_usernames:
                used_usernames.add(username)
                break
        
        if is_bot:
            # 🤖 Bot Pattern: Following >> Followers (aggressive spam)
            # Very new account, very high posts, lots of following
            account = {
                'id': f'bot_{i}',
                'username': username,
                'followers_count': random.randint(2, 100),
                'friends_count': random.randint(3000, 15000),
                'statuses_count': random.randint(8000, 60000),
                'favourites_count': random.randint(10, 500),
                'listed_count': random.randint(0, 3),
                'created_at': (datetime.now() - timedelta(days=random.randint(1, 60))).isoformat(),
                'verified': False,
                'default_profile': random.random() < 0.85,
                'default_profile_image': random.random() < 0.75,
                'has_extended_profile': False,
                'description': random.choice(['', 'Follow for prizes!', 'DM for deals', 'Click link in bio', 'Free money!', 'Earn $$', 'Influencer tips']),
                'location': '',
                'url': '',
                'account_type': 'bot'
            }
        else:
            # 👤 Regular/⭐ Influencer Pattern: Balanced followers/following or followers > following
            account_age_days = random.randint(200, 3650)
            followers = random.randint(80, 15000)
            
            # Real accounts have more realistic follow ratios
            if followers > 5000:  # Influencer-like
                friends = random.randint(500, int(followers * 0.3))
            else:  # Regular user
                friends = random.randint(100, followers)
            
            account = {
                'id': f'real_{i}',
                'username': username,
                'followers_count': followers,
                'friends_count': friends,
                'statuses_count': random.randint(200, 6000),
                'favourites_count': random.randint(500, 8000),
                'listed_count': random.randint(0, 100),
                'created_at': (datetime.now() - timedelta(days=account_age_days)).isoformat(),
                'verified': random.random() < 0.08 if followers > 10000 else random.random() < 0.02,
                'default_profile': random.random() < 0.15,
                'default_profile_image': random.random() < 0.05,
                'has_extended_profile': random.random() < 0.8,
                'description': random.choice([
                    'Software developer | Open source enthusiast',
                    'Product manager | Always learning',
                    'Digital marketer | Coffee addict ☕',
                    'Photographer | Travel lover 📸',
                    'Writer | Tech journalist',
                    'Designer | Creative thinker',
                    'Data scientist | AI enthusiast',
                    'Entrepreneur | Startup founder',
                    'Student | Lifelong learner',
                    'Consultant | Industry expert',
                    'CEO | Business leader',
                    'Parent | Work-life balance advocate'
                ]),
                'location': random.choice(['San Francisco, CA', 'New York, NY', 'London, UK', 'Tokyo, Japan', 'Toronto, Canada', 'Berlin, Germany', 'Singapore', 'Sydney, Australia', 'Paris, France', 'Amsterdam, NL']),
                'url': f'https://{random.choice(["linkedin", "github", "website", "blog"])}.com' if random.random() < 0.4 else '',
                'account_type': 'human'
            }
        
        # Add computed fields
        account_age = (datetime.now() - pd.to_datetime(account['created_at'])).days
        account['account_age_days'] = max(account_age, 1)
        account['has_profile_image'] = not account['default_profile_image']
        account['bio'] = account['description']
        
        data.append(account)
    
    df = pd.DataFrame(data)
    
    print(f"✓ Generated {len(df)} accounts")
    print(f"  - Bots: {len(df[df['account_type'] == 'bot'])}")
    print(f"  - Humans: {len(df[df['account_type'] == 'human'])}")
    
    return df

if __name__ == "__main__":
    import os
    
    # Create directory
    os.makedirs('data/raw', exist_ok=True)
    
    # Generate dataset
    df = generate_sample_dataset(5000)
    
    # Save to CSV
    output_path = 'data/raw/twitter_bots.csv'
    df.to_csv(output_path, index=False)
    
    print(f"\n✓ Dataset saved to {output_path}")
    print(f"\nDataset info:")
    print(df.info())
    print(f"\nSample records:")
    print(df.head())
