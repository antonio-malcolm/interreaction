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
    describe('Method #toggleMount DOM Integration Tests', () => {
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

        it((
          'Method #toggleMount Unmounts Components, then #toggleMount Mounts Components, With compName (comp-name)'
        ), () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it((
          'Method #toggleMount Unmounts Component, then #toggleMount Mounts Component, With compName (comp-name) And compId (comp-id)'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          // Because we're using compId, this one shouldn't mount or unmounr...
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it((
          'Method #toggleMount Unmounts Components, then #toggleMount Mounts Components,'
          + ' With compName (comp-name) And compGroup (comp-group)'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentToo',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentThree',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
  
          // NOT in the group...
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentThree' },
            groupedCompContainerLmnt
          );
  
          // NOT in the group...
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentFour' },
            groupedCompContainerLmnt
          );
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(5);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.toggleMount({ compGroup: 'TEST_GROUP' });
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.toggleMount({ compGroup: 'TEST_GROUP' });
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(5);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_three`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it((
          'Method #toggleMount Unmounts Components, then #toggleMount Mounts Components,'
          + ' With compList, With compName (comp-name)'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
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
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
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
  
        it((
          'Method #toggleMount Unmounts Components, then #toggleMount Mounts Components, With compList,'
          + ' With compName (comp-name), And compId (comp-id)'
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
                compName: 'InterReactionComponentOne'
              },
            ] },
            listedCompContainerLmnt
          );
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.toggleMount({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              { 
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
  
          interReaction.toggleMount({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              { 
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #toggleMount Unmounts Components, then #toggleMount Mounts Components, With compList,'
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
              { // Without a compGroup...
                compName: 'InterReactionComponentToo'
              },
            ] },
            listedCompContainerLmnt
          );
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.toggleMount({
            compList: [
              { compGroup: 'TEST_GROUP' }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.toggleMount({
            compList: [
              { compGroup: 'TEST_GROUP' }
            ]
          });
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(2);
        });
      });

      describe('Negative Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
          listedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${listedCompContainerClassName}`);
        });

        it('Method #toggleMount Does Nothing With Empty args', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With Undefined compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With Empty String compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: '',
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With Non-matching compName', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'THIS_COMPONENT_DOES_NOT_EXIST'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With compName (comp-name) and compGroup', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compGroup: 'InterReactionComponentOne'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #toggleMount Does Nothing With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Nothing With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Nothing, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compId: 'InterReactionComponentOne' },
              { compName: undefined }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Nothing, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              {
                compName: '',
                compId: 'InterReactionComponentOne'
              },
              { compName: '' }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Nothing, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              {
                compName: 'SOME_RANDOM NAME',
                compId: 'InterReactionComponentOne'
              },
              { compName: 'SOME_OTHER RANDOM_NAME' }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Nothing, With compList, With Matching compNames And Non-matching compIds', () => {
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
  
          interReaction.toggleMount({
            compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'SOME_RANDOM_ID'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'SOME_RANDOM_ID'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Empty args', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          interReaction.toggleMount();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Undefined compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          interReaction.toggleMount({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Empty String compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          interReaction.toggleMount({ compName: '' });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Non-matching compName', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne'
          });
  
          interReaction.toggleMount({ compName: 'THIS_COMPONENT_DOES_NOT_EXIST' });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          interReaction.toggleMount({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ],
          });
  
          interReaction.toggleMount({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ],
          });
  
          interReaction.toggleMount({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ],
          });
  
          interReaction.toggleMount({
            compList: [
              { compId: 'InterReactionComponentOne' },
              { compName: undefined }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ],
          });
  
          interReaction.toggleMount({
            compList: [
              {
                compName: '',
                compId: ''
              },
              { compName: '' }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentTwo' }
            ],
          });
  
          interReaction.toggleMount({
            compList: [
              {
                compName: 'SOME_RANDOM NAME',
                compId: 'InterReactionComponentOne'
              },
              { compName: 'SOME_OTHER RANDOM_NAME' }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #toggleMount Does Not Mount Unmounted, With compList, With Matching compNames And Non-matching compIds', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              {
                compName: 'InterReactionComponentTwo',
                compId: 'InterReactionComponentTwo'
              }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.toggleMount({
            compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              {
                compName: 'InterReactionComponentTwo',
                compId: 'InterReactionComponentTwo'
              }
            ],
          });
  
          interReaction.toggleMount({
            compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'SOME_RANDOM_ID'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'SOME_RANDOM_ID'
              }
            ],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
      });
    });
  };

const InterReactionToggleMountDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionToggleMountDomIntegrationTestRunner;
