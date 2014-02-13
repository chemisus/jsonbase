function OrOperation() {
    this.make = function (operations) {
        return [
            'or',
            operations
        ];
    };

    this.execute = function (data, environment) {
        for (var i = 0; i < data[1].length; i++) {
            if (environment.operations[data[1][i][0]].execute(data[1][i], environment)) {
                return true;
            }
        }

        return false;
    };
}
