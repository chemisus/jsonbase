function MapOperation() {
    this.make = function (values, mapper) {
        return ['map', values, mapper];
    };

    this.execute = function (op, env) {
        return env.execute(op[1]).map(function (record) {
            env.pushRecord(record);

            var result = env.execute(op[2]);

            env.popRecord();

            return result;
        });
    };
}