describe('false operation', function () {
    var op = null;
    var env = null;

    beforeEach(function () {
        var environment_factory = new EnvironmentFactory();

        op = new FalseOperation();
        env = environment_factory.make();
    });

    it('should make proper data', function () {
        var expected = ['false'];

        var actual = op.make();

        expect(actual).toEqual(expected);
    });

    it('should return false when executed', function () {
        var expected = false;

        var actual = op.execute(op.make(), env);

        expect(actual).toEqual(expected);
    });

    it('should return false when executed via environment', function () {
        var expected = false;

        var actual = env.execute(op.make());

        expect(actual).toEqual(expected);
    });
});
