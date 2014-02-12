function OrOperation() {
    this.make = function (values) {
        return {
            op: 'or',
            value: values
        }
    };

    this.execute = function (record, op, operations) {
        for (var i in op.value) {
            if (operations[op.value[i].op].execute(record, op.value[i], operations)) {
                return true;
            }
        }

        return false;
    };
}
