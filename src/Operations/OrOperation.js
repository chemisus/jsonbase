function OrOperation() {
    this.make = function (values) {
        return {
            op: 'or',
            value: values
        };
    };

    this.execute = function (record, current, operations) {
        for (var i in current.value) {
            if (operations[current.value[i].op].execute(record, current.value[i], operations)) {
                return true;
            }
        }

        return false;
    };
}
