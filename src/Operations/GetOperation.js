function GetOperation() {
    this.make = function (field_name) {
        return [
            'get',
            field_name
        ];
    };

    this.execute = function (data, environment) {
        return environment.record[data[1]];
    };
}
