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
 
const InterReactionException = function (
  message,
  caller,
  shouldConsoleError
) {
  if (shouldConsoleError !== true) {
    shouldConsoleError = false;
  }

  this.name = 'InterReactionException';
  this.caller = caller;
  this.message = `ERROR! ${this.name}: ${this.caller ? `${this.caller}: ` : ''} ${message}`;
  this.stack = (new Error(this.message)).stack;
  this.stacktrace = this.stack;

  if (shouldConsoleError) {
    console.error(this.message);
  }

  Object.freeze(this);
};

module.exports = InterReactionException;
