const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

const dbConfig = {
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'mydatabase'
};

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

connection.query(`CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table "people" is ready.');
});

connection.query("INSERT INTO people (name) VALUES ('Marcos Durval')", (err) => {
  if (err) {
    console.error('Error inserting data:', err);
    return;
  }
  console.log('Inserted a new person into the database.');
});

app.get('/', (req, res) => {

  connection.query('SELECT * FROM people', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }

    let responseHtml = '<h1>Full Cycle Rocks!</h1><ul>';
    results.forEach(person => {
      responseHtml += `<li>${person.name}</li>`;
    });
    responseHtml += '</ul>';

    res.send(responseHtml);
  });
});

app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});