# ImageGallery

A cross-platform Expo (React Native) mobile app for browsing, searching, favoriting, and sharing images — with dark/light theme support and user authentication.

![Expo](https://img.shields.io/badge/Expo-57-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)

## Features

- **Authentication** — Sign up / log in with secure token storage (AsyncStorage)
- **Image Gallery** — Browse images with search and category filtering
- **Image Details** — View full image details and metadata
- **Favorites** — Save and manage your favorite images
- **Profile** — View and edit your profile, including avatar selection
- **Theming** — Dark mode / light mode support
- **Sharing** — Share images via the device share sheet (expo-sharing)
- **Navigation** — Stack and tab navigation with React Navigation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Expo SDK ~57](https://expo.dev) |
| UI | [React Native 0.86](https://reactnative.dev) |
| Language | TypeScript |
| Navigation | React Navigation (Native + Native Stack + Bottom Tabs) |
| Storage | `@react-native-async-storage/async-storage` |
| Images | `expo-image`, `expo-file-system` |
| Sharing | `expo-sharing` |
| Styling | React Native StyleSheet + custom theme |

## Project Structure

```
ImageGallery/
├── .gitignore
├── app.json              # Expo app config
├── App.tsx               # App entry (providers + navigation)
├── index.ts
├── eas.json              # EAS build config
├── package.json
├── tsconfig.json
├── assets/               # App icons & splash images
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # Theme constants
│   ├── context/          # Auth, Theme, Favorites, Toast providers
│   ├── navigation/       # App navigators
│   ├── screens/          # Home, ImageDetails, Login, Register, Profile, etc.
│   ├── services/         # API / image services
│   ├── types/            # TypeScript types
│   └── utils/            # Helper utilities
└── node_modules/
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/): `npm install -g expo-cli`
- A mobile device with the [Expo Go](https://expo.dev/go) app, or an Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ImageGallery

# Install dependencies
npm install

# Start the development server
npx expo start
```

Then scan the QR code with Expo Go (iOS/Android), or press:

- `w` — open in web browser
- `a` — run on Android emulator
- `i` — run on iOS simulator

### Available Scripts

```bash
npm start        # Start Expo dev server
npm run android  # Run on Android
npm run ios      # Run on iOS
npm run web      # Run on web
```

## Usage

1. **Register / Log in** — Create an account or sign in to access the gallery.
2. **Browse images** — Scroll through images on the Home screen; use the search bar and filter chip to narrow results.
3. **View details** — Tap an image to open its details page.
4. **Favorite** — Tap the heart icon on an image to add it to your Favorites tab.
5. **Share** — Use the share button to share an image via your device's share sheet.
6. **Profile** — Visit your profile to view stats and edit your info or avatar.
7. **Theme** — Toggle dark/light mode from the profile/settings area.

## Building for Production

Using [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build (one time)
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Submit to stores
eas submit --platform android   # or ios
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is private and intended for personal/educational use.

## Enhancements

Later on I am migrating from React Native StyleSheet to NativeWind.

---

Made with ❤️ using Expo & React Native
