<div align="center">

# 🖼 ImageGallery

**A modern React Native image gallery app with dark mode, favorites, and smooth UX**

![Expo](https://img.shields.io/badge/Expo-SDK_57-000020?style=for-the-badge&logo=expo)
![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Screenshots](#-screenshots)

</div>

---

## 📱 About

ImageGallery is a beautifully designed mobile application built with React Native and Expo. It allows users to browse a curated image gallery, save favorites, download images, and manage their profile — all with a modern, theme-aware UI.

## ✨ Features

### 🔐 Authentication
- User registration with full validation
- Secure login with session persistence
- Auto-login on app restart
- Profile editing

### 🖼 Image Gallery
- Paginated image grid (30 images per page)
- Infinite scroll loading
- Pull-to-refresh
- Search by author name
- Alphabetical filtering (A-M / N-Z)

### ❤️ Favorites
- Save/unsave images with one tap
- Dedicated favorites screen
- Search through favorites
- Persistent storage

### 👤 Profile Management
- View and edit personal information
- 12 customizable emoji avatars
- Dark/Light mode toggle

### 🎨 UI/UX
- Modern, clean design
- Full dark mode support (28 color tokens)
- Smooth toast notifications
- Global error boundary
- Responsive layout

### 📥 Download & Share
- Download images via system share sheet
- Cross-platform support (Android, iOS, Web)

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React Native (Expo Managed) |
| Language | TypeScript 6.0 |
| Navigation | React Navigation v7 |
| State | React Context API |
| Storage | AsyncStorage |
| File System | expo-file-system |
| Sharing | expo-sharing |
| Build | EAS Build |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.x or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
# Clone the repository
git clone https://github.com/OnkarKhairnar/ImageGallery.git

# Navigate to project directory
cd ImageGallery

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

### Building APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build preview APK
eas build --platform android --profile preview
```

---

## 📂 Project Structure

```
ImageGallery/
├── App.tsx                    # Root component
├── src/
│   ├── components/            # 9 reusable UI components
│   ├── constants/             # Theme, colors, data
│   ├── context/               # 4 state providers
│   ├── navigation/            # Stack + Tab navigators
│   ├── screens/               # 7 screens
│   ├── services/              # Image + Download services
│   ├── types/                 # TypeScript definitions
│   └── utils/                 # Validation logic
└── test/                      # 71 unit tests
```

---

## 📸 Screenshots

<div align="center">

<img width="360" height="800" alt="6104971922081780859" src="https://github.com/user-attachments/assets/1b4994f7-4193-4153-bda4-00f158535db4" />
<img width="387" height="800" alt="6104971922081780858" src="https://github.com/user-attachments/assets/ecf588a7-eb7a-4c7b-9bf1-0914027ab1ff" />
<img width="611" height="1280" alt="6104971922081780857" src="https://github.com/user-attachments/assets/aad8a32f-a47a-4990-8733-7c7e950f5af0" />
<img width="603" height="1280" alt="6104971922081780856" src="https://github.com/user-attachments/assets/ff7017cc-7396-4277-acdc-3d1c983a23ca" />
<img width="379" height="800" alt="6104971922081780855" src="https://github.com/user-attachments/assets/bed175ad-78f0-42a6-b13d-cf06d2bdcd9b" />
<img width="381" height="800" alt="6104971922081780854" src="https://github.com/user-attachments/assets/4ee9ffd0-7ec0-4e70-8d40-19bf95ff1fa5" />
<img width="381" height="800" alt="6104971922081780853" src="https://github.com/user-attachments/assets/d2dd5991-b440-48c0-811f-8fe16b0eba20" />
<img width="613" height="1280" alt="6104971922081780852" src="https://github.com/user-attachments/assets/72e08bb0-576e-4993-880f-2889691232d1" />
<img width="390" height="800" alt="6104971922081780851" src="https://github.com/user-attachments/assets/ed79a6e2-dcf2-47ce-9dad-63947e882361" />
<img width="382" height="800" alt="6104971922081780850" src="https://github.com/user-attachments/assets/cb54d9c8-91b1-46c2-a9d3-dab0d0e90b5f" />

</div>

---

## 🧪 Testing

The project includes **71 unit tests** covering:

- Form validation (all fields)
- Authentication logic
- Image service
- Favorites management
- Search & filter functionality
- Theme consistency
- Navigation routes

```bash
# Run tests
node test/test-all.js
```

---

## 📋 App Architecture

```
ErrorBoundary
└── ThemeProvider
    └── AuthProvider
        └── NavigationContainer
            └── FavoritesProvider
                └── ToastProvider
                    └── RootNavigator
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npx expo start` | Start development server |
| `npx expo start --web` | Start for web |
| `npx expo run:android` | Run on Android |
| `npx expo run:ios` | Run on iOS |
| `eas build --profile preview` | Build APK |
| `eas build --profile production` | Build AAB for Play Store |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📧 Contact

**omi1** - [GitHub](https://github.com/omi1)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

</div>
