const select = require('./select');

const updateProduct = async (client, req, res) => {
    let new_title = req.body.new_title;
    let description = req.body.description;
    let price = req.body.price;
    let imgurl = req.body.imgurl;
    if(!req.body.title) {
        return res.status(400).json('Invalid_details');
    }
    let data = [];
    try {
        data = await select.queryDatabaseForProducts(client, data);
    } catch(e) {
        console.error(e.stack);
        return res.status(400).json("error");
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
                return res.status(400).json("error");
            }       
        }
    }
    if(flag) {
        res.status(200).json("ok");
    } else {
        res.status(400).json("failed");
    }
}

module.exports = {
    updateProduct: updateProduct,
}