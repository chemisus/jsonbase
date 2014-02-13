describe('equal operation', function () {
    var operation = new EqualOperation();
    var environment_factory = new EnvironmentFactory();

    it('should make proper data', function () {
        var expected = ['eq', 'lhs', 'rhs'];

        expect(operation.make('lhs', 'rhs')).toEqual(expected);
    });

    it('should return true if the values are equal', function () {
        var environment = environment_factory.make({}, {
            operations: {
                lhs: jasmine.createSpyObj('lhs', ['execute']),
                rhs: jasmine.createSpyObj('rhs', ['execute'])
            }
        });

        var data = operation.make(['lhs'], ['rhs']);

        environment.operations.lhs.execute.andReturn(5);
        environment.operations.rhs.execute.andReturn(5);

        expect(operation.execute(data, environment)).toBeTruthy();

        expect(environment.operations.lhs.execute).toHaveBeenCalled();
        expect(environment.operations.rhs.execute).toHaveBeenCalled();
    });

    it('should return false if the values are not equal', function () {
        var environment = environment_factory.make({}, {
            operations: {
                lhs: jasmine.createSpyObj('lhs', ['execute']),
                rhs: jasmine.createSpyObj('rhs', ['execute'])
            }
        });

        var data = operation.make(['lhs'], ['rhs']);

        environment.operations.lhs.execute.andReturn(4);
        environment.operations.rhs.execute.andReturn(5);

        expect(operation.execute(data, environment)).toBeFalsy();

        expect(environment.operations.lhs.execute).toHaveBeenCalled();
        expect(environment.operations.rhs.execute).toHaveBeenCalled();
    });
});
