import bodyParser from "body-parser";

module.exports = app => {
    const Livros = app.db.models.Livros;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.route("/api/livros")
    .get((req, res) => {
      Livros.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      })
      // "/livros": Lista livros 
    .post((req, res) => {
       Livros.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
           res.status(412).json({msg: error.message});
            console.log(req.body)
          });
        });
        // "/livros": Cadastra um novo livro

    app.route("/api/livros/:id")
      .get((req, res) => {
        Users.findById(req.params.id, {
            attributes: ["id", "titulo", "autor"]
        })
        // Livros.findOne({where: req.params, attributes: ["id", "titulo"]})

          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    })
      .delete((req, res) => {
        Livros.destroy({where: {id: req.params.id} })
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    });
};