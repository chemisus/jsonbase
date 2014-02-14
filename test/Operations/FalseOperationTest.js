describe('false operation', function () {
    var operation = new FalseOperation();

    it('should make proper data', function () {
        var expected = ['false'];
        var data = operation.make();

        expect(data).toEqual(expected);
    });

    it('should return false', function () {
        var value = false;
        var data = operation.make();
        var environment = {};

        expect(operation.execute(data, environment)).toBe(value);
    });
});
