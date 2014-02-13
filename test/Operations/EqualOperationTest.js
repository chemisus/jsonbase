describe('equal operation', function () {
    var operation = new EqualOperation();

    it('should make proper data', function () {
        var expected = ['eq', 'lhs', 'rhs'];

        expect(operation.make('lhs', 'rhs')).toEqual(expected);
    });

    it('should return true if the values are equal', function () {
        var environment = {
            operations: {
                lhs: jasmine.createSpyObj('lhs', ['execute']),
                rhs: jasmine.createSpyObj('rhs', ['execute'])
            }
        };

        var data = operation.make(['lhs'], ['rhs']);

        environment.operations.lhs.execute.andReturn(5);
        environment.operations.rhs.execute.andReturn(5);

        expect(operation.execute(data, environment)).toBeTruthy();

        expect(environment.operations.lhs.execute).toHaveBeenCalled();
        expect(environment.operations.rhs.execute).toHaveBeenCalled();
    });
});