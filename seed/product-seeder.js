const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shop',{ useNewUrlParser: true });


const products = [
    new Product({
        imagePath: 'https://a248.e.akamai.net/f/248/9086/10h/wolverine-o.scene7.com/is/image/WolverineWorldWide/CAT-W73239_89703-05y.psd?wid=790&hei=657&fmt=jpeg&qlt=80&op_sharpen=0&resMode=sharp&op_usm=0.5,1.0,1.0&iccEmbed=0&printRes=72',
        title: 'Caterpiller',
        description: 'The Best shoes in the world, That is CAT Footwear!',
        price: 160
    }),
    new Product({
        imagePath: 'https://s7d2.scene7.com/is/image/academy/10648086?wid=410&hei=410',
        title: 'CAT',
        description: 'The Best shoes in the world, That is CAT Footwear!',
        price: 120
    }),
    new Product({
        imagePath: 'https://www.catworkwear.com.au/media/catalog/product/c/a/catm-p720055-1.jpg',
        title: 'CATerpiller',
        description: 'The Best shoes in the world, That is CAT Footwear!',
        price: 100
    }),
    new Product({
        imagePath: 'https://www.symbios.pk/image/cache/data/c/cat%20shoes%20heavy%20duty%20symbios%20pk4_1453657397-500x500.JPG',
        title: 'Caterpiller',
        description: 'The Best shoes in the world, That is CAT Footwear!',
        price: 125
    }),
    new Product({
        imagePath: 'https://ae01.alicdn.com/kf/HTB1YqPJfwLD8KJjSszeq6yGRpXao/CAT-Footwear-Men-Classic-Genuine-Cow-Leather-Working-Casual-Safety-Shoes-For-Male-Ankle-Winter-Boots.jpg_640x640.jpg',
        title: 'Caterpiller',
        description: 'The Best shoes in the world, That is CAT Footwear!',
        price: 130
    }),
    new Product({
        imagePath: 'https://www.symbios.pk/image/cache/data/c/cat%20shoes%20heavy%20duty%20symbios%20pk4_1453657397-500x500.JPG',
        title: 'Caterpiller',
        description: 'The Best shoes in the world, That is CAT Footwear!',
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