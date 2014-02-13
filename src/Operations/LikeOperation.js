function LikeOperation() {
    this.make = function (lhs, rhs) {
        return [
            'like',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        var lhs = environment.operations[data[1][0]].execute(data[1], environment);
        var rhs = environment.operations[data[2][0]].execute(data[2], environment);

        return rhs.test(lhs);
    };
}
