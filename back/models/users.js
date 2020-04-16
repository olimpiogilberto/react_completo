module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        password: {
            type: DataType.STRING,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        email: {
            type: DataType.STRING,
            unique: false,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        
    }, {
        classMethods: {
            associate: (models) => {
                Users.hasMany(models.Tasks);
            }
        }
    });
    return Users;
};