function AndOperation() {
    this.make = function (values) {
        return {
            op: 'and',
            value: values
        };
    };

    this.execute = function (record, op) {
        for (var i in op.value) {
            if (!operations[op.value[i].op].execute(record, op.value[i])) {
                return false;
            }
        }

        return true;
    };
}
