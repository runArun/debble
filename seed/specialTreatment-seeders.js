// only run this file when development or at the beginning.

var Medicine = require('../models/medicine');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');


var medicines = [
    new Medicine({
        imagePath: '/images/specialT/1.jpeg',
        title: 'Scraping',
        description: 'From China',
        price: 100
    }),
    new Medicine({
        imagePath: '/images/specialT/2.jpeg',
        title: 'Acupuncture and moxibustion',
        description: 'From China',
        price: 200
    }),
    new Medicine({
        imagePath: '/images/specialT/3.jpeg',
        title: 'Cupping',
        description: 'From China',
        price: 80
    })
]


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
