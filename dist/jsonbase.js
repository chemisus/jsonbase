function AndOperation() {
    this.make = function (operations) {
        return [
            'and',
            operations
        ];
    };

    this.execute = function (data, environment) {
        for (var i = 0; i < data[1].length; i++) {
            if (!environment.operations[data[1][i][0]].execute(data[1][i], environment)) {
                return false;
            }
        }

        return true;
    };
}
;function ConstOperation() {
    this.make = function (value) {
        return [
            'const',
            value
        ];
    };

    this.execute = function (data, environment) {
        return data[1];
    };
};function EqualOperation() {
    this.make = function (lhs, rhs) {
        return [
            'eq',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        return environment.operations[data[1][0]].execute(data[1], environment) == environment.operations[data[2][0]].execute(data[2], environment);
    };
}
;function GetOperation() {
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
;function NotOperation() {
    this.make = function (value) {
        return [
            'not',
            value
        ];
    };

    this.execute = function (data, environment) {
        return !environment.operations[data[1][0]].execute(data[1], environment);
    };
}
;function OrOperation() {
    this.make = function (operations) {
        return [
            'or',
            operations
        ];
    };

    this.execute = function (data, environment) {
        for (var i = 0; i < data[1].length; i++) {
            if (environment.operations[data[1][i][0]].execute(data[1][i], environment)) {
                return true;
            }
        }

        return false;
    };
}
;function ParameterOperation() {
    this.make = function (parameter_name) {
        return [
            'param',
            parameter_name
        ];
    };

    this.execute = function (data, environment) {
        return environment.parameters[data[1]];
    };
};function SelectOperation() {
    this.make = function (from, where) {
        return [
            'select',
            from,
            where
        ];
    };

    this.execute = function (data, environment) {
        var records = environment.operations[data[1][0]].execute(data[1], environment).filter(function (record) {
            environment.record = record;

            return environment.operations[data[2][0]].execute(data[2], environment);
        });

        environment.record = null;

        return records;
    };
}
;function TableOperation() {
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