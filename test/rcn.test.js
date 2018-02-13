/* global describe, it */
/* eslint-disable id-length, no-undefined */

const {assert} = require('chai');
const rcn = require('./../project/index');
// const rcn = require('./../index');

describe('RCN', () => {
    it('react feature', () => {
        assert(rcn('a', 0, null, undefined, true, 1, 'b').className === 'a 1 b');
    });

    it('toString method', () => {
        assert(rcn('a', 0, null, undefined, true, 1, 'b').toString() === 'a 1 b');
    });

    it('type casting', () => {
        assert(String(rcn('a', 0, null, undefined, true, 1, 'b')) === 'a 1 b');
    });

    it('keeps object keys with truthy values', () => {
        assert.equal(rcn({
            a: true,
            b: false,
            c: 0,
            d: null,
            e: undefined,
            f: 1
        }), 'a f');
    });

    it('joins arrays of class names and ignore falsy values', () => {
        assert.equal(rcn('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
    });

    it('supports heterogenous arguments', () => {
        assert.equal(rcn({a: true}, 'b', 0), 'a b');
    });

    it('should be trimmed', () => {
        assert.equal(rcn('', 'b', {}, ''), 'b');
    });

    it('returns an empty string for an empty configuration', () => {
        assert.equal(rcn({}), '');
    });

    it('supports an array of class names', () => {
        assert.equal(rcn(['a', 'b']), 'a b');
    });

    it('joins array arguments with string arguments', () => {
        assert.equal(rcn(['a', 'b'], 'c'), 'a b c');
        assert.equal(rcn('c', ['a', 'b']), 'c a b');
    });

    it('handles multiple array arguments', () => {
        assert.equal(rcn(['a', 'b'], ['c', 'd']), 'a b c d');
    });

    it('handles arrays that include falsy and true values', () => {
        assert.equal(rcn(['a', 0, null, undefined, false, true, 'b']), 'a b');
    });

    it('handles arrays that include arrays', () => {
        assert.equal(rcn(['a', ['b', 'c']]), 'a b c');
    });

    it('handles arrays that include objects', () => {
        assert.equal(rcn(['a', {b: true, c: false}]), 'a b');
    });

    it('handles deep array recursion', () => {
        assert.equal(rcn(['a', ['b', ['c', {d: true}]]]), 'a b c d');
    });
});
