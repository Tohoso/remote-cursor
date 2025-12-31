# TASK-001: Initialize Expo project and setup base structure

## 1. Context

This is the first implementation task for the **Remote Cursor** project. The goal is to create the foundation for the mobile application.

- **Project Overview**: See `CLAUDE.md`
- **Requirements**: See `docs/requirements/requirements_definition.md`
- **Architecture**: See `docs/design/architecture_design.md`

## 2. Requirements

1.  **Initialize a new Expo Project**:
    -   Inside the `src/` directory, create a new directory named `mobile`.
    -   Initialize a new Expo (React Native) project within the `src/mobile` directory.
    -   Use the TypeScript template.

2.  **Setup Directory Structure**:
    -   Inside `src/mobile`, create the following directory structure:
        ```
        src/mobile/
        ├── app/              # App screens and routing
        ├── assets/           # Images, fonts, etc.
        ├── components/       # Reusable components
        ├── constants/        # Constants like colors, styles
        ├── hooks/            # Custom hooks
        ├── navigation/       # Navigation setup
        └── services/         # API clients, etc.
        ```

3.  **Install Dependencies**:
    -   Install the following core dependencies:
        -   `nativewind` for TailwindCSS support
        -   `@react-navigation/native` and its related packages for routing

4.  **Basic App Setup**:
    -   Configure `tailwind.config.js` for NativeWind.
    -   Modify `App.tsx` to display a simple "Welcome to Remote Cursor" message centered on the screen.

## 3. Acceptance Criteria

-   The Expo project is successfully created in `src/mobile`.
-   The specified directory structure exists.
-   All required dependencies are added to `package.json`.
-   The app runs successfully on an iOS or Android simulator using `npx expo start`.
-   The welcome message is displayed correctly.

## 4. Priority

**High** - This is the foundational task for the entire mobile application.

## 5. Agent Delegation

This task should be primarily handled by the **maker-agent**.
