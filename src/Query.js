function Query(operations) {

    this.make = function (table_name) {
        return {
            from: table_name
        }
    };

    this.execute = function (database, query) {
        return database.tables[query.from].records.filter(function (record) {
            if (query.where && !operations[query.where.op].execute(record, query.where, operations)) {
                return false;
            }

            return true;
        });
    };
}
