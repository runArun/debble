// only run this file when development or at the beginning.

var Medicine = require('../models/medicine');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');


var medicines = [
    new Medicine({
        imagePath: '/images/mediImg/1.jpg',
        title: 'Gothic Video Game',
        description: 'pretty effective !!',
        price: 10
    }),
    new Medicine({
        imagePath: '/images/mediImg/2.jpeg',
        title: 'Warcraft Video Game',
        description: 'awesome  medicine !!',
        price: 20
    }),
    new Medicine({
        imagePath: '/images/mediImg/3.jpeg',
        title: 'Call of duty Video Game',
        description: 'one people  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/4.jpeg',
        title: 'mariao',
        description: 'team  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/5.jpeg',
        title: 'hun dou luo',
        description: 'very interesting game !!',
        price: 30
    }),
    new Medicine({
        imagePath: '/images/mediImg/6.jpeg',
        title: 'mariao',
        description: 'team  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/7.jpeg',
        title: 'mariao',
        description: 'team  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/8.jpeg',
        title: 'mariao',
        description: 'team  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: '/images/mediImg/9.jpeg',
        title: 'mariao',
        description: 'team  game !!',
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
