module.exports = app => {
    app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {
            console.log(`Back Startado na porta ${app.get("port")}`);
        });
    });
}
