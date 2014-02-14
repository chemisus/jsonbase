describe('environment', function () {
    var ops = null;
    var env = null;

    beforeEach(function () {
        ops = {};
        env = new Environment(ops);
    });

    it('should execute an operation', function () {
        ops.test_op = jasmine.createSpyObj('test_op', ['execute']);

        var expected = 'result';
        var op = ['test_op'];

        ops.test_op.execute.andReturn(expected);

        // perform test.
        var actual = env.execute(op);

        // expect op to be called with correct params.
        expect(ops.test_op.execute).toHaveBeenCalledWith(op, env);

        // expect correct result.
        expect(actual).toBe(expected);
    });
});
