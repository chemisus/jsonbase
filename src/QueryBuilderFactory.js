function QueryBuilderFactory() {
    this.make = function (env) {
        return new QueryBuilder(env);
    };
}
