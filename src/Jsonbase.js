/**
 *
 * @param file
 * @param {Database} database
 * @param {Table} table
 * @param {Migration} migration
 * @constructor
 */
function Jsonbase(file, database, table, migration, constraints) {
    database = database || new Database();
    table = table || new Table();
    migration = migration || new Migration();
    file = file || database.initFile('db');

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

    this.operations = function () {
        return operations;
    };

    this.insert = function (table_name, record) {
        table.insert(file, constraints, table_name, record);
    };

    this.select = function (table_name, value) {
        var qb = new QueryBuilder(operations);
        var q = new Query(operations);

        if (!value) {
            return file.tables[table_name].records;
        }

        var query = qb.select(file.tables[table_name].records, value);

        return q.execute(query, operations);
    };
}
