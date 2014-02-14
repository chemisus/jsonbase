describe('true operation', function () {
    var op = null;
    var env = null;
    var key = 'true';

    beforeEach(function () {
        op = new TrueOperation();
        env = {};
    });

    it('should make proper data', function () {
        var expected = [key];

        var actual = op.make();

        expect(actual).toEqual(expected);
    });

    it('should return true when executed', function () {
        var expected = true;

        var actual = op.execute(op.make(), env);

        expect(actual).toEqual(expected);
    });
});
