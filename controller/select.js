const getProductList = async (client, req, res) => {
    let data = [];
    try {
        data = await queryDatabaseForProducts(client, data);
    } catch(e) {
        console.error(e.stack);
        return res.status(400).json("error");
    }
    res.status(200).json(data);
}

const queryDatabaseForProducts = async (client, data) => {
    const res = await client.query("SELECT * FROM products;");
    for(row of res.rows) {
        let obj =   {
                        'id': row.id,
                        'title': row.title,
                        'description': row.description,
                        'price': row.price,
                        'imgUrl': `${row.imgurl}`,
        };
        data.push(obj);
    }
    return data;
}

module.exports = {
    getProductList: getProductList,
    queryDatabaseForProducts: queryDatabaseForProducts,
}