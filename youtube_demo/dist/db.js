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
// A simple SELECT query
// try {
//     const [results, fields] = await connection.query<RowDataPacket[]>(`SELECT * FROM users`);
//     const { id, email, password, name, tel, created_at } = results[0] as User;
//     console.log(id, email, password, name, tel, created_at);
//     console.log(results);
//     console.log(fields);
// } catch (err) {
//     console.log(err);
// }
// Using placeholders
// try {
//     const [results] = await connection.query(
//         "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//         ["Page", 45],
//     );
//     console.log(results);
// } catch (err) {
//     console.log(err);
// }
export default connection;
