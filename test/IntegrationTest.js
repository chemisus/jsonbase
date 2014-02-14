describe('integration test', function () {
    var env = null;

    beforeEach(function () {
        var environment_factory = new EnvironmentFactory();

        env = environment_factory.make();
    });

    it('should be able execute a query', function () {
        var qb = env.queryBuilder();

        expect(env.execute(
            qb.not(
                qb.eq(
                    qb.true(),
                    qb.false()
                )
            )
        )).toBeTruthy();
    });
});
