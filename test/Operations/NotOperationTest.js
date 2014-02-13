describe('not operation', function () {
    var operation = new NotOperation();

    it('should make proper data', function () {
        var expected = ['not', 'a'];

        expect(operation.make('a')).toEqual(expected);
    });

    it('should "not" the value', function () {
        var environment = {
            operations: {
                true: new TrueOperation()
            }
        };

        var data = operation.make(['true']);

        expect(operation.execute(data, environment)).toBeFalsy();
    });
});
