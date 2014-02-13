function ConstOperation() {
    this.make = function (value) {
        return [
            'const',
            value
        ];
    };

    this.execute = function (data, environment) {
        return data[1];
    };
}