import bodyParser from "body-parser";

module.exports = app => {
  const Livros = app.db.models.Livros;
  const Autores = app.db.models.Autores;
  const livrosFind = []
  const autoresFind = []
  
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
      .get(async (req, res) => 
      {
        const livrosFind = await Livros.findOne({where: req.params})
        // .then(result => livrosFind)
          .catch(error => {res.status(412).json({ msg: error.message })});

        const autoresFind = await Autores.findOne({where: req.params})
        // .then(result => autoresFind)
          .catch(error => {res.status(412).json({ msg: error.message })});  

        const livrosFull = [
          {
            id: livrosFind.id,
            titulo: livrosFind.titulo,
            preco: livrosFind.preco,
            autor: {
              id: autoresFind.id,
              nome: autoresFind.nome,
              email: autoresFind.email,
            },
          },
        ];

        return res.json(livrosFull);
      })
      .delete((req, res) => {
        Livros.destroy({where: {id: req.params.id} })
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    });
};