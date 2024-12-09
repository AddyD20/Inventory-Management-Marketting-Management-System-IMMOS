import express from 'express';
import pkg from 'pg';  // Import pg as the default
const { Pool } = pkg;  // Destructure the Pool class from the pg package
import bodyParser from 'body-parser';  // Default import for body-parser
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));  // Correct use of bodyParser
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Dairy',
  password: 'PassworD',
  port: 5432
});


app.post('/submit', async (req, res) => {
  // Log the incoming request data to debug
  console.log('Received request body:', req.body);

  const { table, product_name, quantity, unit_price, purchase_date, expiry_date } = req.body;

  if (!table || !product_name || !quantity || !unit_price || !purchase_date || !expiry_date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let query = '';
  const values = [product_name, quantity, unit_price, purchase_date, expiry_date];

  if (table === 'milk-table') {
    query = `
      INSERT INTO milk_inventory (product_name, quantity, unit_price, purchase_date, expiry_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  } else if (table === 'cheese-table') {
    query = `
      INSERT INTO cheese_inventory (product_name, quantity, unit_price, purchase_date, expiry_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  } else if (table === 'butter-table') {
    query = `
      INSERT INTO butter_inventory (product_name, quantity, unit_price, purchase_date, expiry_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  } else {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  try {
    const result = await pool.query(query, values);

    res.status(200).json({
      message: `Product added successfully to ${table}!`,
      product: result.rows[0]
    });
  } catch (err) {
    console.error('Error inserting data: ', err.message, err.stack);
    res.status(500).json({ error: 'An error occurred while adding the product.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
