function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (op, env) {
        return true;
    };
}
