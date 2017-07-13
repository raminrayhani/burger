/* ORM - functions that take inputs and conditions and turn them into database commands like SQL */
var connection = require('../config/connection.js');

function objToSql(ob) {
	// column1=value, column2=value2,...
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			return key + '=' + ob[key];
		}
	}
}

var orm = {
	selectAll: function (tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// val is an array of values to save to cols
		// cols are the columns to insert the values
	insertOne: function (table, col, val, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += col;
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += '?';
		queryString += ') ';

		connection.query(queryString, val, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	},
		// objColVals are the columns and values to update
	updateOne: function (table, objColVal, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVal);
		queryString += ' WHERE ';
		queryString += condition;
		
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};

module.exports = orm;