/**
 *
 * @param {Storage} storage
 * @param {JsonbaseFile} database
 * @constructor
 */
function JsonbaseStorage(storage, database) {
    this.save = function (file) {
        storage.setItem(file.name, file);
    };

    this.load = function (file_name) {
        var file = storage.getItem(file_name) || database.make();

        return file;
    };
}
