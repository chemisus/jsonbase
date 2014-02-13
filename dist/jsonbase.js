function Database() {

}
;function EnvironmentFactory() {
    this.make = function (file, options) {
        file = file || {
            constraints: {
                keys: [],
                values: {}
            },
            tables: {
                keys: [],
                values: {}
            }
        };

        options = options || {};

        var environment = {
            file: file,
            operations: options.operations || this.makeOperations(),
            constraints: options.constraints || this.makeConstraints(),
            database: options.database || this.makeDatabase(),
            table: options.table || this.makeTable()
        };

        environment.query_builder = this.makeQueryBuilder(environment);

        return environment;
    };

    this.makeOperations = function () {
        return {
            select: new SelectOperation(),
            table: new TableOperation(),
            const: new ConstOperation(),
            get: new GetOperation(),
            eq: new EqualOperation(),
            or: new OrOperation(),
            and: new AndOperation(),
            not: new NotOperation(),
            true: new TrueOperation(),
            in: new InOperation(),
            path: new PathOperation()
        };
    };

    this.makeConstraints = function () {
    };

    this.makeDatabase = function () {
        return new Database();
    };

    this.makeTable = function () {
        return new Table();
    };

    this.makeQueryBuilder = function (environment) {
        return new QueryBuilder(environment);
    };
}
;function Jsonbase(environment) {
    this.save = function () {
        localStorage.setItem(environment.name, environment.toJson(environment.file));
    };

    this.reload = function () {
        environment.file = environment.fromJson(localStorage.getItem(environment.name) || 'null');
    };

    this.environment = function () {
        return environment;
    };

    this.file = function () {
        return environment.file;
    };

    this.queryBuilder = function () {
        return environment.query_builder;
    };

    this.createTable = function (table_name) {
        environment.table.createTable(this.file(), table_name);
    };

    this.insert = function (table_name, record) {
        environment.table.insert(this.file(), table_name, record);
    };
}

Jsonbase.Load = function (name) {

    var environment_factory = new EnvironmentFactory();
    var file = JSON.parse(localStorage.getItem(name) || 'null');
    var environment = environment_factory.make(file);

    return new Jsonbase(environment);
};
;function AndOperation() {
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
;function InOperation() {
    this.make = function (value, array) {
        return [
            'in',
            value,
            array
        ];
    };

    this.execute = function (data, environment) {
        var value = environment.operations[data[1][0]].execute(data[1], environment);
        var values = environment.operations[data[2][0]].execute(data[2], environment);

        for (var i = 0; i < values.length; i++) {
            if (value === values[i]) {
                return true;
            }
        }

        return false;
    };
}
;function JoinOperation() {
    this.make = function (left, right, on, as) {
        return [
            'join',
            left,
            right,
            on,
            as
        ];
    };

    this.execute = function (data, environment) {
        var lefts = environment.operations[data[1][0]].execute(data[1], environment);
        var rights = environment.operations[data[2][0]].execute(data[2], environment);

        var joins = [];

        for (var i = 0; i < lefts.length; i++) {
            var left = Object.create(lefts[i]);
            left[data[4]] = [];

            for (var j = 0; j < rights.length; j++) {
                environment.record = {
                    left: lefts[i],
                    right: rights[j]
                };

                if (environment.operations[data[3][0]].execute(data[3], environment)) {
                    results.push(rights[j]);
                }
            }

            left[data[4]] = results;

            joins.push(left);
        }

        return joins;
    };
};function NotOperation() {
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
};function PathOperation() {
    this.make = function (value) {
        return [
            'path',
            value
        ];
    };

    this.execute = function (data, environment) {
        var path = data[1].split('.');
        var result = environment.record;

        for (var i = 0; i < path.length; i++) {
            result = result[path[i]];
        }

        return result;
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
        return environment.file.tables.values[data[1]];
    };
};function TrueOperation() {
    this.make = function () {
        return ['true'];
    };

    this.execute = function (data, environment) {
        return true;
    };
};function QueryBuilder(environment) {
    this.select = function (from, where) {
        return environment.operations.select.make(from, where);
    };

    this.table = function (name) {
        return environment.operations.table.make(name);
    };

    this.true = function () {
        return environment.operations.true.make();
    };

    this.execute = function (query) {
        return environment.operations[query[0]].execute(query, environment);
    };
}
;function Table() {
    this.createTable = function (file, table_name) {
        file.tables.keys.push(table_name);
        file.tables.values[table_name] = [];
    };

    this.insert = function (file, table_name, record) {
        file.tables.values[table_name].push(record);
    };
}
