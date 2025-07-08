# Baguio Trip Website

## Overview
This project is a mobile-responsive website designed for a 3D2N trip to Baguio. It includes various features to enhance the trip experience, such as itinerary management, bill splitting, money tracking, weather integration, and a fun "spin the wheel" activity.

## Features
- **Itinerary**: Displays the planned activities and schedules for the trip.
- **Bill Splitter**: Manages expenses among friends, tracks who has paid, and calculates the total amount owed.
- **Money Tracker**: Keeps track of the total sum of money on hand and any expenses incurred during the trip.
- **Weather Integration**: Fetches and displays current weather conditions for Baguio.
- **Spin the Wheel**: A fun interactive feature for engaging users during the trip.
- **Personalized Dashboard**: Allows users to customize their experience with nicknames and profile photos.
- **Admin Panel**: Provides administrative functionalities for managing trip details and user interactions.

## Project Structure
```
baguio-trip-website
└── baguio-trip-website
    ├── public
    │   ├── css
    │   │   └── tailwind.css
    │   ├── js
    │   │   └── main.js
    │   └── index.html
    ├── src
    │   ├── components
    │   │   ├── Itinerary.js
    │   │   ├── BillSplitter.js
    │   │   ├── MoneyTracker.js
    │   │   ├── Dashboard.js
    │   │   ├── AdminPanel.js
    │   │   ├── Weather.js
    │   │   └── SpinTheWheel.js
    │   └── App.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── README.md
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Build the project and start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to view the website.

## Technologies Used
- **Tailwind CSS**: For styling the website.
- **JavaScript**: For interactivity and functionality.
- **React**: For building the user interface components.

## Contribution
Feel free to contribute to this project by submitting issues or pull requests. Your feedback and suggestions are welcome!