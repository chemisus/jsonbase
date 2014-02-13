function AndOperation() {
    this.make = function (operations) {
        return [
            'and',
            operations
        ];
    };

    this.execute = function (data, environment) {
        for (var i = 0; i < data[1].length; i++) {
            if (!environment.execute(data[1][i])) {
                return false;
            }
        }

        return true;
    };
}
