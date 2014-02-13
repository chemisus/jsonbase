function NotOperation() {
    this.make = function (value) {
        return [
            'not',
            value
        ];
    };

    this.execute = function (data, environment) {
        return !environment.execute(data[1]);
    };
}
