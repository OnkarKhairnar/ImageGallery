# ImageGallery — Technical Documentation

---

## 1. Project Overview

**ImageGallery** is a React Native (Expo) mobile application that allows users to browse an image gallery, save favorites, download images, and manage their profile. It features a modern UI with dark/light mode support.

| Property | Value |
|---|---|
| **App Name** | ImageGallery |
| **Version** | 1.0.0 |
| **Platform** | Android, iOS, Web |
| **Package ID** | com.anonymous.ImageGallery |

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React Native (Expo Managed) | SDK 57 |
| Language | TypeScript | 6.0 |
| React | React | 19.2.3 |
| React Native | React Native | 0.86.3 |
| Navigation | React Navigation (Stack + Bottom Tabs) | v7 |
| Local Storage | @react-native-async-storage/async-storage | 2.2 |
| File System | expo-file-system | 57 |
| Sharing | expo-sharing | 57 |
| Status Bar | expo-status-bar | 57 |
| Build Tool | EAS Build | CLI 23.x |

---

## 3. Project Structure

```
ImageGallery/
├── App.tsx                          # Root component with providers
├── index.ts                         # Entry point
├── app.json                         # Expo configuration
├── eas.json                         # EAS Build configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── assets/                          # Icons and splash screen
├── src/
│   ├── components/
│   │   ├── AvatarSelector.tsx       # Avatar picker modal
│   │   ├── ErrorBoundary.tsx        # Global error handler
│   │   ├── FilterBar.tsx            # A-M / N-Z filter chips
│   │   ├── FormField.tsx            # Reusable text input
│   │   ├── ImageCard.tsx            # Image grid card
│   │   ├── PasswordInput.tsx        # Password with show/hide
│   │   ├── RadioGroup.tsx           # Gender radio buttons
│   │   ├── SearchBar.tsx            # Search input
│   │   └── SelectInput.tsx          # Dropdown selector
│   ├── constants/
│   │   ├── index.ts                 # Exports
│   │   └── theme.ts                 # Colors, spacing, fonts, data
│   ├── context/
│   │   ├── AuthContext.tsx           # Authentication state
│   │   ├── FavoritesContext.tsx      # Favorites state
│   │   ├── ThemeContext.tsx          # Dark/light mode state
│   │   └── ToastContext.tsx          # Toast notifications
│   ├── navigation/
│   │   ├── RootNavigator.tsx        # Auth-gated stack navigator
│   │   └── MainTabNavigator.tsx     # Bottom tab navigator
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Login form
│   │   ├── RegisterScreen.tsx       # Registration form
│   │   ├── HomeScreen.tsx           # Image gallery grid
│   │   ├── FavoritesScreen.tsx      # Saved images
│   │   ├── ImageDetailsScreen.tsx   # Image detail + download
│   │   ├── ProfileScreen.tsx        # User profile + settings
│   │   └── EditProfileScreen.tsx    # Edit profile form
│   ├── services/
│   │   ├── imageService.ts          # Image URL generation
│   │   └── downloadService.ts       # Download + share logic
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   └── utils/
│       └── validation.ts            # Form validation logic
└── test/
    └── test-all.js                  # 71 unit tests
```

---

## 4. App Architecture

### Provider Hierarchy

```
ErrorBoundary
└── ThemeProvider          (dark/light mode)
    └── AuthProvider       (login/register/logout)
        └── AppContent
            └── NavigationContainer
                └── FavoritesProvider   (favorites)
                    └── ToastProvider   (notifications)
                        └── RootNavigator
```

### Navigation Structure

```
RootStack (Native Stack Navigator)
├── [When NOT logged in]
│   ├── Login              → LoginScreen
│   └── Register           → RegisterScreen
│
└── [When logged in]
    ├── Main               → MainTabNavigator (Bottom Tabs)
    │   ├── HomeTab        → HomeScreen
    │   ├── FavoritesTab   → FavoritesScreen
    │   └── ProfileTab     → ProfileScreen
    ├── ImageDetails       → ImageDetailsScreen
    └── EditProfile        → EditProfileScreen
```

