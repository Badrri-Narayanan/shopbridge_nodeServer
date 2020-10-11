const select = require('./select');

const updateProduct = async (client, req, res) => {
    let new_title = req.body.new_title;
    let description = req.body.description;
    let price = req.body.price;
    let imgurl = req.body.imgurl;
    if(!req.body.title) {
        return res.status(400).send('Invalid details');
    }
    let data = [];
    try {
        data = await select.queryDatabaseForProducts(client, data);
    } catch(e) {
        console.error(e.stack);
    }

    let flag = false;
    for(obj of data) {
        if(obj.title == req.body.title) {
            flag = true;
            if(!new_title) {
                new_title = obj.title;
            }
            if(!description) {
                description=obj.description;
            }
            if(!price) {
                price= obj.price;
            }
            if(!imgurl) {
                imgurl=obj.imgUrl;
            }
            try {
                const res = await client
                .query(`UPDATE products set 
                    title = '${new_title}',
                    description = '${description}',
                    price = '${price}',
                    imgurl = '${imgurl}'
                    where title = '${req.body.title}';
                `);
            } catch(e) {
                console.error(e.stack);
            }       
        }
    }
    if(flag) {
        res.status(200).send("ok");
    } else {
        res.status(400).send("product_not_found");
    }
}

module.exports = {
    updateProduct: updateProduct,
}