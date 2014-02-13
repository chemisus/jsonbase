function Environment() {
    this.execute = function (data) {
        return this.operations[data[0]].execute(data, this);
    };

    this.pushRecord = function (record) {
        this.records.push(this.record);

        this.record = record;
    };

    this.popRecord = function () {
        this.record = this.records.pop();
    };

    this.pushLeft = function (record) {
        this.lefts.push(this.left);

        this.left = record;
    };

    this.popLeft = function () {
        this.left = this.lefts.pop();
    };

    this.pushRight = function (record) {
        this.rights.push(this.right);

        this.right = record;
    };

    this.popRight = function () {
        this.right = this.rights.pop();
    };
}
