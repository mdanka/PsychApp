/**
 * Created by mdanka on 30/12/2016.
 */

var promise = require('bluebird');
var json2csv = require('json2csv');
var config = require('./config');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = config.databaseConnection;
var db = pgp(connectionString);

function getAllMeditationEntries(req, res, next) {
    db.any('select * from meditation')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL meditation entries'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSingleMeditationEntry(req, res, next) {
    var rowId = parseInt(req.params.id);
    db.one('select * from meditation where id = $1', rowId)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ONE meditation entry'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createMeditationEntry(req, res, next) {
    db.none('insert into meditation(nickname, answer, date)' +
        'values(${nickname}, ${answer}, ${date})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one meditation entry'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function exportAllMeditationEntries(req, res, next) {
    db.any('select * from meditation')
        .then(function (data) {
            var fields = ['id', 'nickname', 'answer', 'date'];
            console.log(fields)
            console.log(data)
            var csv = json2csv({ data: data, fields: fields });
            console.log(csv)
            res.status(200)
                .set('Content-Type', 'application/octet-stream')
                .send(csv);
            // res.status(200)
            //     .json({
            //         status: 'success',
            //         data: data,
            //         message: 'Retrieved ALL meditation entries'
            //     });
        })
        .catch(function (err) {
            return next(err);
        });

}




module.exports = {
    getAllMeditationEntries: getAllMeditationEntries,
    getSingleMeditationEntry: getSingleMeditationEntry,
    createMeditationEntry: createMeditationEntry,
    exportAllMeditationEntries: exportAllMeditationEntries,
};