# Integrated Food & Grocery Delivery — Android Client Application

[![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com)
[![Java](https://img.shields.io/badge/Language-Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://java.com)
[![Gradle](https://img.shields.io/badge/Build-Gradle%20Kotlin%20DSL-02303A?style=for-the-badge&logo=gradle&logoColor=white)](https://gradle.org)
[![Backend Companion](https://img.shields.io/badge/Companion%20Backend-Django%20Web-092E20?style=for-the-badge&logo=django&logoColor=white)](https://github.com/KishoreM-04/Integrated-Food-Grocery-Delivery-Web)

> Native Android customer-facing mobile application for the Integrated Food & Grocery Delivery ecosystem. Connects seamlessly with the Django backend to provide catalog browsing, dynamic cart operations, and real-time delivery order placement.

---

## ✨ Application Features

- **Dynamic Catalog Feed:** Real-time fetching and categorization of groceries, snacks, and restaurant meals.
- **Picasso Image Caching:** High-performance asynchronous image fetching and disk/memory caching with zero UI stutter.
- **Interactive Shopping Cart:** Real-time quantity adjustments, subtotal tallying, tax and delivery surcharge calculation.
- **Order Placement & Status Tracking:** Direct checkout pipeline submitting orders to the backend fulfillment queue.
- **Responsive Material Layout:** Clean CardView and RecyclerView layouts optimized for modern smartphone form factors.

---

## 🛠️ Architecture & Technologies

- **Language:** Java 11 / 17
- **UI Components:** `RecyclerView`, `CardView`, `ConstraintLayout`, `MaterialComponents`
- **Networking & API:** Asynchronous HTTP client / Volley integration
- **Image Pipeline:** Picasso 2.5.2
- **Build System:** Android Studio Hedgehog/Iguana with Gradle Kotlin DSL (`build.gradle.kts`)

---

## 🚀 Building the Project

1. Clone this repository:
   ```bash
   git clone https://github.com/KishoreM-04/Integrated-Food-Grocery-Delivery-App.git
   ```
2. Open the project folder in **Android Studio**.
3. Allow Gradle to sync dependencies.
4. Ensure the companion [Django Web Backend](https://github.com/KishoreM-04/Integrated-Food-Grocery-Delivery-Web) is running locally or hosted on an accessible network IP.
5. Update backend endpoint URL in the app's configuration constants.
6. Connect an Android device (via USB debugging) or start an Android Emulator, then click **Run (Shift + F10)**.
