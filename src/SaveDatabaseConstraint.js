function SaveDatabaseConstraint(type) {
    angular.extend(this, new Constraint());

    this.create = function (database, name) {
        new Database().addConstraint(database, {
            name: name,
            type: type
        });
    };

    this.postDatabaseInsert = function (database, constraint_data, table_name, inserted) {
        new Database().saveFile(database);
    };

    this.postDatabaseUpdate = function (database, constraint_data, table_name, old, updated) {
        new Database().saveFile(database);
    };

    this.postDatabaseDelete = function (database, constraint_data, table_name, deleted) {
        new Database().saveFile(database);
    };
}
