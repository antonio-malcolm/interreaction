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

import InterReactionConfigTestHandlerMethods from 'interreaction/handler/InterReactionConfigTestHandlerMethods';
import InterReactionConfigTestHandlers from 'interreaction/handler/InterReactionConfigTestHandlers';
import InterReactionCustomTagNameConfigTestHandlers from 'interreaction/handler/InterReactionCustomTagNameConfigTestHandlers';

describe('InterReaction DOM Integration Tests', () => {
  /**
   * Test against this variable, to ensure imported tests ran!
   *
   * Also, if a test fails, based on configuration input, but an event was triggered,
   * we can more easily sort which configuration option led to the failure,
   * by looking at the count, in the final test output, by also checking this
   * variable, against the expected end count,.
   */
  let interReactionEventTriggerCount = 0;

  let interReactionConfigTestHandlerKeys = Object.keys(InterReactionConfigTestHandlers);
  let interReactionCustomTagNameConfigTestHandlerKeys = Object.keys(InterReactionCustomTagNameConfigTestHandlers);

  const interReactionEventTriggerCountExpected = (
      interReactionConfigTestHandlerKeys.length
      + interReactionCustomTagNameConfigTestHandlerKeys.length
    );

  interReactionConfigTestHandlerKeys.forEach(function(configHandlerKey) {
    let handlerDescription = InterReactionConfigTestHandlers[configHandlerKey].handlerDescription;
    let handlerEvent = InterReactionConfigTestHandlers[configHandlerKey].handlerEvent;
    let initMethod = InterReactionConfigTestHandlers[configHandlerKey].initMethod;

    let handlerMethod = function() {
        InterReactionConfigTestHandlers[configHandlerKey].handlerMethod();
        document.removeEventListener(handlerEvent, handlerMethod);
        InterReactionConfigTestHandlerMethods.resetWindowTestProperties();

        interReactionEventTriggerCount += 1;
      };

    describe(handlerDescription, function() {
      document.addEventListener(handlerEvent, handlerMethod);
      initMethod();
    });
  });

  interReactionCustomTagNameConfigTestHandlerKeys.forEach(function(configHandlerKey) {
    let handlerDescription = InterReactionConfigTestHandlers[configHandlerKey].handlerDescription;
    let handlerEvent = InterReactionConfigTestHandlers[configHandlerKey].handlerEvent;
    let initMethod = InterReactionConfigTestHandlers[configHandlerKey].initMethod;

    let handlerMethod = function() {
        InterReactionConfigTestHandlers[configHandlerKey].handlerMethod();
        document.removeEventListener(handlerEvent, handlerMethod);
        InterReactionConfigTestHandlerMethods.resetWindowTestProperties();

        interReactionEventTriggerCount += 1;
      };

    describe(handlerDescription, function() {
      document.addEventListener(handlerEvent, handlerMethod);
      initMethod();
    });
  });

  it('Ensure InterReaction Instance Loaded, interReactionInstanceReady Event Was Triggered On Document, And That tests Ran', () => {
    expect(interReactionEventTriggerCount).to.equal(interReactionEventTriggerCountExpected);
  });
});
