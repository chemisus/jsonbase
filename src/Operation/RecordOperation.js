function RecordOperation() {
    this.make = function () {
        return ['record'];
    };

    this.execute = function (op, env) {
        return env.record();
    };
}
