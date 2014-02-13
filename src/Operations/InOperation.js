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

        for (var i = 0; i < data[2].length; i++) {
            if (value === data[2][i]) {
                return true;
            }
        }

        return false;
    };
}
