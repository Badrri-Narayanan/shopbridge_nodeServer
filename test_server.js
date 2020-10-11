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
    user: 'postgres',
    host: 'localhost',
    database: 'shop_bridge_store',
    password: 'password123',
    port: 5432,
})

client.connect();

app.get('/', (req, res) => select.getProductList(client, req, res));

app.post('/', (req, res) => insert.insertProduct(client, req, res));

app.put('/', (req, res) => update.updateProduct(client, req, res));

app.listen(5000, () => {
    console.log("Server is online and running at port " + 5000)
});