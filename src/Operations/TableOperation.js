function TableOperation() {
    this.make = function (table_name) {
        return [
            'table',
            table_name
        ];
    };

    this.execute = function (data, environment) {
        return environment.file.tables[data[1]];
    };
}