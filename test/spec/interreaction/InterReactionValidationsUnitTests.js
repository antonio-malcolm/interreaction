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

chai.use(sinonChai);

import InterReactionElementFactory from 'interreaction/element/InterReactionElementFactory';

import InterReactionValidations from 'interreaction/InterReactionValidations';
import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';

const testValidationCallerName = 'InterReactionValidationsUnitTests';
const testCompName = 'TestReactComp';
const testCompId = 'TestReactComp';
const testCompGroup = 'TestReactComp';

describe('InterReactionValidations Unit Tests', () => {
  describe('Positive Test Cases', () => {
    let interReactionValidations;
    let interReactionElementFactory;
    let consoleWarnSpy;
  
    before(() => {
      interReactionValidations = new InterReactionValidations(true);

    interReactionElementFactory = new InterReactionElementFactory(
        InterReactionConfigDefaults.TAGNAME,
        InterReactionConfigDefaults.INSTANCE_ID,
        [ InterReactionConfigDefaults.CLASSNAME ]
      );
    });
  
    beforeEach(() => {
      consoleWarnSpy = spy(console, 'warn');
    });
  
    afterEach(() => {
      consoleWarnSpy.restore()
    });

    /**
     * InterReactionValidations#doDetailsContainMinimumExpectedProperties
     */
    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          undefined,
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is null'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          null,
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Empty Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          {},
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Not An Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          [],
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is undefined And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: undefined },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is null And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: null },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is Empty String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: '' },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is Not A String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: 1234 },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is Set And compList is Also Set'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          {
            compName: 'SOME_COMP_NAME',
            compList: []
          },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compList Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compList: undefined },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compList Is null'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: null },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compList Is Empty'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compName: [] },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compList Is Not An Array'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compList: 1234 },
          testValidationCallerName,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn, Returns false,'
      + ' When details compGroup Is undefined And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compGroup: undefined },
          testValidationCallerName,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn, Returns false,'
      + ' When details compGroup Is null And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compGroup: null },
          testValidationCallerName,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn, Returns false,'
      + ' When details compGroup Is Empty String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compGroup: '' },
          testValidationCallerName,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn, Returns false,'
      + ' When details compGroup Is Not A String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          { compGroup: 1234 },
          testValidationCallerName,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainMinimumExpectedProperties, With shouldEnableDebugging Set To true, Outputs console#warn, Returns false'
      + ' When details compName Is Set And compGroup is Also Set And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainMinimumExpectedProperties(
          {
            compName: 'SOME_COMP_NAME',
            compGroup: 'SOME_COMP_GROUP'
          },
          testValidationCallerName,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    /**
     * InterreactionValidations#doDetailsContainRequiredProperties
     */

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          undefined,
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is undefined And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          undefined,
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is null'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          null,
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is null And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          null,
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Empty Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {},
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Empty Object And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {},
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Not An Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          [],
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details Is Empty Object And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {},
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is undefined And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: undefined },
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is null And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: null },
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is Empty String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: '' },
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compName Is Not A String And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To false'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 1234 },
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });




    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          undefined,
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, Returns true, When componentNamesToComponents Is undefined'
      + ' And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          undefined,
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.true;
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is null'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          null,
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, Returns true, When componentNamesToComponents Is null'
      + ' And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          null,
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.true;
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is Empty Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          {},
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, Returns true, When componentNamesToComponents Is Empty Object'
      + ' And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          {},
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.true;
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is Not An Object'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          [],
          testValidationCallerName,
          false,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, Returns true, When componentNamesToComponents Is Not An Object'
      + ' And shouldAllowCompGroupAsRequiredInsteadOfName Is Set To true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: 'SOME_COMP_NAME' },
          [],
          testValidationCallerName,
          false,
          true
        );

      expect(validationResult).to.be.true;
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compId is undefined And isCompIdRequired is set to true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          { compName: testCompName },
          { testCompName: {} },
          testValidationCallerName,
          true,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compId is null And isCompIdRequired is set to true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {
            compName: testCompName,
            compId: null
          },
          { testCompName: {} },
          testValidationCallerName,
          true,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compId is Empty String And isCompIdRequired is set to true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {
            compName: testCompName,
            compId: ''
          },
          { testCompName: {} },
          testValidationCallerName,
          true,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doDetailsContainRequiredProperties, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When details compId is Not A String And isCompIdRequired is set to true'
    ), () => {
      const validationResult = interReactionValidations.doDetailsContainRequiredProperties(
          {
            compName: testCompName,
            compId: 1234
          },
          { testCompName: {} },
          testValidationCallerName,
          true,
          false
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    /**
     * InterReactionValidations#doesInterReactionElementContainRequiredAttributes
     */

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When InterReactionElement Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          undefined,
          { 'TEST_COMP_NAME': {} }
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When InterReactionElement Is null'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          null,
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When InterReactionElement Is Not An InterReactionElement'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          'NOT_AN_IR_ELEMENT',
          { 'TEST_COMP_NAME': {} },
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is undefined'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId,
            compGroup: testCompGroup
          }),
          undefined,
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is null'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId,
            compGroup: testCompGroup
          }),
          null,
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Is Empty Object'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId,
            compGroup: testCompGroup
          }),
          {},
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #doesInterReactionElementContainRequiredAttributes, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Returns false, When componentNamesToComponents Does Not Have a Field Matching InterReaction Attribute comp-name'
    ), () => {
      const validationResult = interReactionValidations.doesInterReactionElementContainRequiredAttributes(
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId,
            compGroup: testCompGroup
          }),
          { 'SOME_RANDOM_COMP_NAME': {} },
          testValidationCallerName
        );

      expect(validationResult).to.be.false;
      expect(consoleWarnSpy.callCount).to.equal(1);
    });
  });
});
