# Movies App

## Overview

The **Movies App** is a React-based project that demonstrates various concepts learned in the React course. It utilizes class components, lifecycle methods, routing, authentication, and authorization. The app fetches data from internal APIs, displays movie information, and handles user authentication.

## Technologies Used
- Frontend: React, React Router
- Styling: CSS, Figma for design
- State Management: React Context API
- Date Formatting: date-fns
- Third-party Libraries: React Slick (for carousel functionality)

## Live Demo
- Explore the live version of the Movies App : [phanimoviesapp.ccbp.tech](phanimoviesapp.ccbp.tech).
    ### User Credentials
    Choose any of the following:
    - `username: aakash`, `password: sky@007`
    - `username: agastya`, `password: myth#789`
    - `username: advika`, `password: world@5`
    - `username: binita`, `password: modest*6`
    - `username: chetan`, `password: vigor$life`
    - `username: deepak`, `password: lightstar@1`
    - `username: harshad`, `password: joy@85`
    - `username: kapil`, `password: moon$008`
    - `username: rahul`, `password: rahul@2021`
    - `username: shravya`, `password: musical#stone`
    - `username: saira`, `password: princess@9`


## Design Files
-  Refer to [Figma Design Files](https://www.figma.com/file/tPdVlj0p5PESmymNkHYVgk/Movies_App?node-id=0%3A1).

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
```
### 2. Navigate to the Project Directory
```bash
cd movies-app
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Start the App
```bash
npm start
```
The app will run on `http://localhost:3000/`.

### 5. Explore the App
Open the app in your preferred browser and explore the functionalities.


## Functionalities
### Login Route
- Handles user login with error messages.
- Navigates to the Home Route upon successful login.
- Redirects unauthenticated users from other routes to the Login Route.

### Home Route
- Fetches data from Trending Now Movies and Originals APIs.
- Displays a random movie from Originals and lists movies from both APIs.
- Handles movie clicks to navigate to Movie Item Details Route.

### Popular Route
- Fetches data from Popular Movies API.
- Displays movies and handles clicks to navigate to Movie Item Details Route.

### Movie Item Details Route
- Fetches details for a specific movie.
- Displays movie details and a list of similar movies.

### Search Route
- Fetches movies based on search queries.
- Displays search results and handles clicks to navigate to Movie Item Details Route.

### Account Route
- Displays user credentials from login.
- Allows users to log out.

### Not Found Route
- Redirects to the Not Found Route for invalid paths.