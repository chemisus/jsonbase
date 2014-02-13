function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (data, environment) {
        return true;
    };
}