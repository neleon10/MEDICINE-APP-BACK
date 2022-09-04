const {
    DataTypes,
    STRING
} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type:DataTypes.DATEONLY,
            allowNull: true
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userimage: {
            type: DataTypes.STRING,
            allowNull:true
        },
        idImage: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        province: {
            type: DataTypes.STRING,
            allowNull:true
            
        },
        phone: {
            type: DataTypes.STRING,
            allowNull:true
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gps: {
            type: DataTypes.STRING,
            allowNull: true
        },
        favorites:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull:true
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        deletedByAdmin:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    }, {
        freezeTableName: true,
    }
    );
};
