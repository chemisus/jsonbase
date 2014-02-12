function FromOperation() {
    this.make = function (file, table_name) {
        return {
            op: 'from',
            file: file,
            table: table_name
        };
    };

    this.execute = function (record, current, operations) {
        return current.file.tables[current.table_name].records;
    };

    this.toSql = function (current, operations) {
        return "from " + current.table;
    };
}
