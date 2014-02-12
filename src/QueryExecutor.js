function QueryExecutor() {
    var operations = {
        const: ConstOperation,
        value: ValueOperation,
        eq: EqualOperation,
        gt: GreaterThanOperation,
        gte: GreaterThanOrEqualOperation,
        lt: LessThanOperation,
        lte: LessThanOrEqualOperation,
        not: NotOperation,
        and: AndOperation,
        or: OrOperation
    };

    this.make = function (table_name) {
        return {
            from: table_name
        }
    };

    this.execute = function (database, query) {
        return database.tables[query.from].records.filter(function (record) {
            if (query.where && !operations[query.where.op](record, query.where)) {
                return false;
            }

            return true;
        });
    };
}