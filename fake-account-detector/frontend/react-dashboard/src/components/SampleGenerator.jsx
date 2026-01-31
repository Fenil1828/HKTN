import React, { useState } from 'react';
import { X, Plus, Zap, Edit3 } from 'lucide-react';
import '../styles/sample-generator.css';

export function SampleGenerator({ onGenerate, onManualEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('bulk'); // 'bulk' or 'manual'
  const [formData, setFormData] = useState({
    username: '',
    followers_count: '',
    friends_count: '',
    statuses_count: '',
    posts_per_day: '',
    posting_frequency: 'normal',
    follow_ratio: '',
    account_age_days: '',
    has_profile_image: true,
    verified: false,
    bio: '',
    location: ''
  });

  const generateDiverseUsername = () => {
    const firstNames = [
      "alex", "bailey", "casey", "diana", "emma", "frank", "grace", "henry",
      "isla", "james", "kate", "logan", "maya", "noah", "oliver", "patricia",
      "quinn", "rachel", "sam", "taylor", "una", "victor", "waylon", "xavier",
      "yara", "zach", "amber", "blake", "cameron", "drew", "eden", "frost"
    ];

    const lastNames = [
      "anderson", "beta", "carter", "davies", "edwards", "fisher", "garcia",
      "hall", "irvine", "jackson", "kelly", "lewis", "miller", "nelson", "owen",
      "parker", "quinn", "robinson", "smith", "taylor", "unity", "vaughn",
      "walker", "xavier", "young", "zhang", "martinez", "johnson", "williams"
    ];

    const domains = ["", "_real", "_official", "_pro", "_news", "_daily", "_hub", "_zone", 
                     "_world", "_tv", "_media", "_ninja", "_rocks", "_codes", "_labs"];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${firstName}${lastName}${domain}`;
  };

  const handleBulkGenerate = async (count) => {
    const accounts = [];
    for (let i = 0; i < count; i++) {
      const is_bot = Math.random() < 0.3; // 30% bots, 70% real
      
      let followers, following, posts, age, bio, location, verified;

      if (is_bot) {
        // 🤖 Bot Pattern: Very new, massive following, very high posts
        followers = Math.floor(Math.random() * 100) + 2;
        following = Math.floor(Math.random() * 12000) + 3000; // 3000-15000
        posts = Math.floor(Math.random() * 52000) + 8000; // 8000-60000
        age = Math.floor(Math.random() * 60) + 1; // 1-60 days
        bio = ['Follow for prizes!', 'DM for deals', 'Click link in bio', 'Free money!', 'Earn $$'][Math.floor(Math.random() * 5)];
        location = '';
        verified = false;
      } else {
        // 👤 Real user: Older account, balanced followers/following
        age = Math.floor(Math.random() * 3450) + 200; // 200-3650 days
        followers = Math.floor(Math.random() * 14920) + 80; // 80-15000
        
        // Real accounts have realistic ratios
        if (followers > 5000) {
          following = Math.floor(Math.random() * (followers * 0.3 - 500)) + 500; // 500 to followers*0.3
        } else {
          following = Math.floor(Math.random() * (followers - 50)) + 50; // 50 to followers
        }
        
        posts = Math.floor(Math.random() * 5800) + 200; // 200-6000
        bio = [
          'Software developer | Open source enthusiast',
          'Product manager | Always learning',
          'Digital marketer | Coffee addict ☕',
          'Photographer | Travel lover 📸',
          'Writer | Tech journalist',
          'Designer | Creative thinker',
          'Data scientist | AI enthusiast',
          'Entrepreneur | Startup founder'
        ][Math.floor(Math.random() * 8)];
        location = ['San Francisco, CA', 'New York, NY', 'London, UK', 'Tokyo, Japan', 'Toronto, Canada', 'Berlin, Germany', 'Singapore', 'Sydney, Australia'][Math.floor(Math.random() * 8)];
        verified = followers > 10000 ? Math.random() < 0.08 : Math.random() < 0.02;
      }

      accounts.push({
        username: this.generateDiverseUsername(),
        followers_count: followers,
        friends_count: following,
        statuses_count: posts,
        account_age_days: age,
        verified: verified,
        has_profile_image: !is_bot ? Math.random() < 0.95 : Math.random() < 0.4,
        bio: bio,
        location: location
      });
    }

    onGenerate(accounts);
    setIsOpen(false);
  };

  const handleManualClick = () => {
    setIsOpen(false);
    onManualEntry();
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.followers_count || !formData.friends_count) {
      alert('Please fill in required fields');
      return;
    }

    const account = {
      username: formData.username,
      followers_count: parseInt(formData.followers_count),
      friends_count: parseInt(formData.friends_count),
      statuses_count: parseInt(formData.statuses_count) || 0,
      account_age_days: parseInt(formData.account_age_days) || 1,
      verified: formData.verified,
      has_profile_image: formData.has_profile_image,
      bio: formData.bio,
      location: formData.location
    };

    onGenerate([account]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      username: '',
      followers_count: '',
      friends_count: '',
      statuses_count: '',
      posts_per_day: '',
      posting_frequency: 'normal',
      follow_ratio: '',
      account_age_days: '',
      has_profile_image: true,
      verified: false,
      bio: '',
      location: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateMetrics = () => {
    const followers = parseInt(formData.followers_count) || 0;
    const following = parseInt(formData.friends_count) || 0;
    const posts = parseInt(formData.statuses_count) || 0;
    const age = parseInt(formData.account_age_days) || 1;

    return {
      posts_per_day: (posts / age).toFixed(2),
      follow_ratio: followers > 0 ? (following / followers).toFixed(2) : '0'
    };
  };

  const metrics = calculateMetrics();

  return (
    <>
      <button
        onClick={onManualEntry}
        className="sg-open-btn"
        title="Add account or generate samples"
      >
        <Plus size={20} />
        <span>Add Account</span>
      </button>

      {isOpen && (
        <div className="sg-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="sg-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sg-modal-header">
              <h2>Quick Account Generation</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="sg-close-btn"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="sg-mode-tabs">
              <button
                className={`sg-tab ${mode === 'bulk' ? 'active' : ''}`}
                onClick={() => setMode('bulk')}
              >
                <Zap size={18} />
                Bulk Generate
              </button>
              <button
                className={`sg-tab ${mode === 'manual' ? 'active' : ''}`}
                onClick={() => setMode('manual')}
              >
                <Plus size={18} />
                Quick Entry
              </button>
            </div>

            {/* Content */}
            <div className="sg-content">
              {mode === 'bulk' ? (
                <div className="sg-bulk-section">
                  <p className="sg-description">Generate realistic sample accounts</p>
                  <div className="sg-bulk-buttons">
                    <button
                      className="sg-bulk-btn sg-bulk-50"
                      onClick={() => handleBulkGenerate(50)}
                    >
                      <span className="sg-count">50</span>
                      <span className="sg-label">Accounts</span>
                    </button>
                    <button
                      className="sg-bulk-btn sg-bulk-100"
                      onClick={() => handleBulkGenerate(100)}
                    >
                      <span className="sg-count">100</span>
                      <span className="sg-label">Accounts</span>
                    </button>
                  </div>
                  <p className="sg-note">
                    Includes ~40% bot patterns and ~60% real user patterns
                  </p>
                </div>
              ) : (
                <form onSubmit={handleManualSubmit} className="sg-form">
                  {/* Basic Info */}
                  <div className="sg-section">
                    <h3>Basic Info</h3>
                    <div className="sg-input-group">
                      <label>Username *</label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="@username"
                        required
                      />
                    </div>

                    <div className="sg-row">
                      <div className="sg-input-group">
                        <label>Bio</label>
                        <input
                          type="text"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          placeholder="Account bio"
                        />
                      </div>
                      <div className="sg-input-group">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Audience Metrics */}
                  <div className="sg-section">
                    <h3>Audience Metrics</h3>
                    <div className="sg-row">
                      <div className="sg-input-group">
                        <label>Followers *</label>
                        <input
                          type="number"
                          name="followers_count"
                          value={formData.followers_count}
                          onChange={handleInputChange}
                          placeholder="e.g., 5"
                          min="0"
                          required
                        />
                      </div>
                      <div className="sg-input-group">
                        <label>Following *</label>
                        <input
                          type="number"
                          name="friends_count"
                          value={formData.friends_count}
                          onChange={handleInputChange}
                          placeholder="e.g., 8000"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Activity Metrics */}
                  <div className="sg-section">
                    <h3>Activity Metrics</h3>
                    <div className="sg-row">
                      <div className="sg-input-group">
                        <label>Total Posts</label>
                        <input
                          type="number"
                          name="statuses_count"
                          value={formData.statuses_count}
                          onChange={handleInputChange}
                          placeholder="e.g., 15000"
                          min="0"
                        />
                      </div>
                      <div className="sg-input-group">
                        <label>Age (Days) *</label>
                        <input
                          type="number"
                          name="account_age_days"
                          value={formData.account_age_days}
                          onChange={handleInputChange}
                          placeholder="e.g., 20"
                          min="1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Auto-calculated Metrics */}
                  <div className="sg-metrics-display">
                    <div className="sg-metric">
                      <span className="sg-metric-label">Posts/Day</span>
                      <span className="sg-metric-value">{metrics.posts_per_day}</span>
                    </div>
                    <div className="sg-metric">
                      <span className="sg-metric-label">Follow Ratio</span>
                      <span className="sg-metric-value">{metrics.follow_ratio}x</span>
                    </div>
                  </div>

                  {/* Flags */}
                  <div className="sg-section">
                    <h3>Flags</h3>
                    <div className="sg-checkboxes">
                      <label className="sg-checkbox">
                        <input
                          type="checkbox"
                          name="has_profile_image"
                          checked={formData.has_profile_image}
                          onChange={handleInputChange}
                        />
                        <span>Has Profile Image</span>
                      </label>
                      <label className="sg-checkbox">
                        <input
                          type="checkbox"
                          name="verified"
                          checked={formData.verified}
                          onChange={handleInputChange}
                        />
                        <span>Verified</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="sg-form-actions">
                    <button type="submit" className="sg-submit-btn">
                      Generate & Analyze
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setIsOpen(false);
                      }}
                      className="sg-cancel-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
