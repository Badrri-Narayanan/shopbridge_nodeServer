const select = require('./select');

const insertProduct = async (client, req, res) => {
    const {title, description, price, imgurl} = req.body;
    if(!title || !description || !price || !imgurl) {
        return res.status(400).json('invalid_details');
    }
    let data = [];
    try {
        data = await select.queryDatabaseForProducts(client, data);
    } catch(e) {
        console.error(e.stack);
    }
    for(obj of data) {
        if(obj.title == title) {
            return res.status(400).json("Already_present");
        }
    }
    try {
        const res = await client
        .query(`INSERT INTO products (title, description, price, imgurl)
             VALUES ('${title}', '${description}', ${price}, '${imgurl}' );`
        );
    } catch(e) {
        console.error(e.stack);
        return res.status(400).json("error");
    }

    res.status(200).json("added");
}

module.exports = {
    insertProduct: insertProduct,
}