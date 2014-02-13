function JoinOperation() {
    this.make = function (left, right, on, as) {
        return [
            'join',
            left,
            right,
            on,
            as
        ];
    };

    this.clone = function (value) {
        var cloned = {};

        for (var k in value) {
            cloned[k] = value[k];
        }

        return cloned;
    };

    this.execute = function (data, environment) {
        var lefts = environment.execute(data[1]);
        var rights = environment.execute(data[2]);

        var results = [];

        for (var i = 0; i < lefts.length; i++) {
            var left = this.clone(lefts[i]);
            left[data[4]] = [];

            environment.pushLeft(left);

            for (var j = 0; j < rights.length; j++) {
                var right = this.clone(rights[j]);

                environment.pushRight(right);

                if (environment.execute(data[3])) {
                    left[data[4]].push(right);
                }

                environment.popRight();
            }

            environment.popLeft();

            results.push(left);
        }

        return results;
    };
}