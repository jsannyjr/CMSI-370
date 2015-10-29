var giphy = require('giphy-api')();
giphy.random({
    tag: 'superman',
    rating: 'g',
    fmt: 'json'
}, function(err, res) {

});
   