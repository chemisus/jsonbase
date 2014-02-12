function QueryBuilder(operations) {
    this.const = function (value) {
        return operations.const.make(value);
    };

    this.value = function (value) {
        return operations.value.make(value);
    };

    this.eq = function (lhs, rhs) {
        return operations.eq.make(lhs, rhs);
    };

    this.gt = function (lhs, rhs) {
        return operations.gt.make(lhs, rhs);
    };

    this.gte = function (lhs, rhs) {
        return operations.gte.make(lhs, rhs);
    };

    this.lt = function (lhs, rhs) {
        return operations.lt.make(lhs, rhs);
    };

    this.lte = function (lhs, rhs) {
        return operations.lte.make(lhs, rhs);
    };

    this.or = function (values) {
        return operations.or.make(values);
    };

    this.and = function (values) {
        return operations.and.make(values);
    };

    this.not = function (value) {
        return operations.not.make(value);
    };

    this.select = function (records, value) {
        return operations.select.make(records,  value);
    };
}
