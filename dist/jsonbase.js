/**
 *
 * @param operations
 * @param {QueryBuilderFactory} query_builder_factory
 * @constructor
 */
function Environment(operations, query_builder_factory) {
    var records = [null];

    this.record = function () {
        return records[records.length - 1];
    };

    this.pushRecord = function (value) {
        records.push(value);
    };

    this.popRecord = function () {
        return records.pop();
    };

    this.execute = function (op) {
        return this.operation(op[0]).execute(op, this);
    };

    this.operation = function (key) {
        return operations[key];
    };

    this.availableOperations = function () {
        var keys = [];

        for (var i in operations) {
            keys.push(i);
        }

        return keys;
    };

    this.queryBuilder = function () {
        return query_builder_factory.make(this);
    };
}
;function EnvironmentFactory() {
    this.make = function (options) {
        options = options || {};

        return new Environment(
            options.operations || this.makeOperations(),
            options.query_builder_factory || new QueryBuilderFactory()
        );
    };

    this.makeOperations = function () {
        return {
            true: new TrueOperation(),
            false: new FalseOperation(),
            const: new ConstOperation(),
            not: new NotOperation(),
            record: new RecordOperation(),
            map: new MapOperation(),
            eq: new EqualOperation()
        };
    };
}
;function ConstOperation() {
    this.make = function (value) {
        return ['const', value];
    };

    this.execute = function (op, env) {
        return op[1];
    };
}
;function EqualOperation() {
    this.make = function (lhs, rhs) {
        return ['eq', lhs, rhs];
    };

    this.execute = function (op, env) {
        var lhs = env.execute(op[1]);
        var rhs = env.execute(op[2]);

        return lhs == rhs;
    };
}
;function FalseOperation() {
    this.make = function () {
        return ['false'];
    };

    this.execute = function (op, env) {
        return false;
    };
}
;function MapOperation() {
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
};function NotOperation() {
    this.make = function (value) {
        return ['not', value];
    };

    this.execute = function (op, env) {
        return !env.execute(op[1]);
    };
}
;function RecordOperation() {
    this.make = function () {
        return ['record'];
    };

    this.execute = function (op, env) {
        return env.record();
    };
}
;function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (op, env) {
        return true;
    };
}
;function QueryBuilder(env) {
    var keys = env.availableOperations();

    for (var i = 0; i < keys.length; i++) {
        this[keys[i]] = env.operation(keys[i]).make;
    }
}
;function QueryBuilderFactory() {
    this.make = function (env) {
        return new QueryBuilder(env);
    };
}
