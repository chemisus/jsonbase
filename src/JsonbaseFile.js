function JsonbaseFile() {
    this.make = function (name) {
        return {
            name: name,
            tables: {
                keys: [],
                values: {},
                objects: {}
            },
            constraints: {
                keys: [],
                values: {},
                objects: {}
            }
        };
    };
}
