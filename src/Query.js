function Query() {

    this.make = function (table_name) {
        return {
            from: table_name
        }
    };

    this.execute = function (op, operations) {
        return operations[op.type].execute(null, op, operations);
    };
}
