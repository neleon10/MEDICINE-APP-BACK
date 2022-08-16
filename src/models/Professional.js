const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('professional', {
    medicalLicense: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    licenceImage:{
        type: DataTypes.STRING,
        allowNull:false
    } ,
    ranking:{
      type: DataTypes.STRING
    },
    aboutMe:{
      type:DataTypes.TEXT,
      allowNull: true,
    },
    college:{
      type: DataTypes.STRING,
      allowNull: true
    }

  },{
    freezeTableName: true,
    timestamps: false
});
};
