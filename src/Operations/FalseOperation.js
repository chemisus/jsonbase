function FalseOperation() {
    this.make = function () {
        return ['false'];
    };

    this.execute = function (data, environment) {
        return false;
    };
}