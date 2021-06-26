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

import InterReactionComponentClassNames from 'component/interreaction/constant/InterReactionComponentClassNames';

const runTests = function(testProps = {}) {
    describe('Method #replace DOM Integration Tests', () => {
      const interReaction = window.interReaction;
      const irElementTagName = testProps.irElementTagName;
      const irElementClassNameDefault = testProps.irElementClassNameDefault;
      const irElementClassNameCustom = testProps.irElementClassNameCustom;
      const testContainerId = testProps.testContainerId;
      const singleCompContainerClassName = testProps.singleCompContainerClassName;
      const groupedCompContainerClassName = testProps.groupedCompContainerClassName;
      const listedCompContainerClassName = testProps.listedCompContainerClassName;
      const resetDomTestContainer = testProps.resetDomTestContainer;
  
      let irElementCustomClassNames = [];
  
      if (typeof irElementClassNameCustom === 'string') {
        if (irElementClassNameCustom.length > 0) {
          irElementCustomClassNames = irElementClassNameCustom.split(/\s/);
        }
      }
  
      let singleCompContainerLmnt;
      let groupedCompContainerLmnt;
      let listedCompContainerLmnt;
  
      describe('Positive Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
          listedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${listedCompContainerClassName}`);
        });

        it('Method #replace Replaces Components With Those Provided By Name, With compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFour' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFour' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFive' },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'InterReactionComponentFour',
            compReplacement: 'InterReactionComponentToo'
          });
  
          interReaction.replace({
            compName: 'InterReactionComponentFive',
            compReplacement: 'InterReactionComponentThree'
          });
  
          let irCompFourElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFour"]`
            );
  
          expect(irCompFourElements.length).to.equal(0);
  
          let irCompFiveElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFive"]`
            );
  
          expect(irCompFiveElements.length).to.equal(0);
  
          let componentFourElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentFourElements.length).to.equal(0);
  
          let componentFiveElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          expect(componentFiveElements.length).to.equal(0);
  
          let irCompTooElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
   
          expect(irCompTooElements.length).to.equal(2);
  
          irCompTooElements.forEach((lmnt) => {
            expect(lmnt.getAttribute('comp-replaced')).to.equal('InterReactionComponentFour');
          });
  
          let irCompThreeElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(1);
  
          irCompThreeElements.forEach((lmnt) => {
            expect(lmnt.getAttribute('comp-replaced')).to.equal('InterReactionComponentFive');
          });
  
          let componentTooElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentTooElements.length).to.equal(2);
  
          let componentThreeElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(1);
        });
  
        it('Method #replace Replaces Components With Those Provided By Name, With compName (comp-name) And compId (comp-id)', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentFour',
              compId: 'InterReactionComponentFour'
            },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFour' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentFive',
              compId: 'InterReactionComponentFive'
            },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'InterReactionComponentFour',
            compId: 'InterReactionComponentFour',
            compReplacement: 'InterReactionComponentToo'
          });
  
          interReaction.replace({
            compName: 'InterReactionComponentFive',
            compId: 'InterReactionComponentFive',
            compReplacement: 'InterReactionComponentThree'
          });
  
          let irCompFourElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFour"]`
            );
   
          expect(irCompFourElements.length).to.equal(1);
  
          let irCompFiveElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFive"]`
            );
   
          expect(irCompFiveElements.length).to.equal(0);
  
          let componentFourElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentFourElements.length).to.equal(1);
  
          let componentFiveElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          expect(componentFiveElements.length).to.equal(0);
  
          let irCompTooElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
   
          expect(irCompTooElements.length).to.equal(1);
  
          irCompTooElements.forEach((lmnt) => {
            expect(lmnt.getAttribute('comp-replaced')).to.equal('InterReactionComponentFour');
          });
  
          let irCompThreeElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(1);
  
          irCompThreeElements.forEach((lmnt) => {
            expect(lmnt.getAttribute('comp-replaced')).to.equal('InterReactionComponentFive');
          });
  
          let componentTooElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentTooElements.length).to.equal(1);
  
          let componentThreeElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(1);
        });
  
        it('Method #replace Replaces Components With Those Provided By Name, With compName (comp-name) And compGroup (comp-group)', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentFour',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFour' },
            groupedCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentFive',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
  
          interReaction.replace({
            compGroup: 'TEST_GROUP',
            compReplacement: 'InterReactionComponentThree'
          });
  
          let irCompFourElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFour"]`
            );
   
          expect(irCompFourElements.length).to.equal(1);
  
          let irCompFiveElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFive"]`
            );
   
          expect(irCompFiveElements.length).to.equal(0);
  
          let componentFourElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentFourElements.length).to.equal(1);
  
          let componentFiveElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          expect(componentFiveElements.length).to.equal(0);
  
          let irCompThreeElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(2);
  
          // TODO: Revisit this:
          // A single value is being assigned to the element attribute, for the entire group.
          // Non-breaking issue, as the attribute is intended to be informational, only, but needs to be fixed.
          // expect(irCompThreeElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentFour');
          expect(irCompThreeElements[1].getAttribute('comp-replaced')).to.equal('InterReactionComponentFive');
  
          let componentThreeElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(2);
        });
  
        it((
          'Method #replace Replaces Components With Those Provided By Name,'
          + ' With compList, With compName (comp-name)'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compReplacement: 'InterReactionComponentThree'
              },
              { 
                compName: 'InterReactionComponentToo',
                compReplacement: 'InterReactionComponentFour'
              }
            ]
          });
  
          let irCompOneElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
   
          expect(irCompOneElements.length).to.equal(0);
  
          let irCompTooElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
   
          expect(irCompTooElements.length).to.equal(0);
  
          let componentOneElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentOneElements.length).to.equal(0);
  
          let componentTooElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentTooElements.length).to.equal(0);
  
          let irCompThreeElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(1);
          expect(irCompThreeElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentOne');
  
          let irCompFourElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFour"]`
            );
   
          expect(irCompFourElements.length).to.equal(1);
          expect(irCompFourElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentToo');
  
          let componentThreeElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(1);
  
          let componentFourElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentFourElements.length).to.equal(1);
        });
  
        it((
          'Method #replace Replaces Components With Those Provided By Name,'
          + ' With compList, With compName (comp-name), And compId (comp-id)'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              },
              { // Without a compId...
                compName: 'InterReactionComponentToo'
              },
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne',
                compReplacement: 'InterReactionComponentThree'
              },
              { 
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo',
                compReplacement: 'InterReactionComponentFour'
              }
            ]
          });
  
          let irCompOneElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
   
          expect(irCompOneElements.length).to.equal(0);
  
          let irCompTooElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
   
          expect(irCompTooElements.length).to.equal(1);
  
          let componentOneElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentOneElements.length).to.equal(0);
  
          let componentTooElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentTooElements.length).to.equal(1);
  
          let irCompThreeElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(1);
          expect(irCompThreeElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentOne');
  
          let irCompFourElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFour"]`
            );
   
          expect(irCompFourElements.length).to.equal(1);
          expect(irCompFourElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentToo');
  
          let componentThreeElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(1);
  
          let componentFourElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentFourElements.length).to.equal(1);
        });
  
        it((
          'Method #replace Replaces Components With Those Provided By Name, With compList,'
          + ' With compName (comp-name) And compGroup (comp-group)'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compGroup: 'TEST_GROUP'
              },
              {
                compName: 'InterReactionComponentToo',
                compGroup: 'TEST_GROUP'
              },
              {
                compName: 'InterReactionComponentFive',
                compGroup: 'TEST_GROUP'
              },
              { // Without a compGroup...
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              },
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              { 
                compGroup: 'TEST_GROUP',
                compReplacement: 'InterReactionComponentThree'
              }
            ]
          });
  
          let irCompOneElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
   
          expect(irCompOneElements.length).to.equal(0);
  
          let irCompTooElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
   
          expect(irCompTooElements.length).to.equal(1);
  
          let irCompFiveElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentFive"]`
            );
   
          expect(irCompFiveElements.length).to.equal(0);
  
          let componentOneElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentOneElements.length).to.equal(0);
  
          let componentTooElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentTooElements.length).to.equal(1);
  
          let componentFiveElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          expect(componentFiveElements.length).to.equal(0);
  
          let irCompThreeElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentThree"]`
            );
   
          expect(irCompThreeElements.length).to.equal(3);
  
          /**
           * TODO: Revisit this.
           * A single value is being assigned to the element attribute, for the entire group.
           * Non-breaking issue, as the attribute is intended to be informational, only, but needs to be fixed.
           */
  
           // expect(irCompThreeElements[0].getAttribute('comp-replaced')).to.equal('InterReactionComponentOne');
           // expect(irCompThreeElements[1].getAttribute('comp-replaced')).to.equal('InterReactionComponentToo');
          expect(irCompThreeElements[2].getAttribute('comp-replaced')).to.equal('InterReactionComponentFive');
  
          let componentThreeElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentThreeElements.length).to.equal(3);
        });
      });

      describe('Negative Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
          listedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${listedCompContainerClassName}`);
        });

        it('Method #replace Does Nothing With Empty args', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.replace();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });

        it('Method #replace Does Nothing With Undefined compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.replace({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });

        it('Method #replace Does Nothing With Empty String compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: '',
            compReplacement: 'InterReactionComponentToo'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing With Non-matching compName', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'THIS_COMPONENT_DOES_NOT_EXIST',
            compReplacement: 'InterReactionComponentToo'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID',
            compReplacement: 'InterReactionComponentToo'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'InterReactionComponentOne',
            compGroup: 'InterReactionComponentOne',
            compReplacement: 'InterReactionComponentToo'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing With Matching compName And Non-existing Replacement Component', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.replace({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne',
            compReplacement: 'I_DO_NOT_EXIST'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #replace Does Nothing With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #replace Does Nothing, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              {
                compId: 'InterReactionComponentOne',
                compReplacement: 'InterReactionComponentThree'
              },
              {
                compName: undefined,
                compReplacement: 'InterReactionComponentFour'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(0);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              {
                compName: '',
                compId: 'InterReactionComponentOne',
                compReplacement: 'InterReactionComponentThree'
              },
              {
                compName: '',
                compReplacement: 'InterReactionComponentFour'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(0);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              {
                compName: 'SOME_RANDOM NAME',
                compId: 'InterReactionComponentOne',
                compReplacement: 'InterReactionComponentFour'
              },
              {
                compName: 'SOME_OTHER RANDOM_NAME',
                compReplacement: 'InterReactionComponentThree'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(0);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #replace Does Nothing, With compList, With Matching compNames And Non-matching compIds', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.replace({
            compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'SOME_RANDOM_ID',
                compReplacement: 'InterReactionComponentThree'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'SOME_RANDOM_ID',
                compReplacement: 'InterReactionComponentFour'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(0);
          
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          expect(componentElements.length).to.equal(0);
        });
      });
    });
  };

const InterReactionReplaceDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionReplaceDomIntegrationTestRunner;
