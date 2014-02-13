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
        not: new NotOperation(),
        true: new TrueOperation()
    };

    var environment = {
        file: {
            tables: tables
        },
        operations: ops
    };

    beforeEach(function () {
        tables.users = [
            {name: 'a'},
            {name: 'b'},
            {name: 'c'},
            {name: 'd'}
        ];
    });

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

        tables.users = [
            {name: 'a', type: 1},
            {name: 'b', type: 1},
            {name: 'c', type: 1},
            {name: 'd', type: 2},
            {name: 'e', type: 2},
            {name: 'f', type: 2},
        ];

        var data = ops.select.make(
            ops.table.make('users'),
            ops.and.make([
                ops.not.make(
                    ops.eq.make(
                        ops.get.make('name'),
                        ops.const.make('e')
                    )
                ),
                ops.eq.make(
                    ops.get.make('type'),
                    ops.const.make(2)
                )
            ])
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'd', type: 2}, {name: 'f', type: 2}]);
    });

    it('should be able to do a subquery', function () {
        tables.users = [
            {name: 'a', type: 1},
            {name: 'b', type: 1},
            {name: 'c', type: 1},
            {name: 'd', type: 2},
            {name: 'e', type: 2},
            {name: 'f', type: 2},
        ];

        var data = ops.select.make(
            ops.select.make(
                ops.table.make('users'),
                ops.true.make()
            ),
            ops.and.make([
                ops.not.make(
                    ops.eq.make(
                        ops.get.make('name'),
                        ops.const.make('e')
                    )
                ),
                ops.eq.make(
                    ops.get.make('type'),
                    ops.const.make(2)
                )
            ])
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'd', type: 2}, {name: 'f', type: 2}]);
    });
});
