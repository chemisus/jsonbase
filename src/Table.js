function Table() {
    this.addTable = function (file, name) {
        file.tables.keys.push(name);
        file.tables.values[name] = [];
    };
}
