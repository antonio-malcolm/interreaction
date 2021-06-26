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

import React from 'react';

import InterReactionComponentOne from 'component/interreaction/InterReactionComponentOne';
import InterReactionComponentToo from 'component/interreaction/InterReactionComponentToo';
import InterReactionComponentThree from 'component/interreaction/InterReactionComponentThree';
import InterReactionComponentFour from 'component/interreaction/InterReactionComponentFour';
import InterReactionComponentFive from 'component/interreaction/InterReactionComponentFive';

import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';

/**
 * InterReaction has manay, many fucking tests!
 * (425+ fucking tests, at the time of this writing, writ by one person, who is, obviously, a bit cranky.)
 *
 * Also, tests are run multiple times, to test InterReaction against multiple configuration options.
 *
 * This module provides a means of centralization and testing against the core InterReaction instantiation,
 * whilst enabling maintainability, by allowing for all other DOM integration tests to be split,
 * between '*Runner' modules, with callable #runTests functions.
 *
 * Else, we'd need to provide this centralized instantiation logic to ALL test modules (FUCK!),
 * or, we'd need a single file with 5000+ lines of code (which, this file, originally, was - FUUUUUUCK)!
 *
 * Example '*Runner' module implementation:
 *
 * const runTests = function(testProps = {}) {
 *   describe('This Describes Some Fucking Tests Run In This Module', () => {
 *     let someVarSetFromTestProps;
 *
 *     before(() => {
 *       someVarSetFromTestProps = testProps.someFuckingThing;
 *     });
 *
 *     it('This Is Some Fucking Test, I Hope It Makes You Happy', () => {
 *       // SOME FUCKING TEST LOGIC GOES HERE...
 *     });
 *
 *     it('This Is Some Other Fucking Test...', () => {
 *       // SOME MOAR FUCKING TEST LOGIC GOES HERE...
 *     });
 *   });
 * };
 *
 * const MyFuckingRunnerModule = Object.freeze({
 *     runTests
 *   });
 *
 * export default MyFuckingRunnerModule;
 */

const testContainerId = 'ir-test-container';
const singleCompContainerClassName = 'single';
const groupedCompContainerClassName = 'group';
const listedCompContainerClassName = 'list';

let testContainerLmnt;
let singleCompContainerLmnt;
let groupedCompContainerLmnt;
let listedCompContainerLmnt;

const resetDomTestContainer = function() {
    const interReaction = window.interReaction;
  
    if (typeof window.interReaction === 'object') {
      interReaction.remove({ compName: 'InterReactionComponentOne' });
      interReaction.remove({ compName: 'InterReactionComponentToo' });
      interReaction.remove({ compName: 'InterReactionComponentThree' });
      interReaction.remove({ compName: 'InterReactionComponentFour' });
      interReaction.remove({ compName: 'InterReactionComponentFive' });
    }
  
    testContainerLmnt = document.body.querySelector(
        `#${testContainerId}`
      );
  
    if (typeof testContainerLmnt !== 'undefined') {
      if (testContainerLmnt !== null) {
        document.body.removeChild(testContainerLmnt);
      }
    }
  
    testContainerLmnt = document.createElement('div');
    singleCompContainerLmnt = document.createElement('div');
    groupedCompContainerLmnt = document.createElement('div');
    listedCompContainerLmnt = document.createElement('div');
  
    singleCompContainerLmnt.className = singleCompContainerClassName;
    groupedCompContainerLmnt.className = groupedCompContainerClassName;
    listedCompContainerLmnt.className = listedCompContainerClassName;
  
    testContainerLmnt.setAttribute(
      'id',
      testContainerId
    );
  
    testContainerLmnt.appendChild(singleCompContainerLmnt);
    testContainerLmnt.appendChild(groupedCompContainerLmnt);
    testContainerLmnt.appendChild(listedCompContainerLmnt);
  
    document.body.appendChild(testContainerLmnt);
  };

const resetWindowTestProperties = function() {
    resetDomTestContainer();
  
    delete window.interReaction;
    delete window.interReactionReadyState;
  };

const customIrElementTagName = 'ir-test-tagname';

const customIrElementClassName = (process.env.WORKSPACE === 'preact')
  ? 'ir-preact'
  : 'ir-react';

const customIrElementClassNameSpaceDelimited = ' ir-test';

