// import bodyParser from "body-parser";

// module.exports = app => {
//   app.set("port", 3000);
//   app.set("json spaces", 4);
//   app.use(bodyParser.json);
//   app.use((req,res) => {
//     delete req.body.id;
//     next();
//   });
// };

module.exports = app => {
  app.set("port", 8080);
  app.set("json spaces", 4);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

};