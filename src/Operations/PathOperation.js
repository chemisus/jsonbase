function PathOperation() {
    this.make = function (value) {
        return [
            'path',
            value
        ];
    };

    this.execute = function (data, environment) {
        var path = data[1].split('.');
        var result = environment.record;

        for (var i = 0; i < path.length; i++) {
            result = result[path[i]];
        }

        return result;
    };
}