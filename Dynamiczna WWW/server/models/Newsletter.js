module.exports = (sequelize, DataTypes) => {

    const Newsletter = sequelize.define("Newsletter", {
        
        Email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });

    return Newsletter;
};