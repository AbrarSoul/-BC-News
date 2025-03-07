# News App

## Description
This is a React-based news application that fetches and displays top headlines from the GNews API. Users can browse news articles by category, toggle between light and dark modes, and see the current date and time.

## Live Demo
Explore the app in this link - [@BC News](https://bc-news.onrender.com/).

## Features
- Fetches top news headlines from GNews API.
- Supports multiple news categories (e.g., Business, Technology, Sports, Science, etc.).
- Dark mode toggle for better readability.
- Displays most important, latest, and popular news articles.
- Responsive design for a seamless experience on all devices.
- Auto-updating current date and time.

## Installation
### Prerequisites
- Node.js installed on your machine.
- A valid API key from [GNews API](https://gnews.io/).

### Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd news-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your API key:
   ```sh
   REACT_APP_GNEWS_API_KEY=your_api_key_here
   ```
5. Start the development server:
   ```sh
   npm start
   ```


## Usage
- Open `http://localhost:3000/` in your browser.
- Click on different categories to browse news articles.
- Toggle dark mode using the button in the top right corner.
- Click on article links to read full stories.

## Technologies Used
- React.js
- Axios (for fetching data from GNews API)
- CSS (for styling and dark mode support)

## License
This project is licensed under the MIT License.

## Author
Developed by Abrar Morshed
