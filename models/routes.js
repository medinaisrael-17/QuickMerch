module.exports = function(sequelize, DataTypes) {
    const Route = sequelize.define("Route", {
        store: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        product: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        completed : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isAssigned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Route.associate = function(models) {
        models.Route.belongsTo(models.User)
    }

    return Route;
}