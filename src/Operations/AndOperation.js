function AndOperation(record, op) {
    for (var i in op.value) {
        if (!this[op.value[i].op](record, op.value[i])) {
            return false;
        }
    }

    return true;
}
