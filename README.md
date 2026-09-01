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

| Login | Home | Favorites | Profile |
|-------|------|-----------|---------|
| ![Login](https://via.placeholder.com/200x400/1A1A2E/FFFFFF?text=Login) | ![Home](https://via.placeholder.com/200x400/F5F5F5/1A1A2E?text=Gallery) | ![Favorites](https://via.placeholder.com/200x400/F5F5F5/1A1A2E?text=Favorites) | ![Profile](https://via.placeholder.com/200x400/F5F5F5/1A1A2E?text=Profile) |

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
