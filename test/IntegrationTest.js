describe('integration test', function () {
    var env = null;
    var qb = null;

    beforeEach(function () {
        var environment_factory = new EnvironmentFactory();

        env = environment_factory.make();
        qb = env.queryBuilder();
    });

    it('should be able to execute query 1', function () {
        expect(env.execute(
            qb.not(
                qb.eq(
                    qb.true(),
                    qb.false()
                )
            )
        )).toBeTruthy();
    });

    it('should be able to execute query 2', function () {
        expect(env.execute(
            qb.eq(
                qb.not(qb.true()),
                qb.const(false)
            )
        )).toBeTruthy();
    });

    it('should be able to execute query 3', function () {
        var records = ['a', 'b', 'c'];

        expect(env.execute(
            qb.map(
                qb.const(records),
                qb.record()
            )
        )).toEqual(records);
    });
});
