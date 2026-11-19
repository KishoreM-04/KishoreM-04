# Mentrix — Institutional Mentor–Mentee Management Platform

[![Python](https://img.shields.io/badge/Python-3.8%2B%20%7C%203.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Django](https://img.shields.io/badge/Django-4.2%2B-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![Ollama](https://img.shields.io/badge/Local%20AI-Ollama%20LLM-000000?style=for-the-badge&logo=openai&logoColor=white)](https://ollama.ai)
[![Security](https://img.shields.io/badge/Security-Single%20Session%20%7C%20OAuth2-00F5A0?style=for-the-badge)](https://github.com/KishoreM-04)
[![License](https://img.shields.io/badge/License-Academic%20Open-blue?style=for-the-badge)](LICENSE)

> A production-grade mentor–mentee governance and analytics platform built with Django for educational institutions. Mentrix unifies students, faculty mentors, department heads, and system administrators into a role-governed ecosystem with local AI telemetry and automated PDF dossier compilation.

---

## 🏗️ System Architecture

```mermaid
graph TD
    User["Institutional User (Browser)"]

    subgraph Gatekeeping ["Security & Middleware Layer"]
        M1["Domain-Restricted Google OAuth2"]
        M2["Single Session Invalidation Guard"]
        M3["Role-Based Access Control (RBAC)"]
        M4["Zero-Cache HTTP Headers"]
    end

    subgraph Portals ["Dedicated Role Modules"]
        R1["Student Portal (Bookings & Feedback)"]
        R2["Faculty Portal (Slots, Notes & Milestones)"]
        R3["HOD Oversight (Audit & Cross-Dept Stats)"]
        R4["Super Admin (Role Switching Engine)"]
    end

    subgraph Intelligence ["Core Services & Background Engines"]
        S1["Local LLM Inference (Ollama Sentiment & Summarization)"]
        S2["ReportLab PDF Telemetry Generator"]
        S3["Automated SMTP Notification Dispatcher"]
    end

    User --> Gatekeeping
    Gatekeeping --> Portals
    Portals --> Intelligence
```

---

## ✨ Key Capabilities

### 1. Granular Role-Based Access Control (RBAC)
- Five discrete role namespaces: `Student`, `Faculty`, `Faculty_Admin`, `HOD`, and `Super_Admin`.
- Native role-switching module for authorized users holding hybrid institutional responsibilities (e.g., a Faculty member who also acts as Faculty Admin or HOD).

### 2. Multi-Layer Defense-in-Depth Security
- **Domain-Restricted OAuth2:** Authentication pipeline locked strictly to verified institutional email domains, blocking unauthorized third-party sign-ins.
- **Single-Session Enforcement:** Custom middleware terminates legacy sessions when a new login occurs, eliminating shared credential risks.
- **Cache Invalidation:** HTTP `Cache-Control` enforcement on confidential academic records.

### 3. Privacy-First Local AI Telemetry
- Integration with local Ollama LLM models running on-premise.
- Analyzes guidance logs and session feedback to detect student support patterns without uploading sensitive academic transcripts to external commercial cloud APIs.

### 4. Dynamic PDF Dossier Generation
- Powered by `ReportLab`. Compiles student meeting logs, progress evaluations, and attendance records into official, formatted institutional PDF transcripts.

---

## 🛠️ Technology Stack

- **Backend:** Python 3.8+, Django 4.2 LTS
- **Database:** SQLite (local development), MySQL / PostgreSQL (production)
- **Authentication:** Django Auth + Python Social Auth (Google OAuth2 Pipeline)
- **AI / LLM Integration:** Local Ollama API / LLM Prompts
- **Document Telemetry:** ReportLab, OpenPyXL, Pandas
- **Frontend:** Semantic HTML5, Bootstrap 5, SweetAlert2, Vanilla JavaScript
- **Environment Management:** `python-dotenv`

---

## 📁 Repository Structure

```
Mentrix/
├── Mentrix/                 # Django core settings & routing
│   ├── settings.py          # Environment-driven configuration
│   ├── middleware.py        # Custom security & session middleware
│   └── urls.py              # Root routing table
├── MentrixApp/              # Core authentication & AI utilities
│   ├── ai_utils.py          # Local Ollama AI integration
│   ├── local_ai.py          # Local inference helper
│   ├── pipeline.py          # Social auth custom pipeline
│   └── security.py          # Session & access utilities
├── Student/                 # Student portal views, models & templates
├── Faculty/                 # Faculty guidance scheduling & evaluation
├── Faculty_Admin/           # Faculty administrative operations
├── HOD/                     # Departmental governance & compliance audit
├── Super_Admin/             # Institutional oversight & role management
└── templates/               # Responsive template suite
```

---

## ⚡ Quickstart & Local Setup

### 1. Clone & Activate Environment
```bash
git clone https://github.com/KishoreM-04/Mentrix.git
cd Mentrix

# Windows PowerShell
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Linux / macOS
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and set your credentials:
```env
SECRET_KEY=your-secure-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
# Google OAuth Credentials
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=your-client-id
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=your-client-secret
```

### 4. Database Setup & Server Launch
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Navigate to `http://127.0.0.1:8000/` in your browser.

---

## 📜 License & Acknowledgments
Developed by **Kishore M** (`@KishoreM-04`) at Rajagiri College of Social Sciences, Kalamassery. Built for academic guidance innovation and scalable institutional workflows.
