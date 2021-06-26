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

import chai, { expect } from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';

import InterReactionException from 'interreaction/InterReactionException';

chai.use(sinonChai);

describe('InterReactionException Tests', () => {
  const mockCallerName = '(IGNORE)';
  const mockMessage = 'You may safely ignore this mocked test error...';
  let interReactionException;
  let interReactionExceptionName;
  let consoleErrorSpy;

  before(() => {
    consoleErrorSpy = spy(console, 'error');
    interReactionException = new InterReactionException(mockMessage, mockCallerName);
    interReactionExceptionName = interReactionException.name;
  });

  after(() => {
    consoleErrorSpy.restore();
  });

  it('Has All Expected Field Values Upon Instantiation', () => {
    expect(interReactionException.name).to.equal(interReactionExceptionName);
    expect(interReactionException.caller).to.equal(mockCallerName);
    expect(interReactionException.message).to.include(mockMessage);

    // stacktrace, internally assigned, should be present only when thrown,
    // i.e., not through direct instantiation...
    expect(interReactionException.stack).to.not.be.undefined;

    expect(consoleErrorSpy.callCount).to.equal(0);
  });

  it('Has All Expected Field Values Upon Instantiation And Logs To Console With true Passed', () => {
    // It's a specioal occassion - we want to console the error, this time (pass true as last arg)...
    interReactionException = new InterReactionException(mockMessage, mockCallerName, true);

    expect(interReactionException.name).to.equal(interReactionExceptionName);
    expect(interReactionException.caller).to.equal(mockCallerName);
    expect(interReactionException.message).to.include(mockMessage);

    // stacktrace, internally assigned, should be present only when thrown,
    // i.e., not through direct instantiation...
    expect(interReactionException.stack).to.not.be.undefined;

    expect(console.error).to.be.called;
  });

  it('Attempt To Add Property After Instantiation Should Throw Exception (frozen, by default)', () => {
    const testFunc = function() {
        interReactionException.fooBar = 'fooBar';
      };

    expect(testFunc).to.throw();
  });

  it('Does Not Include Caller In Message When No Caller Name Is Provided', () => {
    interReactionException = new InterReactionException(mockMessage);
    expect(interReactionException.message).to.include(mockMessage);
  });
});
