const express = require('express');
const app = express();
const cors = require('cors');
const pg = require('pg');
const select = require('./controller/select');
const insert = require('./controller/insert');
const update = require('./controller/update');
 
app.use(cors());
app.use(express.json());

let data = [];

const client = new pg.Client({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

app.get('/', (req, res) => select.getProductList(client, req, res));

app.post('/', (req, res) => insert.insertProduct(client, req, res));

app.put('/', (req, res) => update.updateProduct(client, req, res));

 
app.listen(process.env.PORT, () => {
    console.log("Server is online and running at port " + process.env.PORT)
});