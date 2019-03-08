const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true });


const products = [
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/P720683_New_Angle?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'PREZ WATERPROOF SHOE',
        description: 'Waterproof leather upper and Antimicrobial microfiber lining ',
        price: 70
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CATM-P723054-110717-F18-000?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'DATA SHOE',
        description: 'Cement Construction for added durability ',
        price: 70
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CATM-P722227-011618-F18-000?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'TRANSFORM 2.0 BOOT',
        description: 'Waterproof leather upper and Antimicrobial microfiber lining ',
        price: 90
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/P717819_1?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'FOUNDER BOOT',
        description: ' Nylon Mesh Lining and Nylex TM Sock Liner',
        price: 115
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CATM-P721593-092016-F17-000?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'FOUNDER WATERPROOF BOOT',
        description: 'Waterproof nubuck upper lining and Soft, breathable nylon mesh lining',
        price: 120
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CATM-P721722-092016-F17-000?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'DEPLETE WATERPROOF BOOT',
        description: 'Waterproof leather upper and Antimicrobial microfiber lining ',
        price: 110
    }),
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CATM-P721724-092016-F17-000?wid=186&hei=160&fmt=jpg&bgc=ffffff&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72&align=0,1',
        title: 'DEPLETE WATERPROOF BOOT DARK',
        description: 'Durable and lightweight EVA midsole and Antimicrobial microfiber lining ',
        price: 110
    })
];

let done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}