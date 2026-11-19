# Integrated Food & Grocery Delivery — Django Web Portal

[![Django](https://img.shields.io/badge/Django-Python-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Mobile Companion](https://img.shields.io/badge/Companion%20App-Android%20Client-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/KishoreM-04/Integrated-Food-Grocery-Delivery-App)

> The centralized administrative and merchant backend for an integrated multi-vendor food and grocery delivery ecosystem. Engineered with Django, this portal manages item inventories, categories, order fulfillment lifecycles, and serves API data to the companion Android mobile application.

---

## 🏗️ Architecture & Workflows

```mermaid
graph LR
    Admin["Shop Owner / Admin Portal (Django Web)"] --> DB[(MySQL / Relational DB)]
    AndroidApp["Customer Android App (Java / Picasso)"] -->|REST / HTTP Endpoints| Admin
    DB --> Orders["Live Order Queue & Fulfillment"]
    DB --> Catalog["Inventory & Category Engine"]
```

---

## ✨ Features
- **Merchant & Admin Dashboard:** Real-time visibility into incoming grocery and food orders.
- **Product & Inventory Management:** Add, edit, price, and categorize grocery items and food dishes with image uploads.
- **Order Dispatch Workflow:** Track orders from placement to confirmation, preparation, and delivery completion.
- **Mobile Integration Layer:** Exposes structured endpoints consumed by the native Android client application.

---

## 🛠️ Stack & Dependencies
- **Backend Framework:** Django (Python 3.9+)
- **Database:** MySQL / SQLite
- **Frontend Admin UI:** Bootstrap 5, Custom CSS, JavaScript
- **Static & Media Asset Engine:** Django Staticfiles & Media Handlers

---

## ⚡ Quickstart
```bash
git clone https://github.com/KishoreM-04/Integrated-Food-Grocery-Delivery-Web.git
cd Integrated-Food-Grocery-Delivery-Web

python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Access the admin portal at `http://127.0.0.1:8000/`.
