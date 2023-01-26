module.exports = (sequelize, DataTypes) => {

    const Complains = sequelize.define("Complains", {
        
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Complains;
};