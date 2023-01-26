module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        
        Login: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Number: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Adress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Webpage: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Github: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Twitter: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Instagram: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Facebook: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });

    return Users;
};