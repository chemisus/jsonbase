function FalseOperation() {
    this.make = function () {
        return ['false'];
    };

    this.execute = function (op, env) {
        return false;
    };
}
