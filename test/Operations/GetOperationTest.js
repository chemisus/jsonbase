describe('get operation', function () {
    var operation = new GetOperation();

    it('should make proper data', function () {
        var expected = ['get', 'id'];

        expect(operation.make('id')).toEqual(expected);
    });

    it('should return the value of the field in the current record', function () {
        var environment = {record: {id: 1}};
        var data = operation.make('id');

        expect(operation.execute(data, environment)).toBe(1);
    });
});
