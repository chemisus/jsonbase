describe('parameter operation', function () {
    var operation = new ParameterOperation();

    it('should properly make the operation data', function () {
        var expected = ['param', 'name'];

        expect(operation.make('name')).toEqual(expected);
    });

    it('should return the value of the parameter when executed', function () {
        var value = 'parameter value';
        var data = operation.make('name');
        var environment = {parameters: {name: value}};

        expect(operation.execute(data, environment)).toBe(value);
    });
});
