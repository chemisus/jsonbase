describe('jsonbase', function () {
    var database = new Database();
    var migration = new Migration();
    var table = new Table();

    var constraints = {
        generate: new GenerateConstraint('generate'),
        unique: new UniqueConstraint('unique'),
        save_database: new SaveDatabaseConstraint('save_database')
    };

    var file;

    beforeEach(function () {

        file = database.initFile();

        var migrations = [
            migration.create(function (file, constraints) {
                table.create(file, 'table1');
                constraints['generate'].create(file, 'table1_generate', 'table1', 'id');
                constraints['unique'].create(file, 'table1_unique', 'table1', 'id');
            }),
            migration.create(function (file, constraints) {
                table.create(file, 'table2');
                constraints['generate'].create(file, 'table2_generate', 'table2', 'id');
                constraints['unique'].create(file, 'table2_unique', 'table2', 'id');
            }),
            migration.create(function (file, constraints) {
                table.create(file, 'table3');
                constraints['generate'].create(file, 'table3_generate', 'table3', 'id');
                constraints['unique'].create(file, 'table3_unique', 'table3', 'id');
            }),
            migration.create(function (file, constraints) {
                constraints['save_database'].create(file, 'db_save');
            }),
            migration.create(function (file, constraints) {
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
                table.insert(file, constraints, 'table1', {});
            })
        ];

        database.migrateDatabase(file, constraints, migrations);
    });

    it('should be able to migrate.', function () {
    });

    it('should be able to be queried', function () {
        var query = database.query(file, constraints, 'table1');

        query = query.where(query.not(query.or([
            query.gte(query.value('id'), query.const(9)),
            query.eq(query.const(3), query.value('id')),
            query.eq(query.value('id'), query.const(6))
        ])));

        console.log(query.execute());
    });
});
