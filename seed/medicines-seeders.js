// only run this file when development or at the beginning.

var Medicine = require('../models/medicine');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');


var medicines = [
    new Medicine({
        imagePath: '/images/mediImg/1.jpeg',
        title: 'Hair Skin Nails',
        description: '15% Off',
        price: 10
    }),
    new Medicine({
        imagePath: '/images/mediImg/2.jpeg',
        title: 'Lecithin',
        description: '15% Off',
        price: 20
    }),
    new Medicine({
        imagePath: '/images/mediImg/3.jpeg',
        title: 'Liver Detox',
        description: '40% Off',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/4.jpeg',
        title: 'Co Q10',
        description: '30% Off',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/5.jpeg',
        title: 'Womens Ultivite',
        description: '20% Off',
        price: 30
    }),
    new Medicine({
        imagePath: '/images/mediImg/6.jpeg',
        title: 'Evening Primrose Oil + Vitamin B6',
        description: '30% Off',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/7.jpeg',
        title: 'MACU-Vison',
        description: '30% Off',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/8.jpeg',
        title: 'Fish Oil',
        description: '10% Off' ,
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/9.jpeg',
        title: 'Prostate',
        description: '25% Off',
        price: 40
    }),

];

var done = 0;
for (var i = 0; i < medicines.length; i++){
    medicines[i].save(function (err, result) {
        done++;
        if(done === medicines.length){
            exit();
            //for all items can be saved
        }
    });
}
function exit() {
    mongoose.disconnect();
}
