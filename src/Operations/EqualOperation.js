function EqualOperation() {
    this.make = function (lhs, rhs) {
        return [
            'eq',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        var lhs = environment.execute(data[1]);
        var rhs = environment.execute(data[2]);

        return  lhs == rhs;
    };
}
