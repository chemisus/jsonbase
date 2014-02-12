function GetOperation() {
    this.make = function (value) {
        return {
            op: 'get',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return record[current.value];
    };

    this.toSql = function (current, operations) {
        return current.value;
    };
}
