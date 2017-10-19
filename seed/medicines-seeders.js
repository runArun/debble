// only run this file when development or at the beginning.

var Medicine = require('../models/medicine');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');


var medicines = [
    new Medicine({
        imagePath: 'https://static.giantbomb.com/uploads/scale_small/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
        title: 'Gothic Video Game',
        description: 'pretty effective !!',
        price: 10
    }),
    new Medicine({
        imagePath: 'https://bnetproduct-a.akamaihd.net//dg/7364/751D461631E9293C9460EC52BE3A3736C9B89E61.jpg',
        title: 'Warcraft Video Game',
        description: 'awesome  medicine !!',
        price: 20
    }),
    new Medicine({
        imagePath: 'https://resource.supercheats.com/library/2016/1478244285codinfinitewarfare.png',
        title: 'Call of duty Video Game',
        description: 'one people  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: 'https://contrabvs.files.wordpress.com/2013/01/newcont2t.png?w=450&h=336',
        title: 'mariao',
        description: 'team  game !!',
        price: 40
    }),
    new Medicine({
        imagePath: 'http://i.3155.com/dongzuo/b52884.jpg',
        title: 'hun dou luo',
        description: 'very interesting game !!',
        price: 30
    })

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
