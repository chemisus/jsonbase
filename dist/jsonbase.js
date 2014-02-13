function ParameterOperation() {
    this.make = function (parameter_name) {
        return [
            'param',
            parameter_name
        ];
    };

    this.execute = function (data, environment) {
        return environment.parameters[data[1]];
    };
};function TableOperation() {
    this.make = function (table_name) {
        return [
            'table',
            table_name
        ];
    };

    this.execute = function (data, environment) {
        return environment.file.tables[data[1]];
    };
};function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (data, environment) {
        return true;
    };
}