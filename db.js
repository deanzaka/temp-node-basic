const Sequelize = require('sequelize');
const sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/test-db.sqlite'
});

db = {};

db.data = sequelize.define('data', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync({

}).then(function(){
    console.log("Everything synced");
});

module.exports = db;