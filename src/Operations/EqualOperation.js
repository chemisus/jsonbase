function EqualOperation() {
    this.make = function (lhs, rhs) {
        return [
            'eq',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        var lhs = environment.operations[data[1][0]].execute(data[1], environment);
        var rhs = environment.operations[data[2][0]].execute(data[2], environment);

        return  lhs == rhs;
    };
}
