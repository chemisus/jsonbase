function NotOperation() {
    this.make = function (value) {
        return [
            'not',
            value
        ];
    };

    this.execute = function (data, environment) {
        return !environment.operations[data[1][0]].execute(data[1], environment);
    };
}
