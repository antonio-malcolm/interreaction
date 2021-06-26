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

import InterReactionException from 'interreaction/InterReactionException';
import InterReactionUtils from 'interreaction/InterReactionUtils';

import InterReactionEventNames from 'interreaction/event/InterReactionEventNames';

const InterReactionEventFactory = function() {

  /**
   * Internal methods...
   */

  const validateEventName = function(eventName) {
    if (typeof window.CustomEvent !== 'function') {
      throw new InterReactionException(
        'Web Components Custom Event API is not present on window!'
        + ' Check module: WebComponentsLoader, to ensure polyfill is loaded, in absence of native browser support.',
        'InterReactionEventFactory'
      );
    }
  
    if (!InterReactionUtils.isNonEmptyString(eventName, true)) {
      throw new InterReactionException(
        'Event name (String) is a required arg for constructor! Refer to module: InterReactionEventNames.',
        'InterReactionEventFactory'
      );
    }
  
    if (!InterReactionUtils.doesObjectContainMatchingValue(InterReactionEventNames, eventName)) {
      throw new InterReactionException(
        'Event name (String) must be one of value found in: InterReactionEventNames!',
        'InterReactionEventFactory'
      );
    }
  };

  const InterReactionEvent = function(eventName, detail) {
    validateEventName(eventName);

    return new CustomEvent(
      eventName,
      {
        'cancelable': true,
        detail
      }
    );
  };

  /**
   * Exposed Methods...
   */

  const dispatchEvent = function(eventName, detail, dispatcher) {
    if (!InterReactionUtils.isAssignedNotNull(dispatcher)) {
      dispatcher = document;
    }

    dispatcher.dispatchEvent(
      new InterReactionEvent(eventName, detail)
    );
  };

  const setListenerCallbackOn = function(eventName, callback, recipient) {
    validateEventName(eventName);

    if (typeof callback !== 'function') {
      throw new InterReactionException(
        'Event callback must be a function!',
        'InterReactionEventFactory'
      );
    }

    if (!InterReactionUtils.isAssignedNotNull(recipient)) {
      recipient = document;
    }

    recipient.addEventListener(
      eventName,
      function(evt) {
        callback(evt)
      }
    );
  };

  return Object.freeze({
    dispatchEvent,
    setListenerCallbackOn
  });
};

export default InterReactionEventFactory;
