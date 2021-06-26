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

/**
 * Converts an array to a string, with comma-delimitation,
 * and, before last value, ' and ' or ' or '
 *
 * i.e., [1, 2, 3] to '1, 2, and 3'
 * i.e., ['one', 'two', 'three'], to 'one, two, and three'
 */
const convertArrayToCommaDelimitedStringWithAndOr = function(arr, shouldEndWithOr) {
  if (!(Array.isArray(arr) && arr.length)) {
    return null;
  }

  let lastDelimiter = 'and'

  if (shouldEndWithOr === true) {
    lastDelimiter = 'or';
  }

  if (arr.length === 1) {
    return `${arr[0]}`;
  }

  if (arr.length === 2) {
    return `${arr[0]} ${lastDelimiter} ${arr[1]}`;
  }

  const endIdx = (arr.length - 1);
  const arrToJoin = arr.slice(0, endIdx);
  const lastArrItem = arr[endIdx];

  return `${arrToJoin.join(', ')}, ${lastDelimiter} ${lastArrItem}`;
};

const doesObjectContainMatchingValue = function(obj, val, shouldEnforceTypeEquality = true) {
  let hasMatchingValue = false;

  if ((typeof obj !== 'object') || (obj === null)) {
    return hasMatchingValue;
  }

  if (shouldEnforceTypeEquality !== false) {
    shouldEnforceTypeEquality = true;
  }

  Object.keys(obj).every((key) => {
    if (shouldEnforceTypeEquality) {
      if (obj[key] === val) {
        hasMatchingValue = true;

        // break every loop...
        return false;
      }
    } else {
      if (obj[key] == val) {
        hasMatchingValue = true;

        // break every loop...
        return false;
      }
    }

    // continue every loop...
    return true;
  });

  return hasMatchingValue;
};

const generateRandomWholeNumber = function (ceiling) {
  return Math.floor(
    (Math.random() * (ceiling || 10000000)) + 1
  );
};

const isAssignedNotNull = function(obj) {
  return (
    (typeof obj !== 'undefined')
    && (obj !== null)
  );
}

const isNonEmptyArray = function (arr) {
  return (
    Array.isArray(arr) && (arr.length > 0)
  );
}

const isNonEmptyObject = function (obj) {
  return (typeof obj === 'object')
    && !Array.isArray(obj)
    && (obj !== null)
    && (Object.keys(obj).length > 0);
};

const isNonEmptyString = function (str, shouldTrim) {
  if (shouldTrim !== true) {
    shouldTrim = false;
  }

  if ((typeof str === 'string') || (str instanceof String)) {
    if (str.length < 1) {
      return false;
    }

    if (shouldTrim) {
      if (str.trim().length < 1) {
        return false;
      }
    }

    return true;
  }

  return false;
};

const isNonNullObject = function(obj) {
  return (typeof obj === 'object')
    && !Array.isArray(obj)
    && (obj !== null);
};

const InterReactionUtils = Object.freeze({
  convertArrayToCommaDelimitedStringWithAndOr,
  doesObjectContainMatchingValue,
  generateRandomWholeNumber,
  isAssignedNotNull,
  isNonEmptyArray,
  isNonEmptyObject,
  isNonEmptyString,
  isNonNullObject
});

export default InterReactionUtils;
