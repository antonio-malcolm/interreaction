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

const InterReactionCustomTagNameConfigTestHandlers = Object.freeze({
    configHandlerOne: {
        handlerDescription: 'InterReaction Initialization With Valid Base Config Options, With Custom tagName',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
    
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
    
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            { shouldIncludeCustomTagName: true }
          );
        }
      },
  
    configHandlerToo: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom tagName, With Default className',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
      
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
      
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
              shouldIncludeDefaultClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldIncludeDefaultClassName: true
            }
          );
        }
      },
  
    configHandlerThree: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom tagName, With Custom className',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
      
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
      
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true
            }
          );
        }
      },
  
    configHandlerFour: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom tagName, With Space-delimited Custom className',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
      
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
      
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldSpaceDelimitClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldSpaceDelimitClassName: true
            }
          );
        }
      },
  
    configHandlerFive: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom tagName, With Default className And Custom className',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
      
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
      
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true
            }
          );
        }
      },
  
    configHandlerSix: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom tagName, With Default className And Space-delimited Custom className',
        handlerEvent: 'interReactionInstanceReady',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Loaded And interReactionInstanceReady Event Was Fired On Document', () => {
            it('InterReaction Instance Was Added TO The DOM', () => {
              const interReaction = window.interReaction;
      
              expect(window.interReactionReadyState).to.equal('ready');
        
              expect(interReaction).to.be.an('object');      
              expect(Object.values(interReaction).length).to.equal(11);
        
              expect(interReaction.createElement).to.be.a('function');
              expect(interReaction.createAssignToDomElement).to.be.a('function');
              expect(interReaction.createAssignToDomSelector).to.be.a('function');
              expect(interReaction.assign).to.be.a('function');
              expect(interReaction.mount).to.be.a('function');
              expect(interReaction.unmount).to.be.a('function');
              expect(interReaction.remount).to.be.a('function');
              expect(interReaction.remove).to.be.a('function');
              expect(interReaction.replace).to.be.a('function');
              expect(interReaction.toggleMount).to.be.a('function');
              expect(interReaction.update).to.be.a('function');
            });
          });
      
          describe('InterReaction DOM Integration Tests', () => {
            InterReactionConfigTestHandlerMethods.runTests({
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true,
              shouldSpaceDelimitClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true,
              shouldSpaceDelimitClassName: true
            }
          );
        }
      },

    configHandlerSeven: {
        handlerDescription: 'InterReaction Initialization With Invalid Custom Tag Name Config Option',
        handlerEvent: 'interReactionInstanceError',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Not Loaded And interReactionInstanceError Event Was Fired On Document', () => {
            it('InterReaction Instance Was Not Added TO The DOM', () => {
              expect(window.interReactionReadyState).to.equal('error');
              expect(window.interReaction).to.be.undefined;
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomTagName: true,
              shouldMangleCustomTagName: true
            }
          );
        }
      }
  });

export default InterReactionCustomTagNameConfigTestHandlers;