---

## 5. Data Storage

All data is stored locally on the device using **AsyncStorage** (key-value storage). There is **no backend server or database**.

### Storage Keys

| Key | Type | Purpose |
|---|---|---|
| `@user` | JSON Object | Currently logged-in user session (no password) |
| `@users` | JSON Array | All registered user accounts |
| `@favorites` | JSON Array | User's saved/favorited images |
| `@theme` | String | Theme preference: `"dark"` or `"light"` |

### Data Schemas

**User Object (`@users`)**
```json
{
  "id": "1693584000000",
  "fullName": "John Doe",
  "email": "john@example.com",
  "gender": "Male",
  "mobile": "9876543210",
  "address": "123 Main Street",
  "city": "New York",
  "password": "secret123",
  "avatar": "av3"
}
```

**Session Object (`@user`)**
```json
{
  "id": "1693584000000",
  "fullName": "John Doe",
  "email": "john@example.com",
  "gender": "Male",
  "mobile": "9876543210",
  "address": "123 Main Street",
  "city": "New York",
  "avatar": "av3"
}
```

**Favorites Array (`@favorites`)**
```json
[
  {
    "id": "1",
    "url": "https://loremflickr.com/600/400/offroad,car,suv,4x4?lock=1",
    "author": "Offroad Car #1",
    "width": 600,
    "height": 400
  }
]
```

---

## 6. Feature Breakdown

### 6.1 Authentication

| Operation | How It Works |
|---|---|
| **Register** | User fills form → validated → added to `@users` array in AsyncStorage |
| **Login** | Email + password matched against `@users` → session saved to `@user` |
| **Auto-login** | On app start, checks `@user` — if exists, user is logged in |
| **Logout** | Deletes `@user` from AsyncStorage |
| **Edit Profile** | Updates `@user` and the matching entry in `@users` |

**Validation rules:**
- Full name: required, minimum 2 characters
- Email: required, valid format
- Gender: required (Male/Female/Other)
- Mobile: required, exactly 10 digits
- Address: required, minimum 5 characters
- City: required, must select from list
- Password: required, minimum 6 characters
- Confirm password: must match password

### 6.2 Image Gallery

| Feature | Implementation |
|---|---|
| **Image source** | LoremFlickr API (placeholder images) |
| **Image loading** | Client-side URL generation (no API call) |
| **Pagination** | 30 images per page, infinite scroll |
| **Pull-to-refresh** | RefreshControl on FlatList |
| **Search** | Filter by author name (case-insensitive) |
| **Alphabetical filter** | All / A-M / N-Z filter chips |

### 6.3 Favorites

| Feature | Implementation |
|---|---|
| **Add favorite** | Tap heart icon on ImageCard or ImageDetails |
| **Remove favorite** | Tap heart again to toggle |
| **Persistence** | Saved to AsyncStorage (`@favorites`) |
| **Search favorites** | Filter by author name |

### 6.4 Image Details & Download

| Feature | Implementation |
|---|---|
| **Detail view** | Author, image ID, resolution |
| **Fullscreen viewer** | Modal with zoom, favorite + download actions |
| **Download** | Uses expo-sharing to open system share sheet |
| **Platform handling** | Web: direct download link; Mobile: share sheet |

### 6.5 Profile Management

| Feature | Implementation |
|---|---|
| **View profile** | Avatar, name, email, all personal info |
| **Edit profile** | Update name, email, gender, mobile, address, city |
| **Avatar selection** | 12 emoji avatars in a modal grid |
| **Dark mode toggle** | Persists to AsyncStorage |

### 6.6 Theme (Dark/Light Mode)

| Feature | Implementation |
|---|---|
| **Toggle** | In Profile → Settings |
| **Colors** | 28 color tokens per theme |
| **Persistence** | Saved to AsyncStorage (`@theme`) |
| **Components** | All components are theme-aware via `useTheme()` |

---

## 7. Multi-Device Login — Why It Doesn't Work

### Current State

**Can you login on multiple devices? NO.**

### Explanation

