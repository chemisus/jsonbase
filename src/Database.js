function Database() {
    this.initFile = function (database_name) {
        return {
            name: database_name,
            migration: 0,
            constraints: {
            },
            constraint_keys: [
            ],
            tables: {
            }
        };
    };

    this.saveFile = function (file) {
        localStorage.setItem(file.name, angular.toJson(file));
    };

    this.loadFile = function (file_name) {
        if (!localStorage.getItem(file_name)) {
            return null;
        }

        return angular.fromJson(localStorage.getItem(file_name));
    };

    this.dropDatabase = function (file_name) {
        localStorage.removeItem(file_name);
    };

    this.hasTable = function (file, table_name) {
        return file.tables.hasOwnProperty(table_name);
    };

    this.migrateDatabase = function (file, constraints, migrations) {
        for (; file.migration < migrations.length; file.migration++) {
            migrations[file.migration].up(file, constraints);
        }

        this.saveFile(file);
    };

    this.addConstraint = function (file, constraint) {
        file.constraints[constraint.name] = constraint;
        file.constraint_keys.push(constraint.name);
    };

    /**
     *
     * @returns {QueryBuilder}
     */
    this.query = function (file, constraints, table_name) {
        var query = new Query();

        return new QueryBuilder(file, constraints, query, query.make(table_name));
    }
}
