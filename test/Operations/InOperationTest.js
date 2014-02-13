describe('in operation', function () {
    var operation = new InOperation();

    it('should make proper data', function () {
        var expected = ['in', 'c', ['a', 'b']];

        expect(operation.make('c', ['a', 'b'])).toEqual(expected);
    });

    it('should return true if the value exists in the array', function () {
        var value = ['a'];
        var array = ['1', '2', '3'];
        var data = operation.make(value, array);
        var environment = {
            operations: {
                a: jasmine.createSpyObj('a', ['execute'])
            }
        };

        environment.operations.a.execute.andReturn('2');

        expect(operation.execute(data, environment)).toBeTruthy();
    });

    it('should return false if the value does not exist in the array', function () {
        var value = ['a'];
        var array = ['1', '2', '3'];
        var data = operation.make(value, array);
        var environment = {
            operations: {
                a: jasmine.createSpyObj('a', ['execute'])
            }
        };

        environment.operations.a.execute.andReturn('5');

        expect(operation.execute(data, environment)).toBeFalsy();
    });
});
