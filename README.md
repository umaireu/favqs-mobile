# FavQ Mobile App

A React Native mobile application for browsing and managing favorite quotes using the FavQ API.

![rn-mobile](https://github.com/user-attachments/assets/16b6c059-1623-440d-b953-59d8f123f47b)

## Overview

FavQ Mobile is a cross-platform mobile app that allows users to:

- Browse daily quotes
- Search for quotes by keywords
- Save favorite quotes locally
- View upvotes and downvotes for quotes
- Explore quotes by tags

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Local storage for favorites
- **React Native Vector Icons** - Icon library
- **Jest** - Testing framework

## Prerequisites

> **Important**: This project uses React Native CLI (not Expo). You need to set up your development environment for native development.

### Required Tools:

- **Node.js** >= 18
- **React Native CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Environment Setup:

Follow the official React Native environment setup guide:
[React Native - Set up your environment](https://reactnative.dev/docs/set-up-your-environment)

## Environment Variables

Create a `.env` file in the root directory:

```env
FAVQ_EXTERNAL_API_BASE_URL=https://favqs.com/api
FAVQ_EXTERNAL_API_KEY=your_api_key_here
FAVQ_INTERNAL_API_BASE_URL=http://localhost:3000/api
```

> **Note**: Get your API key from [FavQ API Documentation](https://favqs.com/api)

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd favqs-mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Project Structure

```
src/
├── components/         # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── services/           # API and storage services
├── hooks/              # Custom hooks
├── types/              # TypeScript type definitions
├── theme/              # Theme and styling
└── utils/              # Utility functions
```

## Features

- **Quote of the Day**: Display daily featured quotes
- **Favorites**: Save and manage favorite quotes locally
- **Search**: Find quotes by keywords or authors
- **Loading**: Loading states
- **Error Handling**: Error states and user feedback

## Development

### Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Testing

```bash
npm test
```

## Troubleshooting

If you encounter issues:

1. Check the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting)
2. Ensure your development environment is properly set up
3. Clear Metro cache: `npx react-native start --reset-cache`
4. Clean and rebuild:
   - Android: `cd android && ./gradlew clean && cd ..`
   - iOS: `cd ios && xcodebuild clean && cd ..`
