import express from 'express'; 
import decksRouter from './decks/decks.routes';
import cardsRouter from './cards/cards.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from './middleware/logger.middleware';
import dotenv from 'dotenv'; 

dotenv.config(); 
 
// The express() function is a top-level function exported by the express module. 
// It is a function that creates an Express application. Here, we
// are initializing the express application and assigning it to the app variable.
// Now that we have initialized the app, we can use it to define routes, start the server, and more.
const app = express();
const port = process.env.PORT; 

// The app.use() function is used to mount the middleware.
app.use(cors()); 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);

if (process.env.NODE_ENV == 'development') {
app.use(logger);
console.log(process.env.GREETING + ' in dev mode')
}

app.use('/', [decksRouter, cardsRouter]);

app.listen(port, () => {
    console.log(`Server listening on port at http://localhost:${port}`);
});



// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';

// // Load environment variables from .env file, where API keys and passwords are configured
// dotenv.config({ path: ".env"}); 
// // Create a new express application instance. 
// const app = express();

// // Define the port that the server will listen to.
// const port = 3000;

// /* Sets a route for the root URL of the application.
// App.get() handles HTTP get requests. req and res stand for request and response. Request and Response are
// request and response objects that express provides to the callback function.
// This function will be executed when the  GET request is made to the root URL.*/
// app.get('/', (req: Request, res: Response) => {

// // Sends a response to the client. The response is the string "Hello World from TypeScript!".
// res.send('Hello World from TypeScript!');

// });

// // This line specifies the port that the server will listen to and the callback function 
// // that woll execute when the server begins listening. 
// app.listen(port, () => {

// console.log(`Example app listening at http://localhost:${port}`)
// console.log(process.env.GREETING);
// });