function AndOperation() {
    this.make = function (values) {
        return {
            op: 'and',
            value: values
        };
    };

    this.execute = function (record, current) {
        for (var i in current.value) {
            if (!operations[current.value[i].op].execute(record, current.value[i])) {
                return false;
            }
        }

        return true;
    };
}
