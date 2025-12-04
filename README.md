# AI News 📰

A beautiful, modern mobile news application built with React Native and Expo that provides an engaging news reading experience with AI-powered features.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo](https://img.shields.io/badge/expo-~54.0.22-000020.svg)
![React](https://img.shields.io/badge/react-19.1.0-61dafb.svg)
![React Native](https://img.shields.io/badge/react--native-0.81.5-61dafb.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Key Components](#key-components)
- [Screens](#screens)
- [Configuration](#configuration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

AI News is a sleek and intuitive mobile application designed to deliver news content in an engaging, card-based interface. The app features smooth animations, AI-powered chat functionality, and a premium user experience with custom tab navigation and personalized content discovery.

## ✨ Features

### Core Features

- **📱 Card-Based News Feed** - Swipeable vertical card interface for browsing news articles
- **🤖 AI Chat Integration** - Interactive AI assistant for news summaries and discussions
- **🔖 Bookmark System** - Save articles for later with animated bookmark functionality
- **🎨 Premium UI/UX** - Modern design with glassmorphism effects and smooth animations
- **🌓 Automatic Theme Support** - Built-in support for light and dark modes
- **📂 Category Filtering** - Navigate through different news categories (For You, Latest, Tech, Entertainment, Sports, Politics)
- **🔄 Real-time Updates** - Dynamic content loading with elegant loading states

### User Interface Features

- **Animated Tab Navigation** - Custom bottom tab bar with spring animations
- **Gesture-Based Interactions** - Smooth swipe gestures for card navigation
- **Micro-interactions** - Delightful animations throughout the app
- **Responsive Design** - Optimized for all mobile screen sizes
- **Haptic Feedback** - Enhanced user experience with tactile responses

### Authentication

- **User Login/Signup** - Beautiful authentication screens with form validation
- **Social Login** - Google authentication integration ready
- **Profile Management** - User profile section for personalized settings

## 📸 Screenshots

_Coming soon - Add your app screenshots here_

## 🛠️ Tech Stack

### Core Technologies

- **[Expo](https://expo.dev)** (~54.0.22) - Framework for universal React applications
- **[React](https://reactjs.org)** (19.1.0) - JavaScript library for building user interfaces
- **[React Native](https://reactnative.dev)** (0.81.5) - Framework for building native apps
- **[TypeScript](https://www.typescriptlang.org)** (~5.9.2) - Typed superset of JavaScript

### Styling & UI

- **[NativeWind](https://www.nativewind.dev)** (^4.2.1) - Tailwind CSS for React Native
- **[TailwindCSS](https://tailwindcss.com)** (^3.4.18) - Utility-first CSS framework

### Navigation

- **[Expo Router](https://docs.expo.dev/router/introduction/)** (~6.0.14) - File-based routing for React Native
- **[React Navigation](https://reactnavigation.org)** (^7.1.19) - Navigation library
- **[@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator)** (^7.4.0)
- **[@react-navigation/material-top-tabs](https://reactnavigation.org/docs/material-top-tab-navigator)** (^7.4.2)
- **[@react-navigation/stack](https://reactnavigation.org/docs/stack-navigator)** (^7.6.6)

### Animations & Gestures

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** (~4.1.1) - Powerful animation library
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** (~2.28.0) - Gesture handling
- **[Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)** (^7.3.4) - Lottie animations support

### Additional Libraries

- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)** (~3.0.10) - Optimized image component
- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** (~15.0.7) - Haptic feedback
- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** (^15.0.3) - Icon library
- **[React Native Tab View](https://github.com/satya164/react-native-tab-view)** (^4.2.0) - Tab view component
- **[React Native Pager View](https://github.com/callstack/react-native-pager-view)** (^6.9.1) - Pager view

## 📁 Project Structure

```
ai-news/
├── app/                          # Application screens and routing
│   ├── (tabs)/                   # Tab-based screens
│   │   ├── _layout.tsx          # Tab navigation layout
│   │   ├── home.tsx             # Home screen
│   │   ├── saved.tsx            # Saved articles screen
│   │   ├── personlize.tsx       # Personalization screen
│   │   └── profile.tsx          # User profile screen
│   ├── screens/                  # Modal/overlay screens
│   │   └── aichat.tsx           # AI chat modal
│   ├── _layout.tsx              # Root layout
│   └── global.css               # Global styles
│
├── components/                   # Reusable components
│   ├── AssistantAi.tsx          # AI assistant component
│   ├── Card.tsx                 # News card component
│   ├── CardContainer.tsx        # Card scroll container
│   ├── Data.ts                  # Static data and constants
│   ├── HomeTabs.tsx             # Home screen tabs
│   ├── LoginComponent.tsx       # Login form
│   ├── ProfileComponent.tsx     # Profile display
│   └── SignUpComponent.tsx      # Sign up form
│
├── constants/                    # App constants
│   ├── icons.ts                 # Icon exports
│   └── images.ts                # Image exports
│
├── interfaces/                   # TypeScript interfaces
│   └── interfaces.d.ts          # Type definitions
│
├── assets/                       # Static assets
│   ├── images/                  # Image files
│   ├── icons/                   # Icon files
│   └── animations/              # Lottie animation files
│
├── app.json                      # Expo app configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── babel.config.js              # Babel configuration
├── metro.config.js              # Metro bundler configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Will be installed with dependencies
- **Expo Go** app on your mobile device - [iOS](https://apps.apple.com/app/apple-store/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

Optional for native development:

- **Android Studio** for Android development - [Download](https://developer.android.com/studio)
- **Xcode** for iOS development (macOS only) - [Download](https://developer.apple.com/xcode/)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-news
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables** (if applicable)
   ```bash
   # Create a .env file in the root directory
   # Add your API keys and configuration
   ```

### Running the App

1. **Start the development server**

   ```bash
   npm start
   ```

   Or:

   ```bash
   npx expo start
   ```

2. **Run on your preferred platform:**

   - **iOS Simulator** (macOS only):

     ```bash
     npm run ios
     ```

     Or press `i` in the Expo terminal

   - **Android Emulator**:

     ```bash
     npm run android
     ```

     Or press `a` in the Expo terminal

   - **Web Browser**:

     ```bash
     npm run web
     ```

     Or press `w` in the Expo terminal

   - **Physical Device**:
     - Install **Expo Go** on your device
     - Scan the QR code shown in the terminal

## 🧩 Key Components

### Card.tsx

The main news card component featuring:

- Dynamic color theming
- Bookmark functionality with Lottie animations
- Press animations using Reanimated
- Image display with proper sizing
- Action buttons (bookmark, comment, headphones)
- Navigation to AI chat

### CardContainer.tsx

Manages the scrollable card feed:

- Vertical scroll with snap-to-interval behavior
- Parallax scroll animations
- Scale and opacity interpolations
- Custom swipe threshold logic
- Optimized FlatList rendering

### HomeTabs.tsx

Custom category tab system:

- Material top tabs navigation
- Auto-scrolling active tab into view
- Smooth tab transitions
- Custom styling for active/inactive states
- Swipeable content switching

### AI Chat (aichat.tsx)

Full-featured chat interface:

- Animated entry transitions
- Message bubbles for user and AI
- Typing indicators
- Suggestion chips
- Expandable article text
- Multiple action buttons (bookmark, share, audio)
- Keyboard-aware layout

### Authentication Components

- **LoginComponent.tsx**: Login form with email/password
- **SignUpComponent.tsx**: Registration form with validation and Google sign-in option

## 📱 Screens

### Home Screen (`home.tsx`)

- Background image with overlay
- Category-based news tabs
- Scrollable card feed
- Bottom tab navigation

### Saved Screen (`saved.tsx`)

- List of bookmarked articles
- Quick access to saved content

### Personalize Screen (`personlize.tsx`)

- User preferences
- Content customization

### Profile Screen (`profile.tsx`)

- User authentication (login/signup)
- Account management
- Settings and preferences

### AI Chat Modal (`screens/aichat.tsx`)

- Transparent modal presentation
- Full-screen chat interface
- Animated transitions
- AI conversation flow

## ⚙️ Configuration

### App Configuration (`app.json`)

Key settings:

- **App Name**: ai-news
- **Slug**: ai-news
- **Platform Support**: iOS, Android, Web
- **New Architecture**: Enabled
- **Splash Screen**: Custom splash with light/dark mode support
- **Adaptive Icons**: Android adaptive icon support
- **Experiments**: TypedRoutes and React Compiler enabled

### Tailwind Configuration

The app uses NativeWind with custom configuration for styling. All utility classes from Tailwind CSS are available.

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Run linter
npm run lint

# Reset project to clean state
npm run reset-project
```

### Code Style

- **TypeScript** for type safety
- **ESLint** for code linting (expo config)
- **NativeWind/Tailwind** for styling
- **Functional components** with hooks
- **React.memo** for performance optimization

### Performance Optimizations

- **useNativeDriver** for animations
- **Memoized components** to prevent unnecessary re-renders
- **FlatList** with proper key extractors
- **Image optimization** using Expo Image
- **Lazy loading** with React Navigation
- **Worklets** for smooth gesture handling

## 📦 Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

### Configure Build

Set up EAS Build by creating an `eas.json` file:

```bash
eas build:configure
```

For more details, visit the [Expo EAS Build documentation](https://docs.expo.dev/build/introduction/).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev)
- Icons from [FontAwesome](https://fontawesome.com/)
- Animations powered by [Lottie](https://airbnb.design/lottie/)
- UI inspiration from modern news applications

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

**Made with ❤️ by ChaitanyaPotti**
