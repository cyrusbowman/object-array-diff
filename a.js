var _ = require('lodash');


function doit(changed, original, dest, path) {
    _.mapValues(changed, function(value, key) {
        var newPath = key;
        if (path != null) {
            newPath = path + '.' + key;
        }
        if (_.isObject(value)) {
            return doit(value, original, dest, newPath);
        } else {
            if (_.isEqual(value, _.get(original, newPath)) == false) {
                _.set(dest, newPath, value);
            }
        }
    });
};
function removeNulls(object) {
    _.mapValues(object, function(value, key) {
        if (_.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                if (value[i] == null) {         
                  value.splice(i, 1);
                  i--;
                }
            }
        } else if (_.isObject(value)) {
            return removeNulls(value);
        }
    });
};
function changes(changed, original, dest) {
    /*
        Does not show keys in the dest that were
        in the 'original' but are missing (undefined)
        in the 'changed'
    */
    doit(changed, original, dest);
    removeNulls(dest);
};

var a = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        contacts: [
        	{
        		id: 0,
        		name: 'cyrus',
        		email: 'cyrusbow@gmail.com',
                deleted: 0
        	}
        ]
    }
};

var b = {
    name: 'my object',
    description: 'it\'s an object!',
    details: {
        contacts: [
            {
                id: 0,
                name: 'cyrus',
                email: 'cyrusbow@gmail.com',
                deleted: null,
                it: 'a'
            },
            {
                id: 1,
                name: 'cyrus',
                email: 'cyrusbow@gmail.com'
            }
        ]
    }
};

var obj = {};
changes(b, a, obj);
console.log(JSON.stringify(obj));


