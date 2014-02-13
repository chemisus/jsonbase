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

    this.execute = function (data, environment) {
        var lefts =  environment.execute(data[1]);
        var rights =  environment.execute(data[2]);

        var joins = [];

        for (var i = 0; i < lefts.length; i++) {
            var left = Object.create(lefts[i]);
            left[data[4]] = [];

            for (var j = 0; j < rights.length; j++) {
                environment.record = {
                    left: lefts[i],
                    right: rights[j]
                };

                if ( environment.execute(data[3])) {
                    results.push(rights[j]);
                }
            }

            left[data[4]] = results;

            joins.push(left);
        }

        return joins;
    };
}