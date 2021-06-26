/**
 * Copyrighht 2021 to present, Antonio Malcolm.
 * All rights reserved.
 *
 * This source code file is a part of interreaction
 * (A.K.A., "interReaction", or "InterReaction").
 * (A.K.A., "interpreaction", "interPreaction", or "InterPreaction").
 *
 * This source code is licensed under the BSD 3-Clause license,
 * and is subject to the terms of the BSD 3-Clause license,
 * found in the LICENSE file, in the root directory of this project.
 * If a copy of the BSD 3-Clause license cannot be found,
 * as part of this project, you can obtain one, at:
 * https://opensource.org/licenses/BSD-3-Clause
 */

import { expect } from 'chai';

import InterReactionUtils from 'interreaction/InterReactionUtils';

describe('InterReactionUtils Unit Tests', () => {
  it('convertArrayToCommaDelimitedStringWithAndOr', () => {
    const testStr = 'this is a test string';
    const testStrDelimitedWithAnd = 'this, is, a, test, and string';
    const testStrDelimitedWithOr = 'this, is, a, test, or string';
    let testArr;

    expect(InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr)).to.be.null;

    testArr = [];

    expect(InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr)).to.be.null;

    testArr = [ 'this' ];

    expect(InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr)).to.equal('this');

    testArr = [ 'this', 'test' ];

    expect(InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr)).to.equal('this and test');

    testArr = [ 'this', 'test' ];

    expect(InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr, true)).to.equal('this or test');

    testArr = testStr.split(' ');

    expect(
        InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr)
      ).to.equal(testStrDelimitedWithAnd);

    expect(
        InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr, false)
      ).to.equal(testStrDelimitedWithAnd);

    expect(
        InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(testArr, true)
      ).to.equal(testStrDelimitedWithOr);
  });

  it('doesObjectContainMatchingValue', () => {
    expect(InterReactionUtils.doesObjectContainMatchingValue()).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue(null)).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue(undefined)).to.be.false;

    expect(InterReactionUtils.doesObjectContainMatchingValue(2)).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue('srt')).to.be.false;

    expect(InterReactionUtils.doesObjectContainMatchingValue(true)).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue(false)).to.be.false;

    expect(InterReactionUtils.doesObjectContainMatchingValue([])).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue({})).to.be.false;

    expect(InterReactionUtils.doesObjectContainMatchingValue({ test: 2 }, '2')).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue({ test: 2 }, '2', false)).to.be.true;
    expect(InterReactionUtils.doesObjectContainMatchingValue({ test: 2 }, '2', true)).to.be.false;
    expect(InterReactionUtils.doesObjectContainMatchingValue({ test: 'foo' }, 'foo')).to.be.true;
  });

  it('generateRandomWholeNumber', () => {
    expect(InterReactionUtils.generateRandomWholeNumber()).to.be.greaterThan(0);
    expect(InterReactionUtils.generateRandomWholeNumber(100)).to.be.greaterThan(0);
    expect(InterReactionUtils.generateRandomWholeNumber(100)).to.be.lessThan(101);
  });

  it('isAssignedNotNull', () => {
    expect(InterReactionUtils.isAssignedNotNull()).to.be.false;
    expect(InterReactionUtils.isAssignedNotNull(null)).to.be.false;
    expect(InterReactionUtils.isAssignedNotNull(undefined)).to.be.false;

    expect(InterReactionUtils.isAssignedNotNull(2)).to.be.true;
    expect(InterReactionUtils.isAssignedNotNull('srt')).to.be.true;

    expect(InterReactionUtils.isAssignedNotNull(true)).to.be.true;
    expect(InterReactionUtils.isAssignedNotNull(false)).to.be.true;

    expect(InterReactionUtils.isAssignedNotNull([])).to.be.true;
    expect(InterReactionUtils.isAssignedNotNull({})).to.be.true;
  });

  it('isNonEmptyArray', () => {
    expect(InterReactionUtils.isNonEmptyArray()).to.be.false;
    expect(InterReactionUtils.isNonEmptyArray(null)).to.be.false;
    expect(InterReactionUtils.isNonEmptyArray(undefined)).to.be.false;

    expect(InterReactionUtils.isNonEmptyArray(2)).to.be.false;
    expect(InterReactionUtils.isNonEmptyArray('srt')).to.be.false;

    expect(InterReactionUtils.isNonEmptyArray(true)).to.be.false;
    expect(InterReactionUtils.isNonEmptyArray(false)).to.be.false;

    expect(InterReactionUtils.isNonEmptyArray([])).to.be.false;
    expect(InterReactionUtils.isNonEmptyArray({})).to.be.false;

    expect(InterReactionUtils.isNonEmptyArray([ 1 ])).to.be.true;
  });

  it('isNonEmptyObject', () => {
    expect(InterReactionUtils.isNonEmptyObject()).to.be.false;
    expect(InterReactionUtils.isNonEmptyObject(null)).to.be.false;
    expect(InterReactionUtils.isNonEmptyObject(undefined)).to.be.false;

    expect(InterReactionUtils.isNonEmptyObject(2)).to.be.false;
    expect(InterReactionUtils.isNonEmptyObject('srt')).to.be.false;

    expect(InterReactionUtils.isNonEmptyObject(true)).to.be.false;
    expect(InterReactionUtils.isNonEmptyObject(false)).to.be.false;

    expect(InterReactionUtils.isNonEmptyObject([])).to.be.false;
    expect(InterReactionUtils.isNonEmptyObject({})).to.be.false;

    expect(InterReactionUtils.isNonEmptyObject({ test: 'foo' })).to.be.true;
  });

  it('isNonEmptyString', () => {
    expect(InterReactionUtils.isNonEmptyString()).to.be.false;
    expect(InterReactionUtils.isNonEmptyString(null)).to.be.false;
    expect(InterReactionUtils.isNonEmptyString(undefined)).to.be.false;

    expect(InterReactionUtils.isNonEmptyString(2)).to.be.false;

    expect(InterReactionUtils.isNonEmptyString(true)).to.be.false;
    expect(InterReactionUtils.isNonEmptyString(false)).to.be.false;

    expect(InterReactionUtils.isNonEmptyString([])).to.be.false;
    expect(InterReactionUtils.isNonEmptyString({})).to.be.false;

    expect(InterReactionUtils.isNonEmptyString([1])).to.be.false;
    expect(InterReactionUtils.isNonEmptyString({ test: 'foo' })).to.be.false;

    expect(InterReactionUtils.isNonEmptyString('srt')).to.be.true;

    expect(InterReactionUtils.isNonEmptyString('', true)).to.be.false;
    expect(InterReactionUtils.isNonEmptyString('', false)).to.be.false;
    expect(InterReactionUtils.isNonEmptyString('   ', true)).to.be.false;
    expect(InterReactionUtils.isNonEmptyString('   ', false)).to.be.true;
  });

  it('isNonNullObject', () => {
    expect(InterReactionUtils.isNonNullObject()).to.be.false;
    expect(InterReactionUtils.isNonNullObject(null)).to.be.false;
    expect(InterReactionUtils.isNonNullObject(undefined)).to.be.false;

    expect(InterReactionUtils.isNonNullObject(2)).to.be.false;
    expect(InterReactionUtils.isNonNullObject('srt')).to.be.false;

    expect(InterReactionUtils.isNonNullObject(true)).to.be.false;
    expect(InterReactionUtils.isNonNullObject(false)).to.be.false;

    expect(InterReactionUtils.isNonNullObject([])).to.be.false;
    expect(InterReactionUtils.isNonNullObject({})).to.be.true;

    expect(InterReactionUtils.isNonNullObject({ test: 'foo' })).to.be.true;
  });
});
