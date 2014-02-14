describe('const operation', function () {
    var ops = null;
    var op = null;
    var env = null;
    var a = 'a';
    var b = 'b';
    var lhs = [a];
    var rhs = [b];
    var key = 'const';

    beforeEach(function () {
        op = new ConstOperation();
        ops = {};
        env = jasmine.createSpyObj('env', ['execute']);

        env.execute.andCallFake(function (op) {
            return ops[op[0]].execute(op, env);
        });

        ops[a] = jasmine.createSpyObj(a, ['execute']);
        ops[b] = jasmine.createSpyObj(b, ['execute']);
    });

    it('should make proper data', function () {
        var expected = [key, a];

        var actual = op.make(a);

        expect(actual).toEqual(expected);
    });

    it('should return the value when executed', function () {
        var expected = a;

        var actual = op.execute(op.make(expected), env);

        expect(actual).toEqual(expected);
    });
});
