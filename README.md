# Scrambly test app

## Overview

The **Scrambly test app** is a simple example of how to fetch JSON data, parse it, and display it to the user. The main design goal was to keep the implementation as straightforward as possible — given the simplicity of the task, there was no need to overarchitect the solution.

Main external packages: 
- @react-navigation: for screen navigation
- axios: a cleaner replacement for the native fetch API
- lottie-react-native: for lightweight animations
- react-native-dotenv: to manage environment variables

### Components and tech decisions

#### Data management
To keep things simple and avoid overengineering, we use React Context in combination with AsyncStorage instead of Redux for state management. This approach is lightweight and appropriate for the app's scope.

### Network service and fetching of data
The **NetworkService** file is a singleton that contains all network calls. The getPosts function is invoked from the useDataContext hook, which is also responsible for handling the response and managing local state.

## How to run the app

### Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

#### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

To install CocoaPods dependencies, navigate to the `ios` directory and run:


For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Additional iOS Setup

### Set Development Team in Xcode

To run the app on a physical iOS device or simulator, you must set your development team in Xcode:

1. Open the project in Xcode:

   ```sh
   open ios/TestAppScrambly.xcworkspace
2. Navigate to Signing & Capabilities
Change **development team** and **bundle identifier**.

## Run tests

```sh
# Using npm
npm run test

# OR using Yarn
yarn test
```


