function SelectOperation() {
    this.make = function (records, value) {
        return {
            type: 'select',
            records: records,
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return op.records.filter(function (record) {
            return operations[op.value.op].execute(record, op.value, operations);
        });
    };
}
