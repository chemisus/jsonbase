function Table() {
    this.createTable = function (file, table_name) {
        file.tables.keys.push(table_name);
        file.tables.values[table_name] = [];
    };

    this.insert = function (file, table_name, record) {
        file.tables.values[table_name].push(record);
    };
}
