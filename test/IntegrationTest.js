describe('system', function () {
    var database = new Database();
    var migration = new Migration();
    var table = new Table();

    var operations = {
        const: new ConstOperation(),
        value: new ValueOperation(),
        eq: new EqualOperation(),
        gt: new GreaterThanOperation(),
        gte: new GreaterThanOrEqualOperation(),
        lt: new LessThanOperation(),
        lte: new LessThanOrEqualOperation(),
        not: new NotOperation(),
        and: new AndOperation(),
        or: new OrOperation(),
        select: new SelectOperation()
    };

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
                constraints.generate.create(file, 'table1_generate', 'table1', 'id');
                constraints.unique.create(file, 'table1_unique', 'table1', 'id');
            }),
            migration.create(function (file, constraints) {
                table.create(file, 'table2');
                constraints.generate.create(file, 'table2_generate', 'table2', 'id');
                constraints.unique.create(file, 'table2_unique', 'table2', 'id');
            }),
            migration.create(function (file, constraints) {
                table.create(file, 'table3');
                constraints.generate.create(file, 'table3_generate', 'table3', 'id');
                constraints.unique.create(file, 'table3_unique', 'table3', 'id');
            }),
            migration.create(function (file, constraints) {
                constraints.save_database.create(file, 'db_save');
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
        var qb = new QueryBuilder(operations);
        var q = new Query(operations);

        var query = qb.select(
            file.tables.table1.records,
            qb.eq(qb.value('id'), qb.const(1))
        );

        expect(q.execute(query, operations).length).toBe(1);
    });

    it('should be able to be queried', function () {
        var qb = new QueryBuilder(operations);
        var q = new Query(operations);

        var query = qb.select(
            file.tables.table1.records,
            qb.not(
                qb.or([
                    qb.lte(qb.value('id'), qb.const(9)),
                    qb.eq(qb.const(3), qb.value('id')),
                    qb.eq(qb.value('id'), qb.const(6))
                ])
            )
        );

        expect(q.execute(query, operations).length).toBe(8);
    });
});
