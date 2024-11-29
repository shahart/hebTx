const hebTx = require('./hebTx');

describe('Ex1', () => {
    test('sanity', () => {
        expect(hebTx('שיאפלוספלוס')).toBe('ahtpkuxpkux');
    });
});