describe('table', function () {
    var table = null;

    beforeEach(function () {
        table = new Table();
    });

    it('should properly add a table to a file', function () {
        var file = {
            tables: {
                keys: [],
                values: {}
            }
        };

        table.createTable(file, 'table1');

        expect(file).toEqual({
            tables: {
                keys: ['table1'],
                values: {
                    table1: []
                }
            }
        });
    });

    it('should be able to insert a record', function () {
        var file = {
            tables: {
                keys: [],
                values: {}
            }
        };

        table.createTable(file, 'table1');

        table.insert(file, 'table1', {a: 'b'});

        expect(file.tables.values.table1).toEqual([{a: 'b'}]);
    });
});
