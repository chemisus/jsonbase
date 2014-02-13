function SelectOperation() {
    this.make = function (from, where) {
        return [
            'select',
            from,
            where
        ];
    };

    this.execute = function (data, environment) {
        var records = environment.operations[data[1][0]].execute(data[1], environment).filter(function (record) {
            environment.record = record;

            return environment.operations[data[2][0]].execute(data[2], environment);
        });

        environment.record = null;

        return records;
    };
}
