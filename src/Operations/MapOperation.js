function MapOperation() {
    this.make = function (from, to) {
        return [
            'map',
            from,
            to
        ];
    };

    this.execute = function (data, environment) {
        return environment.execute(data[1]).map(function () {
            return environment.execute(data[2]);
        });
    };
}
