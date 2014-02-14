describe('filter operation', function () {
    var environment_factory = new EnvironmentFactory();
    var environment = null;
    var operation = null;

    beforeEach(function () {
        operation = new FilterOperation();
        environment = environment_factory.make();
    });

    it('should make proper data', function () {
        expect(operation.make('a', 'b')).toEqual(['filter', 'a', 'b']);
    });

    it('should filter the array using true', function () {
        var data = operation.make(
            environment.operations.const.make(['a', 'b']),
            environment.operations.true.make()
        );

        expect(environment.execute(data)).toEqual(['a', 'b']);
    });

    it('should filter the array using false', function () {
        var data = operation.make(
            environment.operations.const.make(['a', 'b']),
            environment.operations.false.make()
        );

        expect(environment.execute(data)).toEqual([]);
    });
});
