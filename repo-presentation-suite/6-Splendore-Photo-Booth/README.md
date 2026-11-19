# Splendore 2025 Photo Booth — Android Festive Camera App

[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com)
[![Java](https://img.shields.io/badge/Language-Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://java.com)
[![Event Tech](https://img.shields.io/badge/Domain-Intercollegiate%20Fest%20Tech-A855F7?style=for-the-badge)](https://github.com/KishoreM-04)
[![APK](https://img.shields.io/badge/Release-Pre--compiled%20APK%20Included-00F5A0?style=for-the-badge)](Splendore.apk)

> A custom native Android camera application created for the Splendore Intercollegiate Cultural Festival. It allows event attendees to capture high-resolution portraits styled within a circular festive frame with themed decorations and instant sharing capabilities.

---

## 📸 Overview & Features

- **Circular Viewfinder Mask:** Custom camera layout utilizing a circular preview mask to emulate a retro photo-booth perspective.
- **Dynamic Themed Overlays:** Real-time composition layering festival motifs, branding badges, and typography on top of the live camera feed.
- **High-Resolution Rendering:** Combines the captured bitmap with the vector/PNG overlay layers without losing clarity or aspect ratio.
- **Pre-Built Distribution APK:** Includes a tested, ready-to-run installation package (`Splendore.apk`) directly inside the repository.

---

## 🛠️ Technical Specifications

- **Language:** Java (Android SDK)
- **Target SDK:** Android API 34 / Min SDK 24
- **Package Identifier:** `com.example.splendore`
- **Build System:** Android Studio with Gradle Kotlin DSL (`build.gradle.kts`)
- **Key APIs:** Android Camera API / CameraX, Custom View Canvas, Bitmap Post-Processing

---

## 📲 Installation

### Direct Install:
1. Download `Splendore.apk` from the root of this repository onto your Android smartphone.
2. Tap the file to install (allow installation from your browser/file manager when prompted).

### Compile from Source:
1. Clone this repository:
   ```bash
   git clone https://github.com/KishoreM-04/Splendore_2025-Photo-Booth.git
   ```
2. Open in **Android Studio**.
3. Sync Gradle dependencies and run on an Android device or emulator with webcam/camera emulation enabled.
