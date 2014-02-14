describe('not operation', function () {
    var ops = null;
    var op = null;
    var env = null;
    var a = 'a';
    var lhs = [a];
    var key = 'not';

    beforeEach(function () {
        op = new NotOperation();
        ops = {};
        env = jasmine.createSpyObj('env', ['execute']);

        env.execute.andCallFake(function (op) {
            return ops[op[0]].execute(op, env);
        });

        ops[a] = jasmine.createSpyObj(a, ['execute']);
    });

    it('should make proper data', function () {
        var expected = [key, a];

        var actual = op.make(a);

        expect(actual).toEqual(expected);
    });

    it('should call exec on first argument', function () {
        op.execute(op.make(lhs), env);

        expect(ops[a].execute).toHaveBeenCalledWith(lhs, env);
    });

    it('when executed should be false if value was true', function () {
        var expected = false;

        ops[a].execute.andReturn(true);

        var actual = op.execute(op.make(a), env);

        expect(actual).toEqual(expected);
    });

    it('when executed should be true if value was false', function () {
        var expected = true;

        ops[a].execute.andReturn(false);

        var actual = op.execute(op.make(a), env);

        expect(actual).toEqual(expected);
    });
});
