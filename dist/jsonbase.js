function Database() {

}
;function Environment() {
    this.execute = function (data) {
        return this.operations[data[0]].execute(data, this);
    };
}
;function EnvironmentFactory(toJson, fromJson) {
    toJson = toJson || JSON.stringify;
    fromJson = fromJson || JSON.parse;

    this.toJson = function () {
        return toJson;
    };

    this.fromJson = function () {
        return fromJson;
    };

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

        var environment = new Environment();

        environment.file = file;
        environment.operations = options.operations || this.makeOperations();
        environment.constraints = options.constraints || this.makeConstraints();
        environment.database = options.database || this.makeDatabase();
        environment.table = options.table || this.makeTable();
        environment.toJson = toJson;
        environment.fromJson = fromJson;
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
            path: new PathOperation(),
            like: new LikeOperation(),
            param: new ParameterOperation()
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

    this.matches = function (table_name, values, operations) {
        operations = operations || {};
        var qb = this.queryBuilder();

        var where = [];

        for (var i in values) {
            var operation = environment.operations[operations[i]] || qb.eq;

            where.push(operation(qb.get(i), qb.const(values[i])));
        }

        return qb.execute(qb.select(
            qb.table(table_name),
            qb.and(where)
        ));
    };
}

Jsonbase.Load = function (name) {
    var environment_factory = new EnvironmentFactory();
    var file = environment_factory.fromJson()(localStorage.getItem(name) || 'null');
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
            if (!environment.execute(data[1][i])) {
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
        var lhs = environment.execute(data[1]);
        var rhs = environment.execute(data[2]);

        return  lhs == rhs;
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
        var value = environment.execute(data[1]);
        var values =  environment.execute(data[2]);

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
        var lefts =  environment.execute(data[1]);
        var rights =  environment.execute(data[2]);

        var joins = [];

        for (var i = 0; i < lefts.length; i++) {
            var left = Object.create(lefts[i]);
            left[data[4]] = [];

            for (var j = 0; j < rights.length; j++) {
                environment.record = {
                    left: lefts[i],
                    right: rights[j]
                };

                if ( environment.execute(data[3])) {
                    results.push(rights[j]);
                }
            }

            left[data[4]] = results;

            joins.push(left);
        }

        return joins;
    };
};function LeftOperation() {
    this.make = function (value) {
        return ['left', value];
    };

    this.execute = function (data, environment) {
        return environment.execute(data[1]);
    };
}
;function LikeOperation() {
    this.make = function (lhs, rhs) {
        return [
            'like',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        var lhs = environment.execute(data[1]);
        var rhs = environment.execute(data[2]);

        /**
         * @todo this needs to be better implemented.
         */
        rhs = rhs.replace(/%/g, '.*?');

        return new RegExp(rhs).test(lhs);
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
        return !environment.execute(data[1]);
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
            if (environment.execute(data[1][i])) {
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
        var records = environment.execute(data[1]).filter(function (record) {
            environment.record = record;

            return environment.execute(data[2]);
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

    this.get = function (value) {
        return environment.operations.get.make(value);
    };

    this.path = function (value) {
        return environment.operations.path.make(value);
    };

    this.const = function (value) {
        return environment.operations.const.make(value);
    };

    this.not = function (value) {
        return environment.operations.not.make(value);
    };

    this.eq = function (lhs, rhs) {
        return environment.operations.eq.make(lhs, rhs);
    };

    this.true = function () {
        return environment.operations.true.make();
    };

    this.param = function (value) {
        return environment.operations.param.make(value);
    };

    this.and = function (values) {
        return environment.operations.and.make(values);
    };

    this.or = function (values) {
        return environment.operations.or.make(values);
    };

    this.in = function (lhs, rhs) {
        return environment.operations.in.make(lhs, rhs);
    };

    this.like = function (lhs, rhs) {
        return environment.operations.like.make(lhs, rhs);
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
