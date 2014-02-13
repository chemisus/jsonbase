function LeftOperation() {
    this.make = function (value) {
        return ['left', value];
    };

    this.execute = function (data, environment) {
        return environment.execute(data[1]);
    };
}
