# GitHub ReactNative Issues

A powerful mobile application for tracking and managing GitHub issues, specifically designed for the React Native repository.

## Features

- Browse issues from the Facebook React Native repository
- Search issues by title and body content
- Filter issues by status (open/closed)
- View detailed issue information including:
  - Issue title and description
  - Creation date and last update
  - Issue status and labels
  - Assignees and comments
- Navigate through issues using pagination
- View issue comments with pagination support

## Technology Stack

The app is built using modern technologies to provide a seamless experience:

- **React Native**: A powerful framework for building native mobile applications using React
- **Expo**: A comprehensive development platform that simplifies React Native development with:
  - Easy project setup and configuration
  - Cross-platform development tools
  - Built-in components and APIs
  - Simplified deployment process
- **GitHub GraphQL API**: 
  - Modern API for efficient data fetching
  - Precise data queries to minimize network requests
  - Real-time issue tracking capabilities
  - Advanced search and filtering options

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npx expo start
   ```

## Expo Development Guide

This project is built with [Expo](https://expo.dev) and uses [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

### Development Options
You can run the app in:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### Project Structure
The project uses [file-based routing](https://docs.expo.dev/router/introduction). You can start developing by editing the files inside the **app** directory.

### Learn More
To learn more about developing your project with Expo, look at the following resources:
- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
