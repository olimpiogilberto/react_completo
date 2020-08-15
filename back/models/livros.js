module.exports = (sequelize, DataType) => {
    const Livros = sequelize.define("Livros", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true     },
        titulo: {
            type: DataType.STRING,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        preco: {
            type: DataType.STRING,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        autorId: {
            type: DataType.INTEGER,
            allowNull: false
            // validate: { notEmpty: false 
        
        },
        
    }, {
        classMethods: {
            associate: (models) => {
                Livros.belongsTo(models.Autores);
            }
        }
    });
    return Livros;
};