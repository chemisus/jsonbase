function Query() {

    this.make = function (table_name) {
        return {
            from: table_name
        };
    };

    this.execute = function (current, operations) {
        return operations[current.op].execute(null, current, operations);
    };

    this.toSql = function (current, operations) {
        return operations[current.op].toSql(current, operations);
    };
}
