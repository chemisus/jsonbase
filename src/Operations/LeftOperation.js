function LeftOperation() {
    this.make = function (value) {
        return ['left', value];
    };

    this.execute = function (data, environment) {
        environment.pushRecord(environment.left);

        var result = environment.operations[data[1][0]].execute(data[1], environment);

        environment.popRecord();

        return result;
    };
}
