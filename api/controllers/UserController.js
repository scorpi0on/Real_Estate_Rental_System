/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    json: async function (req, res) {
        var Users = await User.find();
        return res.json(Users);
    },

    login: async function (req, res) {

        sails.log("recieved");

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) {

            if (req.wantsJSON) {
                return res.json({ message: "missing value", url: 'Login' });    // for ajax request
            } else {
                return res.badRequest();           // for normal request
            }

        };

        var user = await User.findOne({ username: req.body.username });

        if (!user) {

            if (req.wantsJSON) {
                return res.json({ message: "User not found.", url: 'Login' });    // for ajax request
            } else {
                return res.status(401).send("User not found");           // for normal request
            }

        };


        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) {

            if (req.wantsJSON) {
                return res.json({ message: "Wrong Password.", url: 'Login' });    // for ajax request
            } else {
                return res.status(401).send("Wrong Password");           // for normal request
            }

        };

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;

            res.cookie('id', user.id);
            sails.log("[Session] ", req.session);


            if (req.wantsJSON) {
                return res.json({ message: "Login successfully.", url: '/Apartment/Home', isLoggingIn: false });    // for ajax request
            } else {
                return res.ok("Login successfully.");           // for normal request
            }



        });

    },

    logout: async function (req, res) {

        res.clearCookie("id");

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            if (req.wantsJSON) {
                return res.json({ message: "Logout successfully.", url: '/Apartment/Home', isLoggingIn: true });    // for ajax request
            } else {
                return res.ok("Logout successfully.");           // for normal request
            }

        });
    },

    populate: async function (req, res) {

        var model = await User.findOne(req.params.id).populate("rents");

        if (!model) return res.notFound();

        var jsonModels = JSON.stringify(model)

        var jsonStr = jsonModels.substring(jsonModels.indexOf("["), jsonModels.lastIndexOf("]") + 1);

        var models = JSON.parse(jsonStr);

        if (req.wantsJSON) {
            return res.json( models );    // for ajax request
        } else {
            return res.view('Apartment/My_Rentals', { Apartment: models, })
        }

    },

    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatApartment = await Apartment.findOne(req.params.fk).populate("rentedBy", { id: req.params.id });

        if (!thatApartment) return res.notFound();

        if (!thatApartment.rentedBy.length)
            return res.status(409).send("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.params.id, "rents").members(req.params.fk);

        if (req.wantsJSON) {
            return res.json({ message: "Operation completed." });    // for ajax request
        } else {
            return res.ok('Operation completed.');           // for normal request
        }

    },

    add: async function (req, res) {

        sails.log(req.params.id, req.params.fk);

        if (!await User.findOne(req.params.id)) return res.notFound();

        const thatApartment = await Apartment.findOne(req.params.fk).populate("rentedBy", {
            id: req.params.id
        });

        const num = thatApartment.rentedBy.length;
        const total = thatApartment.Expected_Tenants;

        if (!thatApartment) return res.notFound();

        if (thatApartment.rentedBy.length)
            return res.status(409).send("Already added.");   // conflict
        if (num < total) {
            await User.addToCollection(req.params.id, "rents").members(req.params.fk);

            if (req.wantsJSON) {
                return res.json({ message: "Operation completed." });    // for ajax request
            } else {
                return res.ok('Operation completed.');           // for normal request
            }
        } else {
            if (req.wantsJSON) {
                return res.json({ message: "Full." });    // for ajax request
            } else {
                return res.forbidden('Full.');           // for normal request
            }

        }
    }


};

