# Interview Scheduler

React application that allows users to create, edit and delete interview appointments. We combine a concise API with a WebSocket server to build a realtime experience.

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
  Jest tests are used through the development of the project.

## Screenshots

Home Page
!["Home Page"]()

## Technical Specifications

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

- React
- Webpack, Babel
- Axios, WebSockets
- Axios
- Storybook, Webpack Dev Server, Jest, Testing Library

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
