import bodyParser from "body-parser";

module.exports = app => {
  const Tasks = app.db.models.Tasks;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.route("/api/tasks")
      .get((req, res) => {
        Tasks.findAll({})
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
        })
        // "/tasks": Lista tarefas 
      .post((req, res) => {
        Tasks.create(req.body)
          .then(result => res.json(result))
          .catch(error => {
            res.status(412).json({msg: error.message});
            console.log(req.params)
          });
      });
      // "/tasks": Cadastra uma nova tarefa

    app.route("/api/tasks/:id")
      .get((req, res) => {
        Tasks.findOne({where: req.params})

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
      // "/tasks/1": Consulta uma tarefa
      .put((req, res) => {
        Tasks.update(req.body, {where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      })
      // "/tasks/1": Atualiza uma tarefa
      .delete((req, res) => {
        Tasks.destroy({where: req.params})
          .then(result => res.sendStatus(204))
          .catch(error => {
            res.status(412).json({msg: error.message});
          });
      });
      // "/tasks/1": Exclui uma tarefa
};