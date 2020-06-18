/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    // action - create
    create: async function (req, res) {

        if (req.method == "GET")
            return res.view('Apartment/Create');

        if (!req.body) {
            if (req.wantsJSON) {
                return res.json({ message: "Form-data not received.", url: "/Apartment/Create" });
            } else {
                return res.badRequest();
            }
        } else {
            await Apartment.create(req.body);
            if (req.wantsJSON) {
                return res.json({ message: "Successfully created!", url: "/" });
            } else { return res.ok("Successfully created!"); }
        }
    },

    json: async function (req, res) {
        var Apartments = await Apartment.find();
        return res.json(Apartments);
    },

    admin: async function (req, res) {
        var models = await Apartment.find();
        return res.view('Apartment/Admin', { Apartment: models });
    },

    delete: async function (req, res) {
        if (req.method == "GET")
            return res.forbidden();
        var models = await Apartment.destroy(req.params.id).fetch();

        if (models.length == 0) {
            if (req.wantsJSON) {
                return res.json({ message: "Not found.", url: '/' });    // for ajax request
            } else {
                return res.redirect('/');           // for normal request
            }
        } else {

            if (req.wantsJSON) {
                return res.json({ message: "Apartment deleted.", url: '/' });    // for ajax request
            } else {
                return res.redirect('/');           // for normal request
            }
        }
    },

    update: async function (req, res) {

        if (req.method == "GET") {

            var model = await Apartment.findOne(req.params.id);

            if (!model) return res.notFound();

            return res.view('Apartment/update', { Apartment: model });

        } else {

            if (!req.body.Apartment)
                return res.badRequest("Form-data not received.");

            var models = await Apartment.update(req.params.id).set({
                Property_Title: req.body.Apartment.Property_Title,
                Image_URL: req.body.Apartment.Image_URL,
                Estate: req.body.Apartment.Estate,
                Bedrooms: req.body.Apartment.Bedrooms,
                Gross_Area: req.body.Apartment.Gross_Area,
                Expected_Tenants: req.body.Apartment.Expected_Tenants,
                Rent: req.body.Apartment.Rent,
                Highlighted_Property: req.body.Apartment.Highlighted_Property,
                UpdatedDate: req.body.Apartment.UpdatedDate,
                CreatedDate: req.body.Apartment.CreatedDate,

            }).fetch();

            if (models.length == 0) return res.notFound();

            if (req.wantsJSON) {
                return res.json({ message: "Apartment has been updated." });
            } else {
                return res.ok("Record updated");
            };

        }
    },

    search: async function (req, res) {



        const qEstate = req.query.Estate || "";
        const qBedrooms = parseInt(req.query.Bedrooms);
        const qMinGross_Area = parseInt(req.query.MinGross_Area) || 0;
        const qMaxGross_Area = parseInt(req.query.MaxGross_Area) || 2000;
        const qMinRent = parseInt(req.query.MinRent) || 0;
        const qMaxRent = parseInt(req.query.MaxRent) || 30000;

        const qPage = Math.max(req.query.page - 1, 0) || 0;
        const numOfItemsPerPage = 2;

        if (req.wantsJSON) {
            var search = { Estate: { contains: qEstate }, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } };


            if (isNaN(qBedrooms)) {

                var models = await Apartment.find({
                    where: search,

                });//.where({ Estate: { contains: qEstate }, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } });
                var numOfPage = Math.ceil(await Apartment.count({ where: search }) / numOfItemsPerPage);

            } else {
                search.Bedrooms = qBedrooms;
                var models = await Apartment.find({
                    where: search,

                });//.where({ Estate: { contains: qEstate }, Bedrooms: qBedrooms, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } });



                var numOfPage = Math.ceil(await Apartment.count({ where: search }) / numOfItemsPerPage);



            }
            if (models.length == 0) {
                if (req.wantsJSON) {
                    return res.json({ message: "Apartment not be found.", url: '/Apartment/Search/?' });    // for ajax request
                } else {
                    return res.status(401).send("Apartment not found");           // for normal request
                }
            };
            return res.json(models);    // for ajax request
        } else {
            var search = { Estate: { contains: qEstate }, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } };


            if (isNaN(qBedrooms)) {

                var models = await Apartment.find({
                    where: search,
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage

                });//.where({ Estate: { contains: qEstate }, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } });
                var numOfPage = Math.ceil(await Apartment.count({ where: search }) / numOfItemsPerPage);

            } else {
                search.Bedrooms = qBedrooms;
                var models = await Apartment.find({
                    where: search,
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage

                });//.where({ Estate: { contains: qEstate }, Bedrooms: qBedrooms, Gross_Area: { ">=": qMinGross_Area }, Gross_Area: { "<=": qMaxGross_Area }, Rent: { ">=": qMinRent }, Rent: { "<=": qMaxRent } });



                var numOfPage = Math.ceil(await Apartment.count({ where: search }) / numOfItemsPerPage);



            }
            if (models.length == 0) {
                if (req.wantsJSON) {
                    return res.json({ message: "Apartment not be found.", url: '/Apartment/Search/?' });    // for ajax request
                } else {
                    return res.status(401).send("Apartment not found");           // for normal request
                }
            };
            return res.view('Apartment/Search', { Apartment: models, count: numOfPage, });           // for normal request
        }


    },

    detail: async function (req, res) {
        const qid = req.params.id;

        var model = await Apartment.find({ where: { id: qid } });

        if (model.length == 0) return res.view('Apartment/Error');

        return res.view('Apartment/detail', { Apartment: model });
    },

    //HomePage{
    home: async function (req, res) {

        const qHighlighted_Property = "checked";
        const numOfItemsPerPage = 4

        var search = { Highlighted_Property: qHighlighted_Property };



        var models = await Apartment.find({
            where: search,
            limit: numOfItemsPerPage,
            sort: 'createdAt DESC'
            //skip: numOfItemsPerPage * qPage
        });
        sails.log("home searching finished");
        if (req.wantsJSON) {
            return res.json(models);
        } else {
            return res.view('Apartment/Home', { Apartment: models, });
        }


    },

    populate: async function (req, res) {

        var model = await Apartment.findOne(req.params.id).populate("rentedBy");

        if (!model) return res.notFound();

        var num = model.rentedBy.length;
        sails.log(num);
        if (req.wantsJSON) {
            return res.json({ message: num })
        } else {
            return res.json(num);
        }

    },


};






