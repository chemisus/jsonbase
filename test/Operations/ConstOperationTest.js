describe('const operation', function () {
    var operation = new ConstOperation();

    it('should make proper data', function () {
        var expected = ['const', 1];

        expect(operation.make(1)).toEqual(expected);
    });

    it('should return the value of the constant', function () {
        var environment = {};
        var data = operation.make(1);

        expect(operation.execute(data, environment)).toBe(1);
    });
});
