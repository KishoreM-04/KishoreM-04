# EcoBreath PuriBot — Remote Control & Telemetry for Air-Purifying Robot

[![Android](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com)
[![Java](https://img.shields.io/badge/Language-Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://java.com)
[![IoT](https://img.shields.io/badge/Domain-IoT%20%26%20Robotics-00F2FE?style=for-the-badge)](https://github.com/KishoreM-04)
[![APK](https://img.shields.io/badge/Release-Pre--compiled%20APK%20Included-00F5A0?style=for-the-badge)](EcoBreath%20.apk)

> A native Android control dashboard and hardware telemetry client engineered to interface with an autonomous air-purifying robot. Provides directional drive commands, live sensor telemetry visualization, fan intensity controls, and real-time status monitoring.

---

## 🤖 System Overview

```mermaid
graph LR
    User["Operator (Android Device)"]
    App["EcoBreath PuriBot App (com.example.puribot)"]
    Hardware["Microcontroller / ESP32 / Arduino Robot Unit"]
    Sensors["Air Quality Sensors (PM2.5 / VOC / Temp)"]

    User -->|Touch Joystick / Controls| App
    App -->|Wireless Control Signals (MQTT/BT)| Hardware
    Sensors -->|Telemetry Ingestion| Hardware
    Hardware -->|Status & Sensor Data Feed| App
```

---

## ✨ Key Features

- **Omnidirectional Robot Drive:** Responsive tactile interface for forward, reverse, lateral steering, and rotation commands.
- **Air Quality Telemetry:** Real-time visual metrics displaying particulate readings (PM2.5 / PM10), environmental air purity levels, and filter saturation.
- **Purification Mode Selector:** Remotely toggle between Auto, Eco, High-Velocity, and Silent purification fan profiles.
- **Pre-Built Distribution Artifact:** Includes a tested, installable Android build (`EcoBreath .apk`) directly in the repository root.

---

## 🛠️ Tech Stack & Architecture

- **Language:** Java (Android SDK)
- **Target SDK:** Android API 34 (Android 14) / Min SDK 24
- **Build System:** Gradle with Kotlin DSL (`build.gradle.kts`)
- **Package Identifier:** `com.example.puribot`
- **Communication Protocol:** Wireless hardware control (Bluetooth Serial / MQTT Telemetry)

---

## 📲 Quick Installation & Setup

### Option 1: Direct APK Install
You can directly download and install `EcoBreath .apk` located in the root of this repository onto your Android smartphone (enable *Install from Unknown Sources* in Android Settings).

### Option 2: Build from Source
1. Clone the repository:
   ```bash
   git clone https://github.com/KishoreM-04/Remote-Control-for-Air-Purifying-Robot.git
   ```
2. Open the project in **Android Studio**.
3. Sync Gradle and build the project (`Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`).
4. Deploy to a connected testing device.
