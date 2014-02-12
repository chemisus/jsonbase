/**
 *
 * @param file
 * @param {Database} database
 * @param {Table} table
 * @param {Migration} migration
 * @constructor
 */
function Jsonbase(file, database, table, migration, constraints) {
    database = database || new Database();
    table = table || new Table();
    migration = migration || new Migration();
    file = file || database.initFile('db');

    this.insert = function (table_name, record) {
        table.insert(file, constraints, table_name, record);
    };

    this.query = function () {
        
    };
}
