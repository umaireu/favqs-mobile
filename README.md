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
├── screens/            # Screen components (e.g Home, Favorites)
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

## Screenshots
<img width="349" alt="Screenshot 2025-06-30 at 18 52 53" src="https://github.com/user-attachments/assets/f8d3d002-22cb-4c43-82e9-4b6b5026ed28" />


<img width="349" alt="Screenshot 2025-06-30 at 18 53 01" src="https://github.com/user-attachments/assets/f5359060-8515-42f0-9fbf-ad9859b07a8c" />

<img width="349" alt="Screenshot 2025-06-30 at 18 53 11" src="https://github.com/user-attachments/assets/0f422505-d26b-473a-979f-d18d793b898c" />

<img width="349" alt="Screenshot 2025-06-30 at 18 53 41" src="https://github.com/user-attachments/assets/1f2e368f-9652-4bda-90e6-60002ffab6a5" />

<img width="349" alt="Screenshot 2025-06-30 at 18 53 51" src="https://github.com/user-attachments/assets/763a3688-8175-4f88-a4a0-7303f467039c" />

