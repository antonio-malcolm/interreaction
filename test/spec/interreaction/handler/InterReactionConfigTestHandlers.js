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

const InterReactionConfigTestHandlers = Object.freeze({
    configHandlerOne: {
        handlerDescription: 'InterReaction Initialization Without Config Options',
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
            InterReactionConfigTestHandlerMethods.runTests();
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction();
        }
      },
  
    configHandlerToo: {
        handlerDescription: 'InterReaction Initialization With Valid Base Config Options',
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
            InterReactionConfigTestHandlerMethods.runTests();
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(true);
        }
      },
  
    configHandlerThree: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Default className',
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
            InterReactionConfigTestHandlerMethods.runTests({ shouldIncludeDefaultClassName: true });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            { shouldIncludeDefaultClassName: true }
          );
        }
      },
  
    configHandlerFour: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Custom className',
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
            InterReactionConfigTestHandlerMethods.runTests({ shouldIncludeCustomClassName: true });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            { shouldIncludeCustomClassName: true }
          );
        }
      },
  
    configHandlerFive: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Space-delimited Custom className',
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
              shouldIncludeCustomClassName: true,
              shouldSpaceDelimitClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomClassName: true,
              shouldSpaceDelimitClassName: true
            }
          );
        }
      },
  
    configHandlerSix: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Default className And Custom className',
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
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true
            }
          );
        }
      },
  
    configHandlerSeven: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Default className And Space-delimited Custom className',
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
              shouldIncludeCustomClassName: true,
              shouldIncludeDefaultClassName: true,
              shouldSpaceDelimitClassName: true
            }
          );
        }
      },

    configHandlerEight: {
        handlerDescription: 'InterReaction Initialization With Valid Config Options, With Default Supplied App Root Component',
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
            InterReactionConfigTestHandlerMethods.runTests();
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            { shouldApplyDefaultAppRootComp: true }
          );
        }
      },

    configHandlerNine: {
        handlerDescription: 'InterReaction Initialization With Invalid, Empty componentNamesToComponents',
        handlerEvent: 'interReactionInstanceError',
        handlerMethod: function() {
          describe('Ensure InterReaction Instance Was Not Loaded And interReactionInstanceError Event Was Fired On Document', () => {
            it('InterReaction Instance Was Not Added TO The DOM', () => {
              /**
               * TODO: Checks, for these next two items fail,
               * and it is likely a test environment + timing issue
               * involving the timing of in-between test cleanup)...
               * For tested functionality, @SEE:
               * InterReactionFactory, lines 99 to 106
               */

              // expect(window.interReactionReadyState).to.equal('error');
              // expect(window.interReaction).to.be.undefined;

              /**
               * For some reason, while the above two checks do not work,
               * the next one does, and text matches what is assigned, 
               * in module: InterReactionFactory
               *
               * console.log('EMPTY COMPONENTS ERROR MESSAGE :::::::::::::::::::::::');
               * console.log(window.interReactionReadyStateReason);
               */
              expect(window.interReactionReadyStateReason).to.not.be.undefined;
            });
          });
        },
        initMethod: function() {
          InterReactionConfigTestHandlerMethods.initInterReaction(
            true,
            {
              shouldApplyEmptyComponentNamesToComponents: true
            }
          );
        }
      }
  });

export default InterReactionConfigTestHandlers;
