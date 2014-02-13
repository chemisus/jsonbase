function LikeOperation() {
    this.make = function (lhs, rhs) {
        return [
            'like',
            lhs,
            rhs
        ];
    };

    this.execute = function (data, environment) {
        var lhs = environment.execute(data[1]);
        var rhs = environment.execute(data[2]);

        /**
         * @todo this needs to be better implemented.
         */
        rhs = rhs.replace(/%/g, '.*?');

        return new RegExp(rhs).test(lhs);
    };
}
