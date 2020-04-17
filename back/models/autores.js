module.exports = (sequelize, DataType) => {
    const Autores = sequelize.define("Autores", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
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
                Autores.hasMany(models.Autores);
            }
        }
    });
    return Autores;
};