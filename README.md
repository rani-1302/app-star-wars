# Star Wars Character App

This application is built using Node.js 20, TypeScript, Redux Toolkit, Redux Query, SCSS, and React 18. The application uses Redux Toolkit for state management and Redux Query for data fetching and caching. Redux Thunk is the middleware. Jest and React Testing library is used for TDD. Eslint and Prettier is used for code formatting and linting. Webpack is the bundler. As this was for assignment and I was not sure if i am allowed to use create-react-app or vite for boilerplate hence I have written custom configuration.

## Overview

The Star Wars Character App allows users to view and search for Star Wars characters. User Can add/remove characters to favourite list and view favourite list. The application also allows users to see character details.

## Features

- **State Management**: For State Management Redux with Redux Toolkit is used.
- **Data Fetching**: Managed with RTK Query’s `createApi`.
- **Styling**: SCSS for custom styling.
- **Documentation**: JSDoc comments for detailed component descriptions.

## Challenges

- **Design Decisions**:
  On the official website when i tried `/people` API endpoint it returned 10 records per request with count of total number of records. To minimize API requests, I have developed this in such a way that search is triggered with a button click or Enter key press and not on change. This limitation affected the implementation of autocomplete functionality. I would have liked to have a api which gives the metadata about the people so that i can show the suggestions to users. As soon as they enter, suggestions are shown to user about possible values and they can select the character.

  The `/people/schema` API endpoint on https://swapi.dev/ gives 404 error.

I timeboxed this exercise to 3 hours. I think there is scope of UX improvement. I tried to make the application accessible but I think I can improve it as well.
As the api's were read only I did not work on bonus task. I could have created a server using next or express and used it but by the time i completed things which was higher in priority 3hr was over.

If this project were to serve as the foundation for a much larger application, with multiple teams of developers contributing, I would adjust my approach in several ways. Right now this is a single application but as multiple teams will be working on this it can be part of eithe a monorepo or a micro front end. I would place greater emphasis on creating a well-documented, modular codebase. I would also consider implementing more rigorous testing, continuous integration, and establishing clear coding standards to ensure consistency across the project. The Components can be published as a seperate share library and used. It should be more generic. I would also consider using storybooks for visualizing components in isolation. For API have proper type checking.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/your-username/your-repository.git
   cd app-star-wars
   ```

2. **Install Dependencies**
   `npm install`
3. **Start the Development Server**
   `npm start`
   The application will be launched at http://localhost:8080.
