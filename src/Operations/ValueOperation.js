function ValueOperation(operations) {
    this.execute = function (record, op) {
        return record[op.value];
    };
}
