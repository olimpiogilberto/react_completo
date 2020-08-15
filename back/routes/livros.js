import bodyParser from "body-parser";

module.exports = app => {
  const Livros = app.db.models.Livros;
  const Autores = app.db.models.Autores;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.route("/api/livros")

    .get((req, res) => {
      const resultados = []
      Livros.findAll({ attributes: ["id", "titulo", "preco", "autorId"] })

        .then(async result => {
          for (let resultado of result) {
            console.log(resultado.get().autorId)
            const livroId = resultado.get().id
            const titulo = resultado.get().titulo
            const preco = resultado.get().preco

            const cadaResultado = await Autores.findOne({
              where: { id: resultado.get().autorId },
              attributes: ["id", "nome", "email"]
            })
              .then(novoResult => {
                console.log('novoResult', novoResult.get())
                const autor = novoResult.get()

                const novoResultado = {
                  id: livroId,
                  titulo,
                  preco,
                  autor
                }

                //console.log('resultados', resultados)
                return novoResultado
              })
            console.log('cadaResultado', cadaResultado)
            resultados.push(cadaResultado)
          }
          return res.json(resultados)

        }
        )
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    // "/livros": Lista livros 
    .post((req, res) => {
      Livros.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
          console.log(req.body)
        });
    });
  // "/livros": Cadastra um novo livro

  app.route("/api/livros/:id")
    .get((req, res) => {
      // Livros.findById(req.params.id, {
      //     attributes: ["id", "titulo", "autor"]
      // })
      Livros.findOne({ where: req.params, attributes: ["id", "titulo", "autorId"] })

        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .delete((req, res) => {
      Livros.destroy({ where: { id: req.params.id } })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
};