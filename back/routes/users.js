import bodyParser from "body-parser";

module.exports = app => {
    const Users = app.db.models.Users;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.route("/users")
    .get((req, res) => {
      Users.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
      })
      // "/users": Lista users 
    .post((req, res) => {
       Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
           res.status(412).json({msg: error.message});
            console.log(req.body)
          });
        });
        // "/users": Cadastra um novo usuário

    app.route("/users/:id")
      .get((req, res) => {
        // Users.findById(req.params.id, {
        //     attributes: ["id", "name", "email"]
        // })
        Users.findOne({where: req.params, attributes: ["id", "name"]})

          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    })
      .delete((req, res) => {
        Users.destroy({where: {id: req.params.id} })
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
         });
    });
};