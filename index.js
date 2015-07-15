var _ = require('lodash');
var objectAssign = require('object-assign');

function findChanges(changed, original, dest, path) {
    _.mapValues(changed, function(value, key) {
        var newPath = key;
        if (path != null) {
            newPath = path + '.' + key;
        }
        if (_.isObject(value) && _.isEqual(value, _.get(original, newPath)) == false) {
            return findChanges(value, original, dest, newPath);
        } else {
            if(_.includes(opts.alwaysReturn, key)) {
                //Always include id's
                _.set(dest, newPath, value);
            } else if (_.isEqual(value, _.get(original, newPath)) == false) {
                _.set(dest, newPath, value);
            }
        }
    });
};
function removeNulls(object) {
    if(_.isArray(object)) {
        for (var i = 0; i < object.length; i++) {
            if (object[i] == null) {         
              object.splice(i, 1);
              i--;
            }
        }
    } else {
        _.map(object, function(value, key) {
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
    }
};
var changes = function(optsOrOriginal, changed) {
    if (_.isUndefined(changed)) {
        //Options
        opts = objectAssign(opts, optsOrOriginal);
        return;
    }
    /*
        Does not show keys in the dest that were
        in the 'original' but are missing (undefined)
        in the 'changed'
    */
    var original = optsOrOriginal;
    if(_.isEqual(original, changed)) {
        return {};
    }
    var dest = {};
    if(_.isArray(original)) {
        dest = [];
    }
    findChanges(changed, original, dest);
    removeNulls(dest);
    return dest;
};
var opts = {
    alwaysReturn: [] //Always return these in objects
};
module.exports = changes;


