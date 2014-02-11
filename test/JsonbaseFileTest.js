describe('Jsonbase File Test', function () {
    var database = null;

    beforeEach(function () {
        database = new JsonbaseFile();
    });

    it('should create a database file', function () {
        var file = database.make();

        expect(file).not.toBeNull();
    });
});
