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
        eq: new EqualOperation()
    };

    var environment = {
        file: {
            tables: tables
        },
        operations: ops
    };

    it('should be able to filter records', function () {

        var data = ops.select.make(
            ops.table.make('users'),
            ops.eq.make(
                ops.get.make('name'),
                ops.const.make('b')
            )
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([{name: 'b'}]);
    });
});
