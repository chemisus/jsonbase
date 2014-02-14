describe('const operation', function () {
    var op = null;
    var env = null;

    beforeEach(function () {
        var environment_factory = new EnvironmentFactory();

        op = new ConstOperation();
        env = environment_factory.make();
    });

    it('should make proper data', function () {
        var expected = ['const', 'a'];

        var actual = op.make('a');

        expect(actual).toEqual(expected);
    });

    it('should return the value when executed', function () {
        var expected = 'a';

        var actual = op.execute(op.make(expected), env);

        expect(actual).toEqual(expected);
    });

    it('should return the value when executed via environment', function () {
        var expected = 'a';

        var actual = env.execute(op.make(expected));

        expect(actual).toEqual(expected);
    });
});
