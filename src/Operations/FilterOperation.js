function FilterOperation() {
    this.make = function (array, value) {
        return [
            'filter',
            array,
            value
        ];
    };

    this.execute = function (data, environment) {
        return environment.execute(data[1]).filter(function () {
            return environment.execute(data[2]);
        });
    };
}
