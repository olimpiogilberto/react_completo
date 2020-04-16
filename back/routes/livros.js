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
        // "/Livros": Lista livros 
      .post((req, res) => {
        Livros.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
            console.log(req.params)
          });
      });
      // "/Livros": Cadastra uma novo livro

    app.route("/api/livros/:id")
      .get((req, res) => {
        Livros.findOne({where: req.params})

          .then(result => {
            if(result) {
              res.json(result);
            } else {
              res.sendStatus(404);
            }
          })
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      // "/Livros/1": Consulta um livro
      .put((req, res) => {
        Livros.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      // "/Livros/1": Altera um livro
      .delete((req, res) => {
        Livros.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      // "/Livros/1": Exclui um livro
};