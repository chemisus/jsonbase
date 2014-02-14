function QueryBuilder(env) {
    var keys = env.availableOperations();

    for (var i = 0; i < keys.length; i++) {
        this[keys[i]] = env.operation(keys[i]).make;
    }
}
