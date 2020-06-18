/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  ApartmentController: {

    create: 'isAdmin',
    update: 'isAdmin',
    delete: 'isAdmin',
    admin: 'isAdmin',
    populate: 'isAdmin',
  },
  UserController: {

    remove: 'isClients',
    populate: 'isClients',
    add: 'isClients',
  }

};
