import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('skin_disease.db');

// Initialize DB
export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        imageUri TEXT,
        disease TEXT,
        confidence TEXT,
        advice TEXT,
        date TEXT
      );`,
      [],
      () => console.log("✅ History table created or already exists."),
      (_, error) => {
        console.error("❌ Error creating history table:", error);
        return false; // stops transaction on error
      }
    );
  });
};

// Save result
export const saveResult = (imageUri, disease, confidence, advice) => {
  const date = new Date().toISOString();
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO history (imageUri, disease, confidence, advice, date) 
       VALUES (?, ?, ?, ?, ?);`,
      [imageUri, disease, confidence, advice, date],
      () => console.log("✅ Result saved successfully."),
      (_, error) => {
        console.error("❌ Error saving result:", error);
        return false;
      }
    );
  });
};

// Get history
export const getHistory = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM history ORDER BY id DESC;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (_, error) => {
        console.error("❌ Error fetching history:", error);
        return false;
      }
    );
  });
};
