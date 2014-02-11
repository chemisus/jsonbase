describe('file', function () {
    var file = null;

    beforeEach(function () {
        file = new Database();
    });

    it('should create a file', function () {
        var database = file.initFile();

        expect(database).not.toBeNull();
    });
});
