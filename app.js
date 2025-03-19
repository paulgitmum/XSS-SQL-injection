const express = require("express");
const escapeHtml = require("escape-html"); 
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Simulated Database Query Execution Function (Unsafe)
function fakeDatabaseQuery(query) {
    console.log("Executing SQL:", query); 
    return "Fake user data returned!"; 
}

app.get("/", (req, res) => {
    res.send(`
        <form action="/search" method="GET">
            <input type="text" name="query" placeholder="Enter your search">
            <button type="submit">Search</button>
        </form>
    `);
});

app.get("/search", (req, res) => {
    const query = req.query.query;

    // Simulated SQL injection vulnerability 
    const sqlQuery = `SELECT * FROM users WHERE name = '${query}'`; 
    const result = fakeDatabaseQuery(sqlQuery); // Simulating SQL execution

    // XSS vulnerability: direct insertion of user input into HTML
    res.send(`<h1>Results for: ${query}</h1> <p>${result}</p>`); 
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
