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
 
import InterReactionEventFactory from 'interreaction/event/InterReactionEventFactory';
import InterReactionEventNames from 'interreaction/event/InterReactionEventNames';

chai.use(sinonChai);

describe('InterReactionEventFactory Unit Tests', () => {
  let interReactionEventFactory;

  before(() => {
    interReactionEventFactory = new InterReactionEventFactory();
  });

  describe('Positive Test Cases', () => {
    it('Using Methods #setListenerCallbackOn And #dispatchEvent, With Valid Args, Callback Function Is Fired', () => {
      const callback = () => { return 'THIS WAS A TEST'; };
      const callbackSpy = spy(callback);

      interReactionEventFactory.setListenerCallbackOn(
        InterReactionEventNames.INSTANCE_READY,
        callbackSpy,
        document
      );

      interReactionEventFactory.dispatchEvent(
        InterReactionEventNames.INSTANCE_READY,
        {},
        document
      );

      expect(callbackSpy.callCount).to.equal(1);
    });

    it((
      'Using Methods #setListenerCallbackOn And #dispatchEvent, With Valid Args, Without Recipient Arg,'
      + ' Default Recipient (document) Is Assigned, Callback Function Is Fired'
    ), () => {
      const callback = () => { return 'THIS WAS A TEST'; };
      const callbackSpy = spy(callback);

      interReactionEventFactory.setListenerCallbackOn(
        InterReactionEventNames.INSTANCE_READY,
        callbackSpy
      );

      interReactionEventFactory.dispatchEvent(
        InterReactionEventNames.INSTANCE_READY,
        {}
      );

      expect(callbackSpy.callCount).to.equal(1);
    });
  });

  describe('Negative Test Cases', () => {
    it('Method #dispatchEvent Throws Exception With Undefined eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.dispatchEvent();
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });

    it('Method #dispatchEvent Throws Exception With Null eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.dispatchEvent(null);
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  
    it('Method #dispatchEvent Throws Exception With Empty String eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.dispatchEvent('');
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  
    it('Method #dispatchEvent Throws Exception With eventName Which Does Not Match One Available In InterReactionEventNames', () => {
      const testFunc = function() {
          interReactionEventFactory.dispatchEvent(`${Date.now()}`);
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });

    it('Method #dispatchEvent Throws Exception With Undefined eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.dispatchEvent();
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });

    it('Method #setListenerCallbackOn Throws Exception With Null eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.setListenerCallbackOn(null);
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  
    it('Method #setListenerCallbackOn Throws Exception With Empty String eventName', () => {
      const testFunc = function() {
          interReactionEventFactory.setListenerCallbackOn('');
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  
    it('Method #setListenerCallbackOn Throws Exception With eventName Which Does Not Match One Available In InterReactionEventNames', () => {
      const testFunc = function() {
          interReactionEventFactory.setListenerCallbackOn(`${Date.now()}`);
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });

    it('Method #setListenerCallbackOn Throws Exception With callback Which Is Not A Function', () => {
      const testFunc = function() {
          interReactionEventFactory.setListenerCallbackOn(InterReactionEventNames.INSTANCE_READY, `${Date.now()}`);
        };
  
      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  });
});
 