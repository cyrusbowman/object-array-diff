# object-array-diff

Get the diff of objectA and objectB. If your object is an array of objects or contains an array of objects only the changed objects in the array are returned. (See example [2](.#example-2---array-of-objects) and [3](.#example-3---objects-containing-arrays-of-objects))

## Usage

### Example 1 - Object:
```js
var diff = require('object-array-diff');

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

diff(original, changed);
/*
{
	bacon: false,
	howMuch: 10,
	ham: true
}
*/

```
### Example 2 - Array of Objects
```js
var diff = require('object-array-diff');

var original = [
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

diff(original, changed);
/*
    {
        "name": "randy"
    },
    {
        "name": "alex"
    }
*/
```
Configure object-array-diff to always return `id` in order to tell what items changed in the ordered array without returning full array.
	 
```js
diff({alwaysReturn: ['id']}); 
diff(original, changed);
/*
    {
        id: 1,
        name: "randy"
    },
    {
        name: "alex"
    }
*/

```
### Example 3 - Objects containing arrays of objects
```js
var diff = require('object-array-diff');

diff({alwaysReturn: ['id']});

var original = {
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
var changed = {
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

diff(original, changed);
/*
{
    name: "New name",
    newKey: "added a key",
    details: {
        contacts: [
            {
                "id": 0,
                "deleted": 0
            },
            {
                "name": "andrew",
                "email": "andrew@example.com"
            }
        ]
    }
}
*/
```

## License

[MIT](http://opensource.org/licenses/MIT)
