require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Medical_Record = require('./models/Medical_Record');
const {
  DATABASE_URL
} = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false,// lets Sequelize know we can use pg-native for ~30% more speed


  //extra configuration for heroku
  dialectOptions:{
    ssl:{
      require:true,
      rejectUnauthorized:false
    }
  },

});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User , Professional , Medicalrecord , Comments , Appointment , Ad } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Professional.hasMany(Ad)
Ad.belongsTo(Professional)

User.hasOne(Professional)
Professional.belongsTo(User)

Professional.hasMany(Appointment )
Appointment.belongsTo(Professional)

User.hasMany(Appointment)
Appointment.belongsTo(User)

//Un usuario puede tener muchos comentarios medicos pero todos esos comentarios pertencen a un solo usuario
User.hasOne(Medicalrecord)
Medicalrecord.belongsTo(User)

//Un profesional puede tener muchos comentarios pero todos esos comentarios pertencen a un solo profesional 
Professional.hasMany(Comments)
Comments.belongsTo(Professional)

//podemos hacer que copincidan los id en turno y medical record para hacer coindir el usuario :*
Ad.hasMany(Appointment)
Appointment.belongsTo(Ad)

User.belongsToMany(Professional , {through: 'favorites'  , timestamps: false})
Professional.belongsToMany(User , {through: 'favorites' , timestamps: false})



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};