var diff = require('deep-diff').diff;
var observableDiff = require('deep-diff').observableDiff;
var applyChange        = require('deep-diff').applyChange;
var _ = require('lodash');

var lhs = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        contacts: {
        	0: {
        		id: 0,
        		name: 'cyrus',
        		email: 'cyrusbow@gmail.com'
        	}
        }
    }
};
 
var rhs = {
    name: 'updated object',
    description: 'it\'s an object!',
    details: {
        contacts: {
        	0: {
        		id: 0,
        		name: 'cyrus',
        		email: 'cyrusbow@gmail.com'
        	},
        	1: {
        		id: 1,
        		name: 'andrew',
        		email: 'andrew@gmail.com'
        	},
        	2: {
        		id: 2,
        		name: 'alexa',
        		email: 'alex@gmail.com'
        	}
        }
    }
};
 
var differences = diff(lhs, rhs);

var it = {};
observableDiff(lhs, rhs, function (d) {
    // Apply all changes except those to the 'name' property... 
    applyChange(it, rhs, d);
});

console.log(JSON.stringify(it));