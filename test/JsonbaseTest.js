describe('jsonbase', function () {
    var jsonbase = null;
    var file = null;
    var database = null;
    var table = null;
    var migration = null;
    var constraints = null;

    beforeEach(function () {
        file = {
            tables: {
                table1: {
                    records: [
                        {id: 1}
                    ]
                }
            }
        };

        database = jasmine.createSpyObj('database', ['a']);
        table = jasmine.createSpyObj('table', ['insert']);
        constraints = jasmine.createSpyObj('constraints', ['a']);

        jsonbase = new Jsonbase(file, database, table, migration, constraints);
    });

    it('should be able to insert', function () {
        var record = {id: 2};
        var table_name = 'table1';

        jsonbase.insert(table_name, record);

        expect(table.insert).toHaveBeenCalledWith(file, constraints, table_name, record);
    });
});
