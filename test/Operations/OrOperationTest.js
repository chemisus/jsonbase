describe('or operation', function () {
    var operation = new OrOperation();

    it('should make proper data', function () {
        var expected = ['or', ['a', 'b']];

        expect(operation.make(['a', 'b'])).toEqual(expected);
    });

    it('should return true if an operation returns true', function () {
        var environment = {
            operations: {
                a: jasmine.createSpyObj('a', ['execute']),
                b: jasmine.createSpyObj('b', ['execute']),
                c: jasmine.createSpyObj('c', ['execute']),
                d: jasmine.createSpyObj('d', ['execute'])
            }
        };

        var values = [['a'], ['b'], ['c'], ['d']];
        var data = operation.make(values);

        environment.operations.a.execute.andReturn(false);
        environment.operations.b.execute.andReturn(false);
        environment.operations.c.execute.andReturn(true);

        expect(operation.execute(data, environment)).toBeTruthy();

        expect(environment.operations.a.execute).toHaveBeenCalled();
        expect(environment.operations.b.execute).toHaveBeenCalled();
        expect(environment.operations.c.execute).toHaveBeenCalled();
        expect(environment.operations.d.execute).not.toHaveBeenCalled();
    });

    it('should return false if no operation returns true', function () {
        var environment = {
            operations: {
                a: jasmine.createSpyObj('a', ['execute']),
                b: jasmine.createSpyObj('b', ['execute']),
                c: jasmine.createSpyObj('c', ['execute']),
                d: jasmine.createSpyObj('d', ['execute'])
            }
        };

        var values = [['a'], ['b'], ['c'], ['d']];
        var data = operation.make(values);

        environment.operations.a.execute.andReturn(false);
        environment.operations.b.execute.andReturn(false);
        environment.operations.c.execute.andReturn(false);
        environment.operations.d.execute.andReturn(false);

        expect(operation.execute(data, environment)).toBeFalsy();

        expect(environment.operations.a.execute).toHaveBeenCalled();
        expect(environment.operations.b.execute).toHaveBeenCalled();
        expect(environment.operations.c.execute).toHaveBeenCalled();
        expect(environment.operations.d.execute).toHaveBeenCalled();
    });
});
