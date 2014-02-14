describe('const operation', function () {
    var ops = null;
    var op = null;
    var env = null;
    var a = 'a';
    var b = 'b';
    var lhs = [a];
    var rhs = [b];
    var key = 'eq';

    beforeEach(function () {
        op = new EqualOperation();
        ops = {};
        env = jasmine.createSpyObj('env', ['execute']);

        env.execute.andCallFake(function (op) {
            return ops[op[0]].execute(op, env);
        });

        ops[a] = jasmine.createSpyObj(a, ['execute']);
        ops[b] = jasmine.createSpyObj(b, ['execute']);
    });

    it('should make proper data', function () {
        var expected = [key, a, b];

        var actual = op.make(a, b);

        expect(actual).toEqual(expected);
    });

    it('should call exec on first argument', function () {
        op.execute(op.make(lhs, rhs), env);

        expect(ops[a].execute).toHaveBeenCalledWith(lhs, env);
    });

    it('should call exec on second argument', function () {
        op.execute(op.make(lhs, rhs), env);

        expect(ops[b].execute).toHaveBeenCalledWith(rhs, env);
    });

    it('when executed should be true when equal', function () {
        var expected = true;

        ops[a].execute.andReturn(true);
        ops[b].execute.andReturn(true);

        var actual = op.execute(op.make(a, b), env);

        expect(actual).toEqual(expected);
    });

    it('when executed should be false when not equal', function () {
        var expected = false;

        ops[a].execute.andReturn(true);
        ops[b].execute.andReturn(false);

        var actual = op.execute(op.make(a, b), env);

        expect(actual).toEqual(expected);
    });
});
