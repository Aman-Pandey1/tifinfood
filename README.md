## Food Service Application (Admin, Seller, Customer)

Monorepo with backend (Node/Express/MongoDB) and mobile app (Expo React Native, TypeScript).

### Structure

```
/backend  - Node.js API (TypeScript, Express, MongoDB)
/app      - Expo React Native app (TypeScript)
```

### Backend

1. Copy env:
```bash
cp backend/.env.example backend/.env
```

2. Start dev server:
```bash
cd backend && npm run dev
```

APIs:
- Auth: POST `/api/auth/register`, `/api/auth/login`
- Admin: GET `/api/admin/pending-sellers`, POST `/api/admin/approve-seller/:id`, `/api/admin/reject-seller/:id`, `/api/admin/block-user/:id`, `/api/admin/unblock-user/:id`, GET `/api/admin/dashboard`
- Seller: POST `/api/seller/profile`, `POST /api/seller/food-items`, `PUT /api/seller/food-items/:itemId`, `DELETE /api/seller/food-items/:itemId`, `GET /api/seller/orders`, `POST /api/seller/orders/:orderId/status`
- Customer: GET `/api/customer/nearby-sellers`, `GET /api/customer/seller/:sellerId/menu`, `POST /api/customer/orders`, `GET /api/customer/orders`, `POST /api/customer/reviews`
- Complaints: POST `/api/complaints` (customer), GET `/api/complaints` and POST `/api/complaints/:id/status` (admin)
- User: GET `/api/user/me`, POST `/api/user/location`

### Mobile App

1. Set API URL:
```bash
cp app/.env.example app/.env
# Update EXPO_PUBLIC_API_URL if running on device/emulator
```

2. Start app:
```bash
cd app && npm run android # or npm run web
```

Role-based tabs:
- Admin: Dashboard, Approvals, Complaints
- Seller: Menu, Orders, Profile
- Customer: Discover, Orders, Account

Notes:
- This scaffold includes basic flows and endpoints; extend for payments, richer menus, and media management in production.
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

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

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
