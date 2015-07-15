var diff = require('./');
var _ = require('lodash');

var original, changed;

//Example 1: Object
console.log('------------ Example 1 --------------')

var original = {
    bacon: true,
    howMuch: 54,
    flavor: 'tastey'
};
var changed = {
    bacon: false,      //changed
    howMuch: 10,       //changed
    flavor: 'tastey',
    ham: true          //added
};

//Log results
console.log(JSON.stringify(diff(original, changed), null, 4));


//EXAMPLE 2: Array of objects
console.log('------------ Example 2 --------------')
//Set identifier to always return so we can tell what objects changed
//in ordered array without returning full array
diff({alwaysReturn: ['id']}); 

original = [
	{
		id: 0,
		name: 'cyrus'
	},
	{
		id: 1,
		name: 'andrew'
	}
];
var changed = [
    {
        id: 0,
        name: 'cyrus'
    },
    {
        id: 1,
        name: 'randy'        //changed key
    },
    {                        //added object
        name: 'alex'
    }
];
console.log(JSON.stringify(diff(original, changed), null, 4));

//EXAMPLE 3: Objects containing arrays of objects
console.log('------------ Example 3 --------------')
original = {
    name: 'my object',
    description: 'oh me oh my',
    details: {
        contacts: [
            {
                id: 0,
                name: 'cyrus',
                email: 'cyrus@example.com',
                deleted: null
            },
            {
                id: 1,
                name: 'alex',
                email: 'alex@example.com'
            }
        ]
    }
};
changed = {
    name: 'New name',                         //changed key
    description: 'oh me oh my',
    newKey: 'added a key',                    //added key
    details: {
        contacts: [
            {
                id: 0,
                name: 'cyrus',
                email: 'cyrus@example.com',
                deleted: 0                       //changed key
            },
            {
                id: 1,
                name: 'alex',
                email: 'alex@example.com'
            },
            {                                 //added object
                name: 'andrew',
                email: 'andrew@example.com'
            }
        ]
    }
};

//Log results
console.log(JSON.stringify(diff(original, changed), null, 4));