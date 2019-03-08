const mongoose = require('bluebird').promisifyAll(require('mongoose'));

(async () => {
    await mongoose.connect('mongodb://103.214.233.141:2701/tdb', {
        useNewUrlParser: true
    });
})().catch(err => {
    console.error(err);
});

module.exports = mongoose;