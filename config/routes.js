/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // '/': { view: 'pages/homepage' },
  '/': 'ApartmentController.home',

  'DELETE /Apartment/:id': 'ApartmentController.delete',
  'GET /Apartment/Update/:id': 'ApartmentController.update',
  'POST /Apartment/Update/:id': 'ApartmentController.update',
  'GET /Apartment/Search/?': 'ApartmentController.search',
  'GET /Apartment/Detail/:id': 'ApartmentController.detail',
  'GET /Apartment/Home/': 'ApartmentController.home',
  'GET /User/Login': 'UserController.login',
  'POST /User/Login': 'UserController.login',
  'POST /User/Logout': 'UserController.logout',

  'GET /Apartment/:id/rentedBy': 'ApartmentController.populate',
  'GET /user/:id/rents': 'UserController.populate',
  'GET /user/:id/rents/add/:fk': 'UserController.add',
  'GET /user/:id/rents/remove/:fk': 'UserController.remove',

  'POST /file/upload/attachment': 'FileController.uploadAttachment'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
