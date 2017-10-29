var User = require('../models/users');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');

var users = [

    new User({
        email:   'sadsajk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 45,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg'

    }),
    new User({
        email:   'saqeqwsajk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'Max',
        lastname: 'Henson',
        phone: 450490834,
        age: 35,
        gender: 'Male',
        country: 'Australia',
        city: 'sydney',
        online: true,
        imagePath: '/images/doctors/2.jpeg'
    }),
    new User({
        email:   'saqrqajk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'Alex',
        lastname: 'Smith',
        phone: 450490834,
        age: 42,
        gender: 'Male',
        country: 'Australia',
        city: 'melbourne',
        online: true,
        imagePath: '/images/doctors/3.jpeg'

    }),
    new User({
        email:   'sabvcjk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'Kay',
        lastname: 'Henry',
        phone: 450490834,
        age: 49,
        gender: 'Male',
        country: 'Australia',
        city: 'sydney',
        online: true,
        imagePath: '/images/doctors/4.jpeg'

    }),
    new User({
        email:   'satewuyjk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'Nen',
        lastname: 'Tomson',
        phone: 450490834,
        age: 65,
        gender: 'Male',
        country: 'Australia',
        city: 'sydney',
        online: true,
        imagePath: '/images/doctors/5.jpeg'

    }),
    new User({
        email:   'sayrtoyk@gmail.com',
        password: 1213,
        role :    'doctor',
        firstname: 'conley',
        lastname: 'Song',
        phone: 450490834,
        age: 45,
        gender: 'Male',
        country: 'China',
        city: 'Shanghai',
        online: true,
        imagePath: '/images/doctors/6.jpeg'

    })
];

var done = 0;
for (var i = 0; i < users.length; i++){
    users[i].save(function (err, result) {
        done++;
        if(done === users.length){
            exit();
            //for all users can be saved
        }
    });
}
function exit() {
    mongoose.disconnect();
}