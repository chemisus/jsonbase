describe('in operation', function () {
    var operation = new InOperation();

    it('should make proper data', function () {
        var expected = ['in', 'c', ['a', 'b']];

        expect(operation.make('c', ['a', 'b'])).toEqual(expected);
    });

    it('should return true if the value exists in the array', function () {
        var value = ['value'];
        var array = ['array'];
        var data = operation.make(value, array);
        var environment = {
            operations: {
                value: jasmine.createSpyObj('value', ['execute']),
                array: jasmine.createSpyObj('array', ['execute'])
            }
        };

        environment.operations.value.execute.andReturn('2');
        environment.operations.array.execute.andReturn(['1', '2', '3']);

        expect(operation.execute(data, environment)).toBeTruthy();
    });

    it('should return false if the value does not exist in the array', function () {
        var value = ['value'];
        var array = ['array'];

        var data = operation.make(value, array);
        var environment = {
            operations: {
                value: jasmine.createSpyObj('value', ['execute']),
                array: jasmine.createSpyObj('array', ['execute'])
            }
        };

        environment.operations.value.execute.andReturn('5');
        environment.operations.array.execute.andReturn(['1', '2', '3']);

        expect(operation.execute(data, environment)).toBeFalsy();
    });
});
