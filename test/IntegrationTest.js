describe('integration test', function () {
    var tables = {
        users: [
            {name: 'a'},
            {name: 'b'},
            {name: 'c'},
            {name: 'd'}
        ]
    };

    var ops = {
        select: new SelectOperation(),
        table: new TableOperation(),
        const: new ConstOperation(),
        get: new GetOperation(),
        eq: new EqualOperation(),
        or: new OrOperation(),
        and: new AndOperation(),
        not: new NotOperation()
    };

    var environment = {
        file: {
            tables: tables
        },
        operations: ops
    };

    it('should be able to filter to a single record', function () {

        var data = ops.select.make(
            ops.table.make('users'),
            ops.eq.make(
                ops.get.make('name'),
                ops.const.make('b')
            )
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'b'}]);
    });

    it('should be able to filter to multiple records using or', function () {

        var data = ops.select.make(
            ops.table.make('users'),
            ops.or.make([
                ops.eq.make(
                    ops.get.make('name'),
                    ops.const.make('b')
                ),
                ops.eq.make(
                    ops.get.make('name'),
                    ops.const.make('c')
                )
            ])
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'b'}, {name: 'c'}]);
    });

    it('should be able to filter to multiple records using and with not', function () {

        var data = ops.select.make(
            ops.table.make('users'),
            ops.and.make([
                ops.not.make(
                    ops.eq.make(
                        ops.get.make('name'),
                        ops.const.make('c')
                    )
                )
            ])
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'a'}, {name: 'b'}, {name: 'd'}]);
    });
});
