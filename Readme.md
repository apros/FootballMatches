# Football Matches Application

This project is a web application that displays football matches in a carousel format. Users can toggle between recent and upcoming matches for various leagues, with each match card displaying team names, crests, match date, and scores.

## Features

- Toggle between recent and upcoming matches.
- Display matches for multiple leagues.
- Horizontal scrolling carousel for each league.
- Team icons and scores displayed on match cards.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- A modern web browser (Google Chrome recommended for development).

### Installation

1. **Install Dependencies**

   If your project has any dependencies, install them using npm:

   ```bash
   npm install
   ```

2. **Run the Application**

   You can use a simple HTTP server to serve your files. You can run:

   ```bash
   node server.js
   ```

   It would be best if you also ran proxyServer.js to run the API server.

   ```bash
   node proxyServer.mjs
   ```

3. **Open the Application**

   Open your web browser and navigate to `http://localhost:3000` to view the application.

   ![Screenshot 2024-12-04 000807](https://github.com/user-attachments/assets/62adb869-2265-4677-9127-e41f7b00746f)

   ![Screenshot 2024-12-04 000642](https://github.com/user-attachments/assets/633b8d5e-3df8-4cd7-a4d4-1d82e7784fda)

## Usage

- Use the toggle switch to switch between recent and upcoming matches.

## Additional Notes

- **API Endpoint**: Ensure that the API endpoint (`http://localhost:3001/api`) is running and accessible. You may need to set up a local server to provide match data.
- **Performance Testing**: Use Google Chrome's Lighthouse tool to test and optimize the application's performance.
- **Customization**: You can customize the leagues and their full names in the `app.js` file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
