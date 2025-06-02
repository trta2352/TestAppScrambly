# Scrambly test app

## Overview

The **Scrambly test app** is a simple example how to fetch JSON data parse it and then display it to the user. The main design approach was to keep it as simple as possible since due to the complexity I felt there was no need to approach it in any other way. 

Main external packages: 
- @react-navigation: navigation between screens
- axios: replacement of the native fetch module,
- lottie-react-native: simple animation library,
- react-native-dotenv: enviromental variables. 

### Components and tech decisions

#### Data management
For the sake of simplicity and to not over architect a simple application it was decided to use a context together with AsyncStorage instead of Redux for state management. 

### Network service and fetching of data
The NetworkService file is a singleton where all network calls are located. The getPost function is called from useDataContext where the response is also managed. 

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

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```
