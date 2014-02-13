describe('not operation', function () {
    var operation = new NotOperation();
    var environment_factory = new EnvironmentFactory();

    it('should make proper data', function () {
        var expected = ['not', 'a'];

        expect(operation.make('a')).toEqual(expected);
    });

    it('should "not" the value', function () {
        var environment = environment_factory.make({}, {
            operations: {
                true: new TrueOperation()
            }
        });

        var data = operation.make(['true']);

        expect(operation.execute(data, environment)).toBeFalsy();
    });
});
