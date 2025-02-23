const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(cors());

// Set up a connection to MySQL
const connection = mysql.createConnection({
    host: 'localhost',    // MySQL server address
    user: 'root',         // MySQL username
    password: '',         // MySQL password
    database: 'role_db'   // Your database name
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Endpoint to handle form submission and store roles
app.post('/submit-roles', (req, res) => {
    const roles = req.body.roles;

    // Log the received roles to ensure they're being sent properly
    console.log('Received roles:', roles);

    // We'll use promises to handle the async queries
    let promises = [];

    // First, clear the tables before inserting new values
    const clearTables = () => {
        return new Promise((resolve, reject) => {
            const deleteQueries = [
                'DELETE FROM activity_preferences',
                'DELETE FROM personality_traits',
                'DELETE FROM skills_interests',
                'DELETE FROM goals'
            ];

            let deletePromises = deleteQueries.map(query => {
                return new Promise((resolveDelete, rejectDelete) => {
                    connection.query(query, (err, results) => {
                        if (err) {
                            console.error('Error deleting data:', err);
                            rejectDelete(err);
                        } else {
                            resolveDelete(results);
                        }
                    });
                });
            });

            Promise.all(deletePromises)
                .then(() => resolve()) // Proceed to insert after all tables are cleared
                .catch(err => reject(err)); // Reject if any delete query fails
        });
    };

    // Clear the tables, then insert the new values
    clearTables()
        .then(() => {
            // Loop through each role and insert it into the corresponding table
            roles.forEach((role) => {
                let query;
                if (role === 'quiet_study' || role === 'group_study' || role === 'one_on_one') {
                    query = 'INSERT IGNORE INTO activity_preferences (activity_name) VALUES (?)';
                } else if (role === 'introverted' || role === 'extroverted' || role === 'balanced') {
                    query = 'INSERT IGNORE INTO personality_traits (trait_name) VALUES (?)';
                } else if (role === 'programming' || role === 'design' || role === 'writing') {
                    query = 'INSERT IGNORE INTO skills_interests (skill_name) VALUES (?)';
                } else if (role === 'personal_growth' || role === 'professional_growth' || role === 'learning') {
                    query = 'INSERT IGNORE INTO goals (goal_name) VALUES (?)';
                }

                // Create a promise for the query
                const promise = new Promise((resolve, reject) => {
                    connection.query(query, [role], (err, results) => {
                        if (err) {
                            console.error('Error inserting role:', err);
                            reject(err);  // Reject the promise if there's an error
                        } else {
                            console.log('Inserted role:', role);  // Log for verification
                            resolve(results);  // Resolve the promise if successful
                        }
                    });
                });

                promises.push(promise); // Add the promise to the array
            });

            // Wait for all promises to resolve
            return Promise.all(promises);
        })
        .then(() => {
            res.json({ success: true });  // Send the response after all inserts are done
        })
        .catch((err) => {
            res.status(500).json({ success: false, message: 'There was an error inserting roles.' });  // Send error response if any promise fails
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
