# Restaurant Menu Project

## Project Overview

This is a **Restaurant Menu** project built using **React** and **Vite**. The project incorporates state management with **Redux**, uses **TailwindCSS** for styling, and leverages **Storybook** for component development. It also includes **TypeScript**, **ESLint**, and **Prettier** for code quality and formatting.

The menu data is hosted on [GitHub Gist](https://gist.githubusercontent.com/GhayoorShan/e9b444362761dfd1858a9599054ec242/raw/b6c4cf11516aa060faed84457e0036cf8a319e6a/gistfile1.json), and this project fetches the menu dynamically to display it.

## Features

- **Vite** as a fast development server and build tool.
- **React 18** for building UI components.
- **Redux Toolkit** for state management.
- **TailwindCSS** for responsive and utility-first styling.
- **Storybook** for isolated component development.
- **Vitest** for testing.
- **GitHub Pages** for deployment using the `gh-pages` branch.

## Prerequisites

Before running or building the project, make sure you have the following tools installed:

- **Node.js** (version 18 or above)
- **Git**
- **Vite** and **npm** are automatically available after installing Node.js.

## Installation and Setup

1. **Clone the repository**:

git clone https://github.com/GhayoorShan/restaurant-menu
cd restaurant-menu

2. **Install dependencies**:

Install all necessary dependencies using npm:
npm install

## Running the Project

1. **Start the development server**:

To run the project locally with hot-reloading, use:
npm run dev
This will start a local server at http://localhost:3000/, where you can view the application.

2. **Preview the production build**:

If you want to preview the production version of the application, use:
npm run preview

## Building the Project

To build the project for production, run:
npm run build

## Deploying to GitHub Pages

This project is set up to be deployed to GitHub Pages using the gh-pages package.

**Deploy the project**:

To deploy the project to GitHub Pages, run:
npm run deploy

This will push the contents of the dist folder to the gh-pages branch and publish your site at:
https://<your-github-username>.github.io/restaurant-menu

## Running Tests

This project uses Vitest for unit testing. To run the tests:
npm run test

To run the Vitest UI for a more interactive testing experience:
npm run test:ui

## Storybook

This project uses Storybook for component development in isolation.

**Run Storybook**:

To start Storybook locally:
npm run storybook
This will start Storybook at http://localhost:6006/, where you can interact with your components.

## Linting and Formatting

**Run ESLint**:

To lint your code and check for potential issues, run:
npm run lint

## Environment Variables

The `VITE_API_BASE_URL` is used to fetch the menu data. It is stored in an `.env` or `.env.production` file in the project root.

For ease of use and testing purposes, the environment variable has been uploaded intentionally.
