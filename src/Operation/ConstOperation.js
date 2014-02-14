function ConstOperation() {
    this.make = function (value) {
        return ['const', value];
    };

    this.execute = function (op, env) {
        return op[1];
    };
}
