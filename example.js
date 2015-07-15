var diff = require('./');
var _ = require('lodash');

var original, changed;

//Example 1: Object
console.log('------------ Example 1 --------------')
original = {
    bacon: true,
    howMuch: 54,
    flavor: 'tastey'
};
 
changed = _.cloneDeep(original);

//Make some changes
changed.bacon = false;
changed.ham = true;
changed.howMuch = 10;
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
changed = _.cloneDeep(original);

//Make some changes
changed.push({
	id: 3,
	name: 'alex'
});
changed[0].name = 'cyrus bowman';
//Log results
console.log(JSON.stringify(diff(original, changed), null, 4));

//EXAMPLE 3: Objects containing arrays of objects
console.log('------------ Example 3 --------------')
original = {
    name: 'my object',
    description: 'it\'s an object!',
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
changed = _.cloneDeep(original);

//Make some changes
changed.name = 'New name';
changed.newKey = 'Added this key:value';
changed.details.contacts.push({
	name: 'Added this contact',
	email: 'andrew@example.com'
});
changed.details.contacts[0].deleted = 0;

//Log results
console.log(JSON.stringify(diff(original, changed), null, 4));