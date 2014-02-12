function Constraint() {
    this.preTableInsert = function (database, constraint_data, table_name, inserting) {
    };

    this.postTableInsert = function (database, constraint_data, table_name, inserted) {
    };

    this.preTableUpdate = function (database, constraint_data, table_name, old, updating) {
    };

    this.postTableUpdate = function (database, constraint_data, table_name, old, updated) {
    };

    this.preTableDelete = function (database, constraint_data, table_name, deleting) {
    };

    this.postTableDelete = function (database, constraint_data, table_name, deleted) {
    };

    this.preDatabaseInsert = function (database, constraint_data, table_name, inserting) {
    };

    this.postDatabaseInsert = function (database, constraint_data, table_name, inserted) {
    };

    this.preDatabaseUpdate = function (database, constraint_data, table_name, old, updating) {
    };

    this.postDatabaseUpdate = function (database, constraint_data, table_name, old, updated) {
    };

    this.preDatabaseDelete = function (database, constraint_data, table_name, deleting) {
    };

    this.postDatabaseDelete = function (database, constraint_data, table_name, deleted) {
    };
}
;function Database() {
    this.initFile = function (database_name) {
        return {
            name: database_name,
            migration: 0,
            constraints: {
            },
            constraint_keys: [
            ],
            tables: {
            }
        };
    };

    this.saveFile = function (file) {
        localStorage.setItem(file.name, angular.toJson(file));
    };

    this.loadFile = function (file_name) {
        if (!localStorage.getItem(file_name)) {
            return null;
        }

        return angular.fromJson(localStorage.getItem(file_name));
    };

    this.dropDatabase = function (file_name) {
        localStorage.removeItem(file_name);
    };

    this.hasTable = function (file, table_name) {
        return file.tables.hasOwnProperty(table_name);
    };

    this.migrateDatabase = function (file, constraints, migrations) {
        for (; file.migration < migrations.length; file.migration++) {
            migrations[file.migration].up(file, constraints);
        }

        this.saveFile(file);
    };

    this.addConstraint = function (file, constraint) {
        file.constraints[constraint.name] = constraint;
        file.constraint_keys.push(constraint.name);
    };

    /**
     *
     * @returns {QueryBuilder}
     */
    this.query = function (file, constraints, table_name, operations) {
        var query = new Query(operations);

        return new QueryBuilder(file, constraints, query, query.make(table_name), operations);
    };
}
;function GenerateConstraint(type) {
    angular.extend(this, new Constraint());

    this.create = function (database, name, table_name, field_name) {
        new Database().addConstraint(database, {
            name: name,
            type: type,
            table_name: table_name,
            field_name: field_name,
            current: 1,
            step: 1
        });
    };

    this.preTableInsert = function (database, constraint_data, table_name, inserting) {
        if (table_name !== constraint_data.table_name) {
            return;
        }

        if (!inserting.hasOwnProperty(constraint_data.field_name)) {
            inserting[constraint_data.field_name] = constraint_data.current;
            constraint_data.current += constraint_data.step;
        }
    };
}
;/**
 *
 * @param file
 * @param {Database} database
 * @param {Table} table
 * @param {Migration} migration
 * @constructor
 */
function Jsonbase(file, database, table, migration, constraints) {
    database = database || new Database();
    table = table || new Table();
    migration = migration || new Migration();
    file = file || database.initFile('db');

    var operations = {
        const: new ConstOperation(),
        get: new GetOperation(),
        eq: new EqualOperation(),
        gt: new GreaterThanOperation(),
        gte: new GreaterThanOrEqualOperation(),
        lt: new LessThanOperation(),
        lte: new LessThanOrEqualOperation(),
        not: new NotOperation(),
        and: new AndOperation(),
        or: new OrOperation(),
        select: new SelectOperation(),
        from: new FromOperation()
    };

    this.operations = function () {
        return operations;
    };

    this.insert = function (table_name, record) {
        table.insert(file, constraints, table_name, record);
    };

    this.select = function (table_name, value) {
        var qb = new QueryBuilder(operations);
        var q = new Query(operations);

        if (!value) {
            return file.tables[table_name].records;
        }

        var query = qb.select(file.tables[table_name].records, value);

        return q.execute(query, operations);
    };

    this.sql = function (table_name, value) {
        var qb = new QueryBuilder(operations);
        var q = new Query(operations);

        if (!value) {
            return file.tables[table_name].records;
        }

        var query = qb.select(qb.from(file, table_name), value);

        return q.toSql(query, operations);
    };
}
;function Migration() {
    this.create = function (up, down) {
        return {
            up: up || function () {

            },
            down: down || function () {

            }
        };
    };
}
;function AndOperation() {
    this.make = function (values) {
        return {
            op: 'and',
            value: values
        };
    };

    this.execute = function (record, current) {
        for (var i in current.value) {
            if (!operations[current.value[i].op].execute(record, current.value[i])) {
                return false;
            }
        }

        return true;
    };
}
;function ConstOperation() {
    this.make = function (value) {
        return {
            op: 'const',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return current.value;
    };

    this.toSql = function (current, operations) {
        return current.value;
    };
}
;function EqualOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'eq',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) === operations[current.rhs.op].execute(record, current.rhs, operations);
    };

    this.toSql = function (current, operations) {
        return operations[current.lhs.op].toSql(current.lhs, operations) +
            " = " +
            operations[current.rhs.op].toSql(current.rhs, operations);
    };
}
;function FromOperation() {
    this.make = function (file, table_name) {
        return {
            op: 'from',
            file: file,
            table: table_name
        };
    };

    this.execute = function (record, current, operations) {
        return current.file.tables[current.table_name].records;
    };

    this.toSql = function (current, operations) {
        return "from " + current.table;
    };
}
;function GetOperation() {
    this.make = function (value) {
        return {
            op: 'get',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return record[current.value];
    };

    this.toSql = function (current, operations) {
        return current.value;
    };
}
;function GreaterThanOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'gt',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) > operations[current.rhs.op].execute(record, current.rhs, operations);
    };
}
;function GreaterThanOrEqualOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'gte',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) >= operations[current.rhs.op].execute(record, current.rhs, operations);
    };
}
;function LessThanOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'lt',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) < operations[current.rhs.op].execute(record, current.rhs, operations);
    };
}
;function LessThanOrEqualOperation() {
    this.make = function (lhs, rhs) {
        return {
            op: 'lte',
            lhs: lhs,
            rhs: rhs
        };
    };

    this.execute = function (record, current, operations) {
        return operations[current.lhs.op].execute(record, current.lhs, operations) <= operations[current.rhs.op].execute(record, current.rhs, operations);
    };
}
;function NotOperation() {
    this.make = function (value) {
        return {
            op: 'not',
            value: value
        };
    };

    this.execute = function (record, current, operations) {
        return !operations[current.value.op].execute(record, current.value, operations);
    };
}
;function OrOperation() {
    this.make = function (values) {
        return {
            op: 'or',
            value: values
        };
    };

    this.execute = function (record, current, operations) {
        for (var i in current.value) {
            if (operations[current.value[i].op].execute(record, current.value[i], operations)) {
                return true;
            }
        }

        return false;
    };
}
;function SelectOperation() {
    this.make = function (records, value) {
        return {
            op: 'select',
            records: records,
            value: value
        };
    };

    this.execute = function (record, op, operations) {
        return op.records.filter(function (record) {
            return operations[op.value.op].execute(record, op.value, operations);
        });
    };

    this.toSql = function (current, operations) {
        return "select * " +
            operations[current.records.op].toSql(current.records, operations) +
            " where " +
            operations[current.value.op].toSql(current.value, operations);
    };
}
;function Query() {

    this.make = function (table_name) {
        return {
            from: table_name
        };
    };

    this.execute = function (current, operations) {
        return operations[current.op].execute(null, current, operations);
    };

    this.toSql = function (current, operations) {
        return operations[current.op].toSql(current, operations);
    };
}
;function QueryBuilder(operations) {
    this.const = function (value) {
        return operations.const.make(value);
    };

    this.get = function (value) {
        return operations.get.make(value);
    };

    this.eq = function (lhs, rhs) {
        return operations.eq.make(lhs, rhs);
    };

    this.gt = function (lhs, rhs) {
        return operations.gt.make(lhs, rhs);
    };

    this.gte = function (lhs, rhs) {
        return operations.gte.make(lhs, rhs);
    };

    this.lt = function (lhs, rhs) {
        return operations.lt.make(lhs, rhs);
    };

    this.lte = function (lhs, rhs) {
        return operations.lte.make(lhs, rhs);
    };

    this.or = function (values) {
        return operations.or.make(values);
    };

    this.and = function (values) {
        return operations.and.make(values);
    };

    this.not = function (value) {
        return operations.not.make(value);
    };

    this.select = function (records, value) {
        return operations.select.make(records,  value);
    };

    this.from = function (file, table_name) {
        return operations.from.make(file, table_name);
    };
}
;function SaveDatabaseConstraint(type) {
    angular.extend(this, new Constraint());

    this.create = function (database, name) {
        new Database().addConstraint(database, {
            name: name,
            type: type
        });
    };

    this.postDatabaseInsert = function (database, constraint_data, table_name, inserted) {
        new Database().saveFile(database);
    };

    this.postDatabaseUpdate = function (database, constraint_data, table_name, old, updated) {
        new Database().saveFile(database);
    };

    this.postDatabaseDelete = function (database, constraint_data, table_name, deleted) {
        new Database().saveFile(database);
    };
}
;function Table() {
    this.create = function (database, table_name) {
        database.tables[table_name] = {
            name: table_name,
            records: []
        };
    };

    this.getConstraintData = function (database, i) {
        var constraint_key = database.constraint_keys[i];
        return database.constraints[constraint_key];
    };

    this.getConstraint = function (database, constraint_data, constraints) {
        var constraint_type = constraint_data.type;
        return constraints[constraint_type];
    };

    this.callConstraint = function (method, database, constraints, table_name, record) {
        for (var i in database.constraint_keys) {
            var constraint_data = this.getConstraintData(database, i);
            var constraint = this.getConstraint(database, constraint_data, constraints);

            constraint[method](database, constraint_data, table_name, record);
        }
    };

    this.select = function (database, constraints, table_name, query) {
        query = {
            from: 'table1',
            where: {
                op: 'or',
                value: [
                    {
                        op: 'eq',
                        field: 'id',
                        value: {
                            op: 'const',
                            value: 9
                        }
                    },
                    {
                        op: 'eq',
                        field: 'id',
                        value: {
                            op: 'const',
                            value: 5
                        }
                    }
                ]
            }
        };
    };

    this.insert = function (database, constraints, table_name, record) {
        var table = database.tables[table_name];

        this.callConstraint('preDatabaseInsert', database, constraints, table_name, record);
        this.callConstraint('preTableInsert', database, constraints, table_name, record);

        table.records.push(record);

        this.callConstraint('postTableInsert', database, constraints, table_name, record);
        this.callConstraint('postDatabaseInsert', database, constraints, table_name, record);
    };

    this.delete = function (database, constraints, table_name, record) {
        var table = database.tables[table_name];

        this.callConstraint('preDatabaseDelete', database, constraints, table_name, record);
        this.callConstraint('preTableDelete', database, constraints, table_name, record);

        var index = table.records.indexOf(record);

        if (index !== -1) {
            table.records.splice(index, 1);
        }

        this.callConstraint('postTableDelete', database, constraints, table_name, record);
        this.callConstraint('postDatabaseDelete', database, constraints, table_name, record);
    };
}
;function UniqueConstraint(type) {
    angular.extend(this, new Constraint());

    this.create = function (database, name, table_name, field_name) {
        new Database().addConstraint(database, {
            name: name,
            type: type,
            table_name: table_name,
            field_name: field_name
        });
    };

    this.preTableInsert = function (database, constraint_data, table_name, inserting) {
        if (table_name !== constraint_data.table_name) {
            return;
        }

        var found = database.tables[table_name].records.filter(function (record) {
            return record[constraint_data.field_name] == inserting[constraint_data.field_name];
        });

        if (found.length > 0) {
            throw 'fails unique constraint';
        }
    };
}