const initInterReaction = function(shouldIncludeConfig, configOpts) {
    if (shouldIncludeConfig !== true) {
      shouldIncludeConfig = false;
    }
  
    if (typeof configOpts !== 'object' || Array.isArray(configOpts)) {
      configOpts = {};
    }
  
    const irConfig = {};
  
    let App = class App extends React.Component {
        render() {
          return this.props.children;
        }
      };

    let componentNamesToComponents = {
        InterReactionComponentOne,
        InterReactionComponentToo,
        InterReactionComponentThree,
        InterReactionComponentFour,
        InterReactionComponentFive
      };

    if (shouldIncludeConfig === true) {
      if (configOpts.shouldApplyDefaultAppRootComp === true) {
        App = undefined;
      }

      if (configOpts.shouldApplyEmptyComponentNamesToComponents === true) {
        componentNamesToComponents = {};
      }

      if (configOpts.shouldIncludDefaultClassName === true) {
        irConfig.shouldApplyDefaultClassName = true;
      }
  
      if (configOpts.shouldIncludeCustomClassName === true) {
        irConfig.className = customIrElementClassName;
              
        if (configOpts.shouldSpaceDelimitClassName === true) {
          irConfig.className += customIrElementClassNameSpaceDelimited;
        }
      }
  
      if (configOpts.shouldIncludeCustomTagName === true) {
        irConfig.tagName = customIrElementTagName;
  
        if (configOpts.shouldMangleCustomTagName === true) {
          irConfig.tagName = 'irtest=invalid+tagname';
        }
      }
  
      irConfig.insatnceId = String(Date.now());
      irConfig.shouldEnableDebugging = true;
    }
  
    const initInterReaction = function(InterReactionFactory) {
        /**
         * InterReactionFactory#init triggers 'interReactionInstanceReady' event on the DOM document...
         */
        InterReactionFactory.init(
          App,
          componentNamesToComponents,
          irConfig
        );
      };
  
    /**
     * The same testing and vetting should apply, to both the Preact and React builds...
     */
    if (process.env.WORKSPACE === 'preact') {
      import('interreaction/InterReactionFactory').then((InterReactionFactory) => {
        initInterReaction(
          InterReactionFactory.default
        );
      }).catch((err) => {
        console.error(
          `ERROR! Could not load the InterReactionFactory, due to error:`
        );
        console.error(err);
      });
    } else {
      import('interreaction/InterReactionFactory').then((InterReactionFactory) => {
        initInterReaction(
          InterReactionFactory.default
        );
      }).catch((err) => {
        console.error(
          `ERROR! Could not load the InterReactionFactory, due to error:`
        );
        console.error(err);
      });
    }
  };

/**
 * Add all tests to be run, from imported runners, GO IN HERE...
 */
const runTests = function(testProps = {}) {
    if (typeof testProps !== 'object') {
      testProps = {};
    }
  
    if (testProps.shouldIncludeCustomTagName === true) {
      testProps.irElementTagName = customIrElementTagName;
    } else {
      testProps.irElementTagName = InterReactionConfigDefaults.TAGNAME;
    }
  
    if (testProps.shouldIncludDefaultClassName === true) {
      testProps.irElementClassNameDefault = InterReactionConfigDefaults.CLASSNAME;
    }
  
    if (testProps.shouldIncludeCustomClassName === true) {
      testProps.irElementClassNameCustom = customIrElementClassName;
            
      if (testProps.shouldSpaceDelimitClassName === true) {
        testProps.irElementClassNameCustom += customIrElementClassNameSpaceDelimited; 
      }
    }
  
    testProps = Object.freeze({
        ...testProps,
        testContainerId,
        singleCompContainerClassName,
        groupedCompContainerClassName,
        listedCompContainerClassName,
        resetDomTestContainer
      });
  
    /**
     * Test Runner Module Imports...
     * (Dynamically imported, as tests are run multiple times, with varying configuration options.)
     */
  
    import('interreaction/runner/InterReactionAssignDomIntegrationTestRunner').then((InterReactionAssignDomIntegrationTestRunner) => {
      InterReactionAssignDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionAssignDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionCreateAssignElementDomIntegrationTestRunner').then((InterReactionCreateAssignElementDomIntegrationTestRunner) => {
      InterReactionCreateAssignElementDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionCreateAssignElementDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionCreateAssignSelectorDomIntegrationTestRunner').then((InterReactionCreateAssignSelectorDomIntegrationTestRunner) => {
      InterReactionCreateAssignSelectorDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionCreateAssignSelectorDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionCreateElementDomIntegrationTestRunner').then((InterReactionCreateElementDomIntegrationTestRunner) => {
      InterReactionCreateElementDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionCreateElementDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionMountUnmountDomIntegrationTestRunner').then((InterReactionMountUnmountDomIntegrationTestRunner) => {
      InterReactionMountUnmountDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionMountUnmountDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });


    import('interreaction/runner/InterReactionRemountDomIntegrationTestRunner').then((InterReactionRemountDomIntegrationTestRunner) => {
      InterReactionRemountDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionRemountDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionRemoveDomIntegrationTestRunner').then((InterReactionRemoveDomIntegrationTestRunner) => {
      InterReactionRemoveDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionRemoveDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionReplaceDomIntegrationTestRunner').then((InterReactionReplaceDomIntegrationTestRunner) => {
      InterReactionReplaceDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionReplaceDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionToggleMountDomIntegrationTestRunner').then((InterReactionToggleMountDomIntegrationTestRunner) => {
      InterReactionToggleMountDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionToggleMountDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });

    import('interreaction/runner/InterReactionUpdateDomIntegrationTestRunner').then((InterReactionUpdateDomIntegrationTestRunner) => {
      InterReactionUpdateDomIntegrationTestRunner.default.runTests(testProps);
    }).catch((err) => {
      console.err(
        colors.red.bold(`Error! An Error occurred, while loading test runner: InterReactionUpdateDomIntegrationTestRunner`)
      );
  
      console.error(
        colors.magenta(err)
      );
    });
  };

const InterReactionConfigTestHandlerMethods = Object.freeze({
    initInterReaction,
    resetDomTestContainer,
    resetWindowTestProperties,
    runTests
  });

export default InterReactionConfigTestHandlerMethods;
