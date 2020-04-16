module.exports = (sequelize, DataType) => {
    const Livros = sequelize.define("Livros", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: false }
        },
        preco: {
            type: DataType.INTEGER,
            // allowNull: false
            // defaultValue: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                Livros.belongsTo(models.Autores);
            }
        }
    });
    return Livros;
};