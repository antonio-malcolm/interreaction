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
    describe('Method #update DOM Integration Tests', () => {
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

        it('Method #update Updates Props On Components, With compName (comp-name)', () => {
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
  
          let compFourPropVal = `PROP_UPDATE_FOUR-${Date.now()}`;
          let compFivePropVal = `PROP_UPDATE_FIVE-${Date.now()}`;
  
          interReaction.update({
            compName: 'InterReactionComponentFour',
            compProps: { msg: compFourPropVal }
          });
  
          interReaction.update({
            compName: 'InterReactionComponentFive',
            compProps: { msg: compFivePropVal }
          });
  
          let componentFourElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          componentFourElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compFourPropVal);
          });
  
          let componentFiveElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          componentFiveElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compFivePropVal);
          });
        });
  
        it('Method #update Updates Props On Component, With compName (comp-name) And compId (comp-id)', () => {
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
  
          let compFourPropVal = `PROP_UPDATE_FOUR-${Date.now()}`;
          let compFivePropVal = `PROP_UPDATE_FIVE-${Date.now()}`;
  
          interReaction.update({
            compName: 'InterReactionComponentFour',
            compId: 'InterReactionComponentFour',
            compProps: { msg: compFourPropVal }
          });
  
          interReaction.update({
            compName: 'InterReactionComponentFive',
            compId: 'InterReactionComponentFive',
            compProps: { msg: compFivePropVal }
          });
  
          let componentFourElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_four`
            );
  
          componentFourElements.forEach((lmnt, idx) => {
            if (idx === 0) {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.equal(compFourPropVal);
            } else {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.not.equal(compFourPropVal);
            }
          });
  
          let componentFiveElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          componentFiveElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compFivePropVal);
          });
        });
  
        it(('Method #update Updates Components, With compList, With compName (comp-name)'), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' },
              { compName: 'InterReactionComponentFive' }
            ] },
            listedCompContainerLmnt
          );
  
          let compOnePropVal = `PROP_UPDATE_ONE-${Date.now()}`;
          let compTooPropVal = `PROP_UPDATE_TOO-${Date.now()}`;
          let compFivePropVal = `PROP_UPDATE_FIVE-${Date.now()}`;
  
          interReaction.update({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compProps: { msg: compOnePropVal }
              },
              { 
                compName: 'InterReactionComponentToo',
                compProps: { msg: compTooPropVal }
              },
              {
                compName: 'InterReactionComponentFive',
                compProps: { msg: compFivePropVal }
              }
            ]
          });
  
          let componentOneElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          componentOneElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compOnePropVal);
          });
  
          let componentTooElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          componentTooElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compTooPropVal);
          });
  
          let componentFiveElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          componentFiveElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compFivePropVal);
          });
        });
  
        it('Method #update Updates Props On Components, With compList, With compName (comp-name), And compId (comp-id)', () => {
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
              {
                compName: 'InterReactionComponentFive',
                compId: 'InterReactionComponentFive'
              },
              { // Without a compId...
                compName: 'InterReactionComponentToo'
              },
            ] },
            listedCompContainerLmnt
          );
  
          let compOnePropVal = `PROP_UPDATE_ONE-${Date.now()}`;
          let compTooPropVal = `PROP_UPDATE_TOO-${Date.now()}`;
          let compFivePropVal = `PROP_UPDATE_FIVE-${Date.now()}`;
  
          interReaction.update({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne',
                compProps: { msg: compOnePropVal }
              },
              { 
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo',
                compProps: { msg: compTooPropVal }
              },
              {
                compName: 'InterReactionComponentFive',
                compId: 'InterReactionComponentFive',
                compProps: { msg: compFivePropVal }
              }
            ]
          });
  
          let componentOneElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          componentOneElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compOnePropVal);
          });
  
          let componentTooElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          componentTooElements.forEach((lmnt, idx) => {
            if (idx === 0) {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.equal(compTooPropVal);
            } else {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.not.equal(compTooPropVal);
            }
          });
  
          let componentFiveElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          componentFiveElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compFivePropVal);
          });
        });
  
        it('Method #update Updates Props On Components, With compList, With compName (comp-name) And compGroup (comp-group)', () => {
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
              { // Without a compId...
                compName: 'InterReactionComponentToo'
              },
            ] },
            listedCompContainerLmnt
          );
  
          let compGroupPropVal = `PROP_UPDATE_GROUP-${Date.now()}`;
  
          interReaction.update({
            compList: [
              {
                compGroup: 'TEST_GROUP',
                compProps: { msg: compGroupPropVal }
              }
            ]
          });
  
          let componentOneElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          componentOneElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compGroupPropVal);
          });
  
          let componentTooElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          componentTooElements.forEach((lmnt, idx) => {
            if (idx === 0) {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.equal(compGroupPropVal);
            } else {
              expect(
                lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
              ).to.not.equal(compGroupPropVal);
            }
          });
  
          let componentFiveElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_five`
            );
  
          componentFiveElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.equal(compGroupPropVal);
          });
        });
      });

      describe('Negative Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
          listedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${listedCompContainerClassName}`);
        });

        it('Method #update Does Nothing With Empty args', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.update();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #update Does Nothing With Undefined compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.update({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #update Does Nothing With Empty String compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compName: '',
            compProps: { msg: compPropVal }
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing With Non-matching compName', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compName: 'THIS_COMPONENT_DOES_NOT_EXIST',
            compProps: { msg: compPropVal }
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID',
            compProps: { msg: compPropVal }
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing With compName (comp-name) and compGroup', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compName: 'InterReactionComponentOne',
            compGroup: 'InterReactionComponentOne',
            compProps: { msg: compPropVal }
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );

          interReaction.update({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #update Does Nothing With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.update({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #update Does Nothing, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compList: [
              {
                compId: 'InterReactionComponentOne',
                compProps: { msg: compPropVal }
              },
              {
                compName: undefined,
                compProps: { msg: compPropVal }
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compList: [
              {
                compName: '',
                compId: 'InterReactionComponentOne',
                compProps: { msg: compPropVal }
              },
              {
                compName: '',
                compProps: { msg: compPropVal }
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compList: [
              {
                compName: 'SOME_RANDOM NAME',
                compId: 'InterReactionComponentOne',
                compProps: { msg: compPropVal }
              },
              {
                compName: 'SOME_OTHER RANDOM_NAME',
                compProps: { msg: compPropVal }
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
  
        it('Method #update Does Nothing, With compList, With Matching compNames And Non-matching compIds', () => {
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

          let compPropVal = `PROP_UPDATE-${Date.now()}`;

          interReaction.update({
            compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'SOME_RANDOM_ID',
                compProps: { msg: compPropVal }
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'SOME_RANDOM_ID',
                compProps: { msg: compPropVal }
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);

          componentElements.forEach((lmnt) => {
            expect(
              lmnt.querySelector(`.${InterReactionComponentClassNames.MSG_FIELD}`).innerHTML
            ).to.not.equal(compPropVal);
          });
        });
      });
    });
  };

const InterReactionUpdateDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionUpdateDomIntegrationTestRunner;
