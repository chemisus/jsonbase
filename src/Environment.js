function Environment() {
    this.execute = function (data) {
        return this.operations[data[0]].execute(data, this);
    };
}
