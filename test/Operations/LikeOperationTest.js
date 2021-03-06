describe('like operation', function () {
    var operation = new LikeOperation();
    var environment_factory = new EnvironmentFactory();

    it('should make proper data', function () {
        var expected = ['like', 'lhs', 'rhs'];

        expect(operation.make('lhs', 'rhs')).toEqual(expected);
    });

    it('should return true if lhs is like rhs', function () {
        var environment = environment_factory.make({}, {
            operations: {
                lhs: jasmine.createSpyObj('lhs', ['execute']),
                rhs: jasmine.createSpyObj('rhs', ['execute'])
            }
        });

        var data = operation.make(['lhs'], ['rhs']);

        environment.operations.lhs.execute.andReturn('a b c d e');
        environment.operations.rhs.execute.andReturn('%a%c%e%');

        expect(operation.execute(data, environment)).toBeTruthy();

        expect(environment.operations.lhs.execute).toHaveBeenCalled();
        expect(environment.operations.rhs.execute).toHaveBeenCalled();
    });

    it('should return false if lhs is not like rhs', function () {
        var environment = environment_factory.make({}, {
            operations: {
                lhs: jasmine.createSpyObj('lhs', ['execute']),
                rhs: jasmine.createSpyObj('rhs', ['execute'])
            }
        });

        var data = operation.make(['lhs'], ['rhs']);

        environment.operations.lhs.execute.andReturn('a b c d e');
        environment.operations.rhs.execute.andReturn('abc');

        expect(operation.execute(data, environment)).toBeFalsy();

        expect(environment.operations.lhs.execute).toHaveBeenCalled();
        expect(environment.operations.rhs.execute).toHaveBeenCalled();
    });
});
