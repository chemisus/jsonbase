function SelectOperation() {
    this.make = function (from, where) {
        return [
            'select',
            from,
            where
        ];
    };

    this.execute = function (data, environment) {
        var records = environment.execute(data[1]).filter(function (record) {
            environment.record = record;

            return environment.execute(data[2]);
        });

        environment.record = null;

        return records;
    };
}
