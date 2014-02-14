function ReduceOperation() {
    this.make = function (intial, array, value) {
        return [
            'reduce',
            intial,
            array,
            value
        ];
    };

    this.execute = function (data, environment) {
        return environment.execute(data[2]).reduce(environment.execute(data[1]), function () {
            return environment.execute(data[3]);
        });
    };
}
