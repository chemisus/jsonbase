describe('true operation', function () {
    var operation = new TrueOperation();

    it('should make proper data', function () {
        var expected = ['true'];
        var data = operation.make();

        expect(data).toEqual(expected);
    });

    it('should return true', function () {
        var value = true;
        var data = operation.make();
        var environment = {};

        expect(operation.execute(data, environment)).toBe(value);
    });
});
