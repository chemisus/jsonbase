function OrOperation(operations) {
    this.execute = function (record, op) {
        for (var i in op.value) {
            if (operations[op.value[i].op].execute(record, op.value[i])) {
                return true;
            }
        }

        return false;
    };
}
