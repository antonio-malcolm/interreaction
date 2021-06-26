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

import React from 'react';

import InterReactionElementFactory from 'interreaction/element/InterReactionElementFactory';
import InterReactionPortalsManager from 'interreaction/portal/InterReactionPortalsManager';
import InterReactionPortalsRenderer from 'interreaction/portal/InterReactionPortalsRenderer';

import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';

chai.use(sinonChai);

const TestReactComp = function() {
    return <React.Fragment />;
  };

const testCompName = 'TestReactComp';
const testCompId = 'TestReactComp';
const testCompGroup = 'TestReactComp';

describe('InterReactionPortalsManger Unit Tests', () => {
  let interReactionElementFactory;

  before(() => {
    interReactionElementFactory = new InterReactionElementFactory(
        InterReactionConfigDefaults.TAGNAME,
        InterReactionConfigDefaults.INSTANCE_ID,
        [ InterReactionConfigDefaults.CLASSNAME ]
      );
  });

  /**
   * Focused on the negative tests, in this module,
   * as positive outcomes are largely covered, by integration test module:
   * InterReactionDomIntegrationTests
   */ 
  describe('Negative Tests', () => {
    let interReactionPortalsManager;
    let consoleWarnSpy;

    before(() => {
      interReactionPortalsManager = new InterReactionPortalsManager(
          new InterReactionPortalsRenderer(),
          true
        );

      interReactionPortalsManager.assignNewPortaledComponentToElement(
          TestReactComp,
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId,
            compGroup: testCompGroup
          }),
          {},
          testCompGroup
        );
    });

    beforeEach(() => {
      consoleWarnSpy = spy(console, 'warn');
    });

    afterEach(() => {
      consoleWarnSpy.restore()
    });

    it((
      'Method #assignNewPortaledComponentToElement, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Component Associated To compName and compId Already Exists'
    ), () => {
      interReactionPortalsManager.assignNewPortaledComponentToElement(
          TestReactComp,
          interReactionElementFactory.createElement({
            compName: testCompName,
            compId: testCompId
          })
        );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #mountPortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.mountPortaledComponentByNameAndId('WE_DO_NOT_EXIST', 'I_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #mountPortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.mountPortaledComponentsByName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #mountPortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.mountPortaledComponentsByGroupName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #remountPortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.remountPortaledComponentByNameAndId('WE_DO_NOT_EXIST', 'I_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #remountPortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.remountPortaledComponentsByName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #remountPortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.remountPortaledComponentsByGroupName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #removePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.removePortaledComponentByNameAndId('WE_DO_NOT_EXIST', 'I_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #removePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.removePortaledComponentsByName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #removePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.removePortaledComponentsByGroupName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #replacePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.replacePortaledComponentByNameAndId(
        'WE_DO_NOT_EXIST',
        'I_DO_NOT_EXIST',
        'NEITHER_DO_I',
        TestReactComp
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #replacePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.replacePortaledComponentsByName(
        'WE_DO_NOT_EXIST',
        'NEITHER_DO_I',
        TestReactComp
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #replacePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.replacePortaledComponentsByGroupName(
        'WE_DO_NOT_EXIST',
        'NEITHER_DO_I',
        TestReactComp
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #toggleMountPortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.toggleMountPortaledComponentByNameAndId('WE_DO_NOT_EXIST', 'I_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #toggleMountPortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.toggleMountPortaledComponentsByName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #toggleMountPortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.toggleMountPortaledComponentsByGroupName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #unmountPortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.unmountPortaledComponentByNameAndId('WE_DO_NOT_EXIST', 'I_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #unmountPortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.unmountPortaledComponentsByName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #unmountPortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.unmountPortaledComponentsByGroupName('WE_DO_NOT_EXIST');
      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName and compId Exists'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        'WE_DO_NOT_EXIST',
        'I_DO_NOT_EXIST',
        { foo: 'bar' }
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compName Exists'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByName(
        'WE_DO_NOT_EXIST',
        { foo: 'bar' }
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When No Component Associated To compGroup Exists'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByGroupName(
        'WE_DO_NOT_EXIST',
        { foo: 'bar' }
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Undefined'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        testCompName,
        testCompId
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Undefined'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByName(
        testCompName
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Undefined'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByGroupName(
        testCompGroup
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are null'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        testCompName,
        testCompId,
        null
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are null'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByName(
        testCompName,
        null
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are null'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByGroupName(
        testCompGroup,
        null
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Empty Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        testCompName,
        testCompId,
        {}
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Empty Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByName(
        testCompName,
        {}
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Empty Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByGroupName(
        testCompGroup,
        {}
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentByNameAndId, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Not An Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        testCompName,
        testCompId,
        []
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Not An Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByName(
        testCompName,
        []
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });

    it((
      'Method #updatePortaledComponentsByGroupName, With shouldEnableDebugging Set To true, Outputs console#warn,'
      + ' Does Nothing, When Update Props Are Not An Object'
    ), () => {
      interReactionPortalsManager.updatePortaledComponentsByGroupName(
        testCompGroup,
        []
      );

      expect(consoleWarnSpy.callCount).to.equal(1);
    });
  });
});
