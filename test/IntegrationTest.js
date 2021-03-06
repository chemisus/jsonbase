describe('integration test', function () {

    var environment_factory = null;
    var jsonbase = null;
    var environment = null;
    var ops = null;

    beforeEach(function () {
//        environment_factory = new EnvironmentFactory();
//        jsonbase = new Jsonbase(environment_factory.make());
        jsonbase = Jsonbase.Load('test');

        environment = jsonbase.environment();
        ops = environment.operations;

        jsonbase.createTable('users');
        jsonbase.insert('users', {name: 'a'});
        jsonbase.insert('users', {name: 'b'});
        jsonbase.insert('users', {name: 'c'});
        jsonbase.insert('users', {name: 'd'});
    });

    it('should be able to filter to a single record', function () {

        var data = ops.select.make(
            ops.table.make('users'),
            ops.eq.make(
                ops.get.make('name'),
                ops.const.make('b')
            )
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'b'}
        ]);
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

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'b'},
            {name: 'c'}
        ]);
    });

    it('should be able to filter to multiple records using and with not', function () {

        var users = [
            {name: 'a', type: 1},
            {name: 'b', type: 1},
            {name: 'c', type: 1},
            {name: 'd', type: 2},
            {name: 'e', type: 2},
            {name: 'f', type: 2},
        ];

        var data = ops.select.make(
            ops.const.make(users),
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

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'd', type: 2},
            {name: 'f', type: 2}
        ]);
    });

    it('should be able to do a subquery', function () {
        var users = [
            {name: 'a', type: 1},
            {name: 'b', type: 1},
            {name: 'c', type: 1},
            {name: 'd', type: 2},
            {name: 'e', type: 2},
            {name: 'f', type: 2},
        ];

        var data = ops.select.make(
            ops.select.make(
                ops.const.make(users),
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

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'd', type: 2},
            {name: 'f', type: 2}
        ]);
    });

    it('should work with in', function () {
        var data = ops.select.make(
            ops.table.make('users'),
            ops.in.make(
                ops.get.make('name'),
                ops.const.make(['b', 'c'])
            )
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'b'},
            {name: 'c'}
        ]);
    });

    it('should work with in and a sub select', function () {
        var data = ops.select.make(
            ops.table.make('users'),
            ops.in.make(
                ops.get.make('name'),
                ops.select.make(
                    ops.const.make(['b', 'c']),
                    ops.true.make()
                )
            )
        );

        expect(ops[data[0]].execute(data, environment)).toEqual([
            {name: 'b'},
            {name: 'c'}
        ]);
    });

    it('should be able to easily build a query', function () {
        var qb = jsonbase.queryBuilder();

        expect(qb.execute(qb.select(qb.table('users'), qb.true()))).toEqual(environment.file.tables.values.users);
    });

    it('should be able to query for matches of an object', function () {
        expect(jsonbase.matches('users', {name: 'b'})).toEqual([{name: 'b'}]);
    });

    it('should be able to join', function () {
        var lefts = [
            {id: 1},
            {id: 2},
            {id: 3}
        ];

        var rights = [
            {id: 1, left: 1},
            {id: 2, left: 1},
            {id: 3, left: 2},
        ];

        var qb = jsonbase.queryBuilder();

        expect(qb.execute(qb.join(
            qb.const(lefts),
            qb.const(rights),
            qb.eq(
                qb.right(qb.get('left')),
                qb.left(qb.get('id'))
            ),
            'rights'
        ))).toEqual([
                {id: 1, rights: [
                    {id: 1, left: 1},
                    {id: 2, left: 1},
                ]},
                {id: 2, rights: [
                    {id: 3, left: 2},
                ]},
                {id: 3, rights: []},
            ]);

    });
});
