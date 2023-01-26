module.exports = (sequelize, DataTypes) => {

    const Messages = sequelize.define("Messages", {
        
        From_User: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        To_User: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Messages;
};