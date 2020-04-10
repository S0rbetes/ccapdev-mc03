const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
        // This is to load the page initially
        db.findMany(User, {}, {}, (result) => {
            res.render('home', {contacts: result});
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        let number = req.query.number

        db.findOne(User, {number: number}, {}, (result) => {
            res.send(result)
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        // your code here
        let contact = req.query
        db.insertOne(User, contact, (success) => {
            if (success) {
                res.render('partials/card', { name: contact.name, number: contact.number })
            }
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        let contact = req.query
        db.deleteOne(User, contact, (success) => {
            if (success) {
                res.status(204).send();
            }
        })
    }

}

module.exports = controller;
