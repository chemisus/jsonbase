function QueryExecutor() {
    var operations = {};

    operations.const = new ConstOperation(operations);
    operations.value = new ValueOperation(operations);
    operations.eq = new EqualOperation(operations);
    operations.gt = new GreaterThanOperation(operations);
    operations.gte = new GreaterThanOrEqualOperation(operations);
    operations.lt = new LessThanOperation(operations);
    operations.lte = new LessThanOrEqualOperation(operations);
    operations.not = new NotOperation(operations);
    operations.and = new AndOperation(operations);
    operations.or = new OrOperation(operations);

    this.make = function (table_name) {
        return {
            from: table_name
        }
    };

    this.execute = function (database, query) {
        return database.tables[query.from].records.filter(function (record) {
            if (query.where && !operations[query.where.op].execute(record, query.where)) {
                return false;
            }

            return true;
        });
    };
}