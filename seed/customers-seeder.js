var User = require('../models/users');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/health_assistant');

var users = [

    new User({
        email: 'saxvsdfasjk@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Sometimes, I will feel the stomach pain, I do not know what the reason'

    }),

    new User({
        email: 'sasfa@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Every time I play basketball, the knee will hurt, I do not know how to treat'

    }),

    new User({
        email: 'sasfa@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Every time I play basketball, the knee will hurt, I do not know how to treat'

    }),

    new User({
        email: 'sasfa@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Every time I play basketball, the knee will hurt, I do not know how to treat'

    }),

    new User({
        email: 'sasfa@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Every time I play basketball, the knee will hurt, I do not know how to treat'

    }),

    new User({
        email: 'sarqwqdk@gmail.com',
        password: 1213,
        role: 'customer',
        firstname: 'Nelson',
        lastname: 'Tom',
        phone: 450490834,
        age: 25,
        gender: 'Male',
        country: 'India',
        city: 'menmy',
        online: true,
        imagePath: '/images/doctors/1.jpeg',
        phs:'Every summer when the rain, I always feel the body is weak, I would like to ask what medicine?'

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