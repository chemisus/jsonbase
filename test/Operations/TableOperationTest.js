describe('table operation', function () {
    var operation = new TableOperation();

    it('should properly make the operation data', function () {
        var expected = ['table', 'users'];

        expect(operation.make('users')).toEqual(expected);
    });

    it('should return all the records in a table', function () {
        var users = ['a', 'b', 'c'];
        var data = operation.make("users");
        var environment = {file: {tables: {users: users}}};

        expect(operation.execute(data, environment)).toBe(users);
    });
});
