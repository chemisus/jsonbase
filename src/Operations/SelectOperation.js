function SelectOperation() {
    this.make = function (records, value) {
        return {
            op: 'select',
            records: records,
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return op.records.filter(function (record) {
            return operations[op.value.op].execute(record, op.value, operations);
        });
    };

    this.toSql = function (current, operations) {
        return "select * " +
            operations[current.records.op].toSql(current.records, operations) +
            " where " +
            operations[current.value.op].toSql(current.value, operations);
    };
}
