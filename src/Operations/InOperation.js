function InOperation() {
    this.make = function (value, array) {
        return [
            'in',
            value,
            array
        ];
    };

    this.execute = function (data, environment) {
        var value = environment.execute(data[1]);
        var values =  environment.execute(data[2]);

        for (var i = 0; i < values.length; i++) {
            if (value === values[i]) {
                return true;
            }
        }

        return false;
    };
}
