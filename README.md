# Interview Scheduler

React application that allows users to create, edit and delete interview appointments. We combine a concise API with a WebSocket server to build a realtime experience.

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.
- Data is persisted by the API server using a PostgreSQL database.
- The client application communicates with an API server over HTTP, using the JSON format.
  Jest tests are used through the development of the project.
- Site was deployed with heroku and deployed with netlify

## Screenshots

Home Page
!["HomePage"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/home-page.png)

Clicking the '+' will bring up an empty form
!["EmptyForm"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/blank-form.png)

User adds name and selects interviewer to form
!["form"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/new-interview.png)

On hover, options to update appointment or Delete are shown
!["editOrDelete"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/hover-delete.png)

Delete Confirmation
!["deleteConfirmation"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/delete-interview.png)

When the user sucessfully deletes an appointment, spots remaining updates and the appointment is removed
!["postDelete"](https://github.com/dimontejulia/scheduler/blob/master/public/images/screenshots/post-delete.png)

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
