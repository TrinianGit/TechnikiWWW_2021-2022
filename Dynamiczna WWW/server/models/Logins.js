module.exports = (sequelize, DataTypes) => {

    const Logins = sequelize.define("Logins", {
        
        Login: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Logins;
};