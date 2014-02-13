describe('select operation', function () {
    var operation = new SelectOperation();
    var environment_factory = new EnvironmentFactory();

    it('should make proper data', function () {
        var expected = ['select', ['table', 'users'], ['true']];

        expect(operation.make(['table', 'users'], ['true'])).toEqual(expected);
    });

    it('should call from and where operations', function () {
        var users = ['a', 'b', 'c'];

        var environment = environment_factory.make({tables: {users: {records: users}}}, {
            operations: {
                table: jasmine.createSpyObj('table_operation', ['execute']),
                true: jasmine.createSpyObj('table_operation', ['execute'])
            }
        });

        var data = operation.make(['table', 'users'], ['true']);

        environment.operations.table.execute.andReturn(users);
        environment.operations.true.execute.andReturn(true);

        expect(operation.execute(data, environment)).toEqual(users);

        expect(environment.operations.table.execute).toHaveBeenCalled();
        expect(environment.operations.true.execute).toHaveBeenCalled();
    });
});
