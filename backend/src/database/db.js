const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');


const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('Connected to SQLite database');
        
        
        const schemaPath = path.join(__dirname, '..', '..', 'schema.sql');
        fs.readFile(schemaPath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading schema file:', err);
            reject(err);
            return;
          }
          
          db.exec(data, (err) => {
            if (err) {
              console.error('Error executing schema:', err);
              reject(err);
            } else {
              console.log('Database schema initialized');
              resolve(db);
            }
          });
        });
      }
    });
  });
};

module.exports = { initDatabase };