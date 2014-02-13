describe('table', function () {
    var table = new Table();

    it('should properly add a table to a file', function () {
        var file = {
            tables: {
                keys: [],
                values: {}
            }
        };

        table.addTable(file, 'table1');

        expect(file).toEqual({
            tables: {
                keys: ['table1'],
                values: {
                    table1: []
                }
            }
        });
    });
});
