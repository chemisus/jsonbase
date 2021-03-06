function LeftOperation() {
    this.make = function (value) {
        return ['left', value];
    };

    this.execute = function (data, environment) {
        environment.pushRecord(environment.left);

        var result = environment.execute(data[1]);

        environment.popRecord();

        return result;
    };
}