AsyncStorage is **local device storage only**. It is like a notebook that stays on your desk — it does not travel to other devices.

| What Happens | Device A | Device B |
|---|---|---|
| Register "john@test.com" | Account saved locally | Nothing — no connection |
| Login "john@test.com" | Works (found locally) | Fails — account doesn't exist |
| Add favorites | Saved on Device A | Not visible on Device B |

### Why This Limitation Exists

1. **No backend server** — There is no server that both devices can talk to
2. **No database** — User accounts exist only in the device's local storage
3. **No API calls** — Login/register happens entirely on-device
4. **No network sync** — No mechanism to sync data between devices

### What Would Be Needed

To enable multi-device login, the app would need:

| Component | Purpose |
|---|---|
| Backend server | Central place to store and verify accounts |
| Database | PostgreSQL, MongoDB, or Firebase Firestore |
| REST/GraphQL API | HTTP endpoints for login, register, etc. |
| Authentication tokens | JWT or session tokens for secure access |
| Password hashing | bcrypt/argon2 (never store plain passwords) |

### Architecture Comparison

**Current (Local Only)**
```
Phone A ←→ AsyncStorage (local)
Phone B ←→ AsyncStorage (local)
[No connection between A and B]
```

**With Backend (Multi-Device)**
```
Phone A ──┐
           ├──→ Backend Server ←── Database
Phone B ──┘
[Both devices share the same data]
```

---

## 8. API & External Services

| Service | URL | Purpose |
|---|---|---|
| LoremFlickr | https://loremflickr.com | Placeholder images |
| Expo Build | https://expo.dev | Cloud APK/AAB building |

**Image URL format:**
```
https://loremflickr.com/{width}/{height}/{tags}?lock={id}

Example:
https://loremflickr.com/600/400/offroad,car,suv,4x4?lock=42
```

---

## 9. Build & Deployment

### EAS Build Configuration

**Preview profile (APK):**
```json
{
  "preview": {
    "distribution": "internal",
    "android": {
      "buildType": "apk"
    }
  }
}
```

**Production profile (AAB for Play Store):**
```json
{
  "production": {
    "android": {
      "buildType": "app-bundle"
    }
  }
}
```

### Build Commands

| Command | Purpose |
|---|---|
| `npx expo start` | Run locally in development |
| `npx eas build --platform android --profile preview` | Build APK for testing |
| `npx eas build --platform android --profile production` | Build AAB for Play Store |

---

## 10. Testing

The project includes **71 unit tests** in `test/test-all.js` covering:

| Test Suite | Tests |
|---|---|
| Full Name Validation | 5 |
| Email Validation | 6 |
| Gender Validation | 4 |
| Mobile Validation | 5 |
| Address Validation | 3 |
| City Validation | 2 |
| Password Validation | 4 |
| Confirm Password | 3 |
| Register Form Validation | 3 |
| Edit Profile Validation | 2 |
| Duplicate Email Detection | 3 |
| ImageService URL Generation | 3 |
| Favorites Add/Remove | 4 |
| Search & Filter Logic | 10 |
| Theme Color Definitions | 2 |
| Constants Data Integrity | 4 |
| Navigation Route Definitions | 2 |
| Type Structure | 2 |
| Pagination Logic | 3 |
| Download Platform Handling | 1 |

**Run tests:**
```bash
node test/test-all.js
```

---

## 11. Security Notes

| Concern | Current State | Recommendation |
|---|---|---|
| Password storage | Stored in plain text in AsyncStorage | Use bcrypt hashing + secure storage |
| Session management | Simple AsyncStorage key | Use JWT + SecureStore |
| Data validation | Client-side only | Add server-side validation |
| API security | No authentication | Add API keys / auth tokens |

---

## 12. Known Limitations

1. **No backend** — All data is local, no multi-device sync
2. **No real image API** — Uses LoremFlickr placeholder images
3. **Passwords in plain text** — Should be hashed for production
4. **No error boundary for all screens** — Only top-level error boundary
5. **No offline support for images** — Images require network
6. **No push notifications** — Not implemented

---

*Documentation generated for ImageGallery v1.0.0*
