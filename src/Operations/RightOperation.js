function RightOperation() {
    this.make = function (value) {
        return ['right', value];
    };

    this.execute = function (data, environment) {
        environment.pushRecord(environment.right);

        var result = environment.execute(data[1]);

        environment.popRecord();

        return result;
    };
}
