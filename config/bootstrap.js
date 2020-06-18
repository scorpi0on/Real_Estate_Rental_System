/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  //encryp
  sails.bcrypt = require('bcryptjs');
  const saltRounds = 10;

  //add defualt apartments if no record
  if (await Apartment.count() > 0) {
    return generateUsers();
  }


  await Apartment.createEach([
    { Property_Title: "Default 1", Image_URL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574967419595&di=2609b26fc20efc76bb6ead80e027a221&imgtype=0&src=http%3A%2F%2Fpic.ossfiles.cn%3A9186%2Fgroup2%2FM00%2F4F%2FB5%2FrBgICV2JknOAQZoAAAGFmiYshgU467.jpg", Estate: "Festival City", Bedrooms: 1, Gross_Area: 100, Expected_Tenants: 1, Rent: 1000, Highlighted_Property: "checked", Latitude: 22.3692, Longitude: 114.1743, "id": 1 },
    { Property_Title: "Default 2", Image_URL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574967427948&di=1c62fcf6e8a8fba4dba940fd58b0f096&imgtype=0&src=http%3A%2F%2Fpic.ossfiles.cn%3A9186%2Fgroup2%2FM00%2F45%2FFE%2FrBgICV1owMKAUuNiAAFb8_sQOe0700.jpg", Estate: "City One Shatin", Bedrooms: 2, Gross_Area: 200, Expected_Tenants: 2, Rent: 2000, Highlighted_Property: "checked",Latitude: 22.386389, Longitude: 114.203889, "id": 2 },
    { Property_Title: "Default 3", Image_URL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574967432416&di=4121f44fa48788d03f899dc4573ec43e&imgtype=0&src=http%3A%2F%2Fstatic.jisutui.vip%2Fdata%2Fupload%2F2019%2F07%2Fdb815e3a6av61kqq.jpg", Estate: "Tin Ma Court", Bedrooms: 3, Gross_Area: 300, Expected_Tenants: 3, Rent: 3000, Highlighted_Property: "checked", "id": 3 },
    { Property_Title: "Default 4", Image_URL: "http://gc.zbj.com/upimg/6/2016/0120/20160120132005_97589.jpg", Estate: "Festival City", Bedrooms: 4, Gross_Area: 400, Expected_Tenants: 4, Rent: 4000, Highlighted_Property: "checked", Latitude: 22.3692, Longitude: 114.1743, "id": 4 },
    { Property_Title: "Default 5", Image_URL: "http://www.0551fangchan.com/uploadfile/2019/1028/20191028032904903.jpg", Estate: "Festival City", Bedrooms: 5, Gross_Area: 500, Expected_Tenants: 5, Rent: 5000, Highlighted_Property: "checked", Latitude: 22.3692, Longitude: 114.1743, "id": 5 },

    // etc.
  ]);

  return generateUsers();
  //Add Administor
  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    const hash1 = await sails.bcrypt.hash('123456', saltRounds);
    const hash2 = await sails.bcrypt.hash('12345678', saltRounds);
    await User.createEach([
      { username: "admin", password: hash1, role: "admin", id: 1 },
      { username: "clients", password: hash2, id: 2 },
      // etc.
    ]);

    const Default_1 = await Apartment.findOne({ Property_Title: "Default 1" });
    const Default_2 = await Apartment.findOne({ Property_Title: "Default 2" });
    const Default_3 = await Apartment.findOne({ Property_Title: "Default 3" });
    const Default_4 = await Apartment.findOne({ Property_Title: "Default 4" });
    const Default_5 = await Apartment.findOne({ Property_Title: "Default 5" });
    //const admin = await User.findOne({ username: "admin" });
    const clients = await User.findOne({ username: "clients" });

    await User.addToCollection(clients.id, 'rents').members([Default_2.id, Default_3.id, Default_4.id, Default_5.id]);
    return;
  }


};
