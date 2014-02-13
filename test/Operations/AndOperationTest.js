describe('and operation', function () {
    var operation = new AndOperation();

    it('should make proper data', function () {
        var expected = ['and', ['a', 'b']];

        expect(operation.make(['a', 'b'])).toEqual(expected);
    });

    it('should return false if an operation returns false', function () {
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

        environment.operations.a.execute.andReturn(true);
        environment.operations.b.execute.andReturn(true);
        environment.operations.c.execute.andReturn(false);

        expect(operation.execute(data, environment)).toBeFalsy();

        expect(environment.operations.a.execute).toHaveBeenCalled();
        expect(environment.operations.b.execute).toHaveBeenCalled();
        expect(environment.operations.c.execute).toHaveBeenCalled();
        expect(environment.operations.d.execute).not.toHaveBeenCalled();
    });

    it('should return true if no operation returns false', function () {
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

        environment.operations.a.execute.andReturn(true);
        environment.operations.b.execute.andReturn(true);
        environment.operations.c.execute.andReturn(true);
        environment.operations.d.execute.andReturn(true);

        expect(operation.execute(data, environment)).toBeTruthy();

        expect(environment.operations.a.execute).toHaveBeenCalled();
        expect(environment.operations.b.execute).toHaveBeenCalled();
        expect(environment.operations.c.execute).toHaveBeenCalled();
        expect(environment.operations.d.execute).toHaveBeenCalled();
    });
});
