# Project File Inventory - Fake Account Detection Dashboard

## Complete File Listing & Descriptions

### Root Directory Files
```
fake-account-detector/
├── README_COMPLETE.md           ← Main project README
├── QUICKSTART.md                ← Quick start guide
├── requirements.txt             ← Python dependencies
├── START.bat                    ← Windows startup script
```

---

## Backend Files (`backend/`)

### Core Application
- **app.py** (450+ lines)
  - Flask application server
  - API endpoints for account analysis
  - CORS configuration
  - Request validation and error handling
  - Model loading and inference

- **feature_extraction.py** (200+ lines)
  - Extract metrics from account data
  - Calculate:
    - Posts per day
    - Follow ratio
    - Average likes
    - Engagement rate
  - Data normalization and scaling

- **ml_security.py** (150+ lines)
  - Load trained ML models
  - Perform predictions
  - Risk scoring algorithms
  - Probability calibration

- **model_training.py** (300+ lines)
  - Train ML models
  - Feature engineering
  - Cross-validation
  - Model evaluation metrics
  - Model persistence

- **utils.py** (100+ lines)
  - Helper functions
  - Data validation
  - Account classification
  - Utility methods

- **__pycache__/** - Python compiled cache (auto-generated)

---

## Data Files (`data/`)

### Raw Data
- **data/raw/twitter_bots.csv**
  - Original Twitter bot dataset
  - ~5000 bot accounts
  - Features: followers, friends, statuses, age, etc.

### Processed Data
- **data/processed/** - Directory for processed datasets

---

## Models Directory (`models/`)
- Trained ML models storage
- Contains serialized scikit-learn models
- Auto-loaded on app startup

---

## Frontend Files (`frontend/`)

### Streamlit Dashboard (Legacy)
- **dashboard.py** - Original Streamlit dashboard
- **visualizations.py** - Visualization utilities

### React Dashboard (`react-dashboard/`)

#### Source Files (`src/`)

**Components (`src/components/`)**
- **App.jsx** (850+ lines)
  - Main application component
  - State management for all data
  - Routing and conditional rendering
  - API integration
  - Security event tracking
  - Network graph management

- **ManualEntryPage.jsx** (520+ lines)
  - Full-page form for manual account entry
  - Real-time validation with error feedback
  - Auto-calculate metrics
  - Account type detection
  - Live preview cards
  - Generate 50/100 buttons
  - Form submission handling

- **SampleGenerator.jsx** (350+ lines)
  - Modal for quick account generation
  - Bulk generate (50/100 accounts)
  - Quick entry form mode
  - Realistic data generation
  - Direct manual entry integration

- **AccountDetailModal.jsx**
  - Display detailed account information
  - Show all metrics and scores
  - Account type badge
  - Risk assessment

- **AdvancedFilters.jsx**
  - Filter results by:
    - Account type (Bot/Regular/Influencer/Celebrity)
    - Risk level (Low/Medium/High)
    - Account age
    - Follower count
    - Engagement metrics

- **BatchActions.jsx**
  - Bulk operations on accounts
  - Select/deselect all
  - Batch delete
  - Export selected
  - Batch tag operations

- **CSVUploader.jsx**
  - Drag-and-drop CSV upload
  - File validation
  - Data parsing
  - Error reporting

- **NetworkGraph.jsx**
  - Interactive D3.js network visualization
  - Node: accounts
  - Edges: connections/similarities
  - Force-directed layout
  - Zoom and pan controls
  - Real-time updates

- **ResultsTable.jsx**
  - Display analysis results
  - Sortable columns
  - Filterable data
  - Pagination
  - Batch selection
  - Account detail links

- **SecurityMonitor.jsx**
  - Real-time threat tracking
  - Event timeline
  - Threat level gauge
  - Historical data
  - Security events log

- **ThreatChart.jsx**
  - Threat level visualization
  - Circular gauge display
  - Risk indicators
  - Score breakdown

**Styles (`src/styles/`)**
- **manual-entry-page.css** (550+ lines)
  - Full-page form styling
  - Glass-morphism design
  - Two-column layout
  - Sticky preview column
  - Form validation styles
  - Responsive breakpoints
  - Animations and transitions

- **sample-generator.css** (400+ lines)
  - Modal styling
  - Tab navigation
  - Button styles
  - Form inputs
  - Responsive design

**Global Styles (`src/`)**
- **App.css** - Main application styles
- **app-old.css** - Legacy styles
- **index.css** - Global reset and base styles
- **gauge.css** - Gauge component styling
- **modal.css** - Modal base styling
- **security-monitor.css** - Security monitor styling

**Utilities (`src/utils/`)**
- **csvParser.js**
  - Parse CSV files
  - Validate data format
  - Convert to account objects
  - Error handling

**Custom Hooks (`src/hooks/`)**
- **useBatchAnalysis.js**
  - Batch analysis logic
  - Progress tracking
  - Error handling
  - Results aggregation

**Entry Points**
- **App.jsx** - Main component (see above)
- **main.jsx** - React entry point
  - Bootstrap React
  - Mount to #app

**Public Files (`public/`)**
- Static assets directory

**Configuration Files**
- **package.json** - Node dependencies
  - react@19.2.0
  - vite@7.3.1
  - lucide-react (icons)
  - axios (HTTP client)
  - Additional dev dependencies

- **vite.config.js** - Vite bundler configuration
  - React plugin
  - Port configuration
  - Build optimization

- **eslint.config.js** - Code linting rules

- **index.html** - HTML template
  - Script tags
  - CSS links
  - Meta tags

---

## Scripts (`scripts/`)

- **generate_sample_data.py**
  - Create realistic sample accounts
  - Pattern generation (Celebrity/Bot/Regular)
  - Customizable count
  - Output to CSV

- **run_all.ps1** - Windows batch runner
  - Setup environment
  - Start backend
  - Start frontend

- **run_all.sh** - Unix batch runner
  - Same functionality for macOS/Linux

- **setup.ps1** - Windows setup script
  - Virtual environment setup
  - Dependencies installation
  - Initial configuration

- **setup.sh** - Unix setup script
  - Same for macOS/Linux

---

## Notebooks (`notebooks/`)

- **evaluate_model.py**
  - Model evaluation script
  - Performance metrics
  - Cross-validation
  - Confusion matrix

- **test_api.py**
  - Test API endpoints
  - Sample requests
  - Response validation
  - Error testing

---

## File Statistics

### Code Lines
- **Backend**: ~1,200 lines (Python)
- **Frontend Components**: ~2,000 lines (JSX)
- **Frontend Styling**: ~950 lines (CSS)
- **Scripts & Notebooks**: ~400 lines (Python/JS)
- **Configuration**: ~100 lines
- **Total**: ~4,650 lines

### File Count
- **Python Files**: 10+
- **React Components**: 12+
- **CSS Files**: 7+
- **Configuration Files**: 5+
- **Documentation Files**: 3+
- **Total**: 40+ files

### Data
- **CSV Datasets**: 1
- **Trained Models**: 1-3 (depending on setup)
- **Processed Data**: Variable

---

## Component Hierarchy

```
App.jsx (Root)
├── SecurityMonitor
│   ├── ThreatChart
│   └── Event Timeline
├── ManualEntryPage (Conditional)
│   ├── Form Sections
│   ├── Generate Buttons
│   ├── Live Preview
│   └── Validation Feedback
├── SampleGenerator (Modal)
│   ├── Bulk Generate
│   ├── Quick Entry
│   └── Extended Form Link
├── CSVUploader
├── ResultsTable
│   ├── Filters
│   ├── Sorting
│   └── Batch Actions
├── AccountDetailModal
├── NetworkGraph
├── AdvancedFilters
└── BatchActions
```

---

## Key Technologies Used

### Backend
- **Framework**: Flask
- **ML**: scikit-learn
- **Data**: pandas, numpy
- **Serialization**: joblib

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Icons**: lucide-react
- **HTTP**: axios
- **Visualization**: D3.js (NetworkGraph)

### Styling
- **CSS3** with animations
- **Glass-morphism** effects
- **Responsive Grid/Flexbox**
- **CSS Variables** for theming

---

## File Access Patterns

### For Data Input
1. ManualEntryPage.jsx (→ App.jsx → backend/app.py)
2. SampleGenerator.jsx (→ App.jsx → backend/app.py)
3. CSVUploader.jsx (→ csvParser.js → App.jsx → backend/app.py)

### For Analysis
1. backend/app.py receives data
2. feature_extraction.py calculates metrics
3. ml_security.py scores accounts
4. Results returned to frontend

### For Display
1. ResultsTable.jsx displays results
2. NetworkGraph.jsx shows connections
3. SecurityMonitor.jsx tracks events
4. AccountDetailModal.jsx shows details

---

## File Sizes (Approximate)

| File | Size |
|------|------|
| App.jsx | 32 KB |
| ManualEntryPage.jsx | 19 KB |
| manual-entry-page.css | 21 KB |
| app.py | 28 KB |
| feature_extraction.py | 9 KB |
| ml_security.py | 7 KB |
| model_training.py | 14 KB |
| **Total Frontend** | ~250 KB |
| **Total Backend** | ~60 KB |

---

## Development Workflow

### Frontend Development
1. Edit component in `src/components/`
2. Update styles in `src/styles/`
3. Test in dev server (http://localhost:5173)
4. Hot reload on save

### Backend Development
1. Edit files in `backend/`
2. Test API endpoints
3. Restart Flask server
4. Verify with frontend

### Adding New Features
1. Create new component in `src/components/`
2. Add to App.jsx if needed
3. Create corresponding CSS in `src/styles/`
4. Update App.jsx state if needed
5. Test thoroughly

---

## Important Notes

✅ All files are organized and documented
✅ Complete source code is included
✅ No compiled/minified code in repo (except node_modules)
✅ All configuration files present
✅ Documentation complete
✅ Ready for deployment
✅ Backup available in git history

---

**Last Updated:** January 31, 2026
**Repository:** https://github.com/Fenil1828/fake-account-detection-dashboard
