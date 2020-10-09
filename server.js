const express = require('express');
const app = express();
const cors = require('cors');
const pg = require('pg');
 
app.use(cors());
app.use(express.json());

let data = [];

app.get('/',  async (req, res) => {
    const client = new pg.Client({
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    })
    client.connect();
    try {
        data = [];
        const res = await client.query("SELECT * FROM products;");
        for(row of res.rows) {
            let obj =   {
                            'id': row.id,
                            'title': row.id,
                            'description': row.id,
                            'price': row.price,
                            'imgUrl': row.imgUrl,
            };
            menu.push(obj);
        }
    } catch(e) {
        console.error(e.stack);
    }
    await client.end();
    res.status(200).json(data);
});
 
app.listen(process.env.PORT, () => {
    console.log("Server is online and running at port " + process.env.PORT)
});