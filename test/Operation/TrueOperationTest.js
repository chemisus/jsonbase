describe('true operation', function () {
    var op = null;
    var env = null;

    beforeEach(function () {
        var environment_factory = new EnvironmentFactory();

        op = new TrueOperation();
        env = environment_factory.make();
    });

    it('should make proper data', function () {
        var expected = ['true'];

        var actual = op.make();

        expect(actual).toEqual(expected);
    });

    it('should return true when executed', function () {
        var expected = true;

        var actual = op.execute(op.make(), env);

        expect(actual).toEqual(expected);
    });

    it('should return true when executed via environment', function () {
        var expected = true;

        var actual = env.execute(op.make());

        expect(actual).toEqual(expected);
    });
});
