function ConstOperation(operations) {
    this.execute = function (record, op) {
        return op.value;
    };
}
