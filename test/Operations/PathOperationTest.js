describe('path operation', function () {
    var operation = new PathOperation();

    it('should make proper data', function () {
        var expected = ['path', 'a.b.c'];

        expect(operation.make('a.b.c')).toEqual(expected);
    });

    it('should retrieve the correct data', function () {
        var data = operation.make('a.b.c');
        var environment = {record: {a: {b: {c: 'd'}}}};

        expect(operation.execute(data, environment)).toBe('d');
    });
});
