function InOperation() {
    this.make = function (value, array) {
        return [
            'in',
            value,
            array
        ];
    };

    this.execute = function (data, environment) {
        var value = environment.operations[data[1][0]].execute(data[1], environment);
        var values = environment.operations[data[2][0]].execute(data[2], environment);

        for (var i = 0; i < values.length; i++) {
            if (value === values[i]) {
                return true;
            }
        }

        return false;
    };
}
