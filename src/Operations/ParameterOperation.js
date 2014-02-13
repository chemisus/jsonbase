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
}