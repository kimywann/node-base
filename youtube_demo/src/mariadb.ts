// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
    host: "localhost",
    password: "root",
    user: "root",
    database: "Youtube",
    dateStrings: true,
});

export default connection;
