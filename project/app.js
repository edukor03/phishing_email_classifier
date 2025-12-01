import express, { urlencoded } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Dashboard from './src/routes/dashboardRoutes.js'
import Upload from './src/routes/dashboardRoutes.js'

// Create a variable that stores the path route to this folder
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Essential variables and initialising app
const PORT = 3000;
const app = express();

// Define location for public folder
app.use(express.static(path.join(__dirname, "/public")));

// Set views folder and set engine to use ejs format
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

// Use routes
app.use(Dashboard);
app.use(Upload);

// Create a server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});