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
