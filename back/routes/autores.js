import bodyParser from "body-parser";

module.exports = app => {
    const Autores = app.db.models.Autores;
    // const Livros = app.db.models.Livros;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.route("/api/autores")
    .get((req, res) => {
     
      // Livros.findAll({where: req.params, attributes: ["id", "titulo", "preco","updatedAt","createdAt"]})
      // .then(result => res.json(livrosResul))

      // Autores.findAll({where: req.params, attributes: ["id", "nome", "email","updatedAt","createdAt"]})
      // .then(result => res.json(autorResul))

      // const autorFull = [
      //   {
      //     id: livrosResul.id,
      //     titulo: livrosResul.titulo,
      //     preco: livrosResul.preco,
      //     autor : [
      //       {
      //         id: autorResul.id,
      //         nome: autorResul.nome,
      //         email: autorResul.email
      //       }
      //     ]
      //   }
      // ]

      // return res.json(autorFull);

      Autores.findAll({where: req.params, attributes: ["id", "nome", "email","updatedAt","createdAt"]})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      })
      // "/autores": Lista autores 
    .post((req, res) => {
       Autores.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
           res.status(412).json({msg: error.message});
            console.log(req.body)
          });
        });
        // "/autores": Cadastra um novo autor

    app.route("/api/autores/:id")
      .get((req, res) => {

        Autores.findOne({where: req.params, attributes: ["id", "nome", "email","createdAt","updatedAt"]})

          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
      })
      .put((req, res) => {
        Autores.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      // "/autores/1": Atualiza um autor
      .delete((req, res) => {
        Autores.destroy({where: {id: req.params.id} })
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    });
};