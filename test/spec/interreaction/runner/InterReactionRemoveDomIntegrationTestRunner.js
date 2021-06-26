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
    describe('Method #remove DOM Integration Tests', () => {
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

        it('Method #remove Removes Components, With compName (comp-name)', () => {
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
  
          interReaction.remove({
            compName: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #remove Removes Component, With compName (comp-name) And compId (comp-id)', () => {
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
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Removes Components, With compName (comp-name) And compGroup (comp-group)', () => {
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
  
          interReaction.remove({ compGroup: 'TEST_GROUP' });
  
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
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compName (comp-name),'
          + ' And shouldRemoveElement Set To true'
        ), () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            shouldRemoveElement: true
          });
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it((
          'Method #remove Removes Component, InterReactionElement, With compName (comp-name) And compId (comp-id),'
          + ' And shouldRemoveElement Set To true'
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
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne',
            shouldRemoveElement: true
          });
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compName (comp-name) And compGroup (comp-group),'
          + ' And shouldRemoveElement Set To true'
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
  
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(5);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[2]).to.equal('object');
          expect(irTestElements[2].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[3]).to.equal('object');
          expect(irTestElements[3].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[4]).to.equal('object');
          expect(irTestElements[4].constructor.name).to.equal('InterReactionElement');
  
          irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(3);
  
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
  
          interReaction.remove({
            compGroup: 'TEST_GROUP',
            shouldRemoveElement: true
          });
  
          irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
  
          expect(irTestElements.length).to.equal(2);
  
          irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
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
        });
  
        it(('Method #remove Removes Components, With compList, With compName (comp-name)'), () => {
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
  
          interReaction.remove({
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
        });
  
        it('Method #remove Removes Components, With compList, With compName (comp-name), And compId (comp-id)', () => {
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
  
          interReaction.remove({
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
        });
  
        it('Method #remove Removes Components, With compList, With compName (comp-name) And compGroup (comp-group)', () => {
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
              { // With a different compGroup...
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
  
          interReaction.remove({
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
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compName (comp-name),'
          + ' And shouldRemoveElement Set To true'
        ), () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentToo' },
            singleCompContainerLmnt
          );
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            shouldRemoveElement: true
          });
  
          interReaction.remove({ 
            compName: 'InterReactionComponentToo',
            shouldRemoveElement: true
          });
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compName (comp-name) And compId (comp-id),'
          + ' And shouldRemoveElement Set to True'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentToo',
              compId: 'InterReactionComponentToo'
            },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { // Without a compId...
              compName: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(3);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[2]).to.equal('object');
          expect(irTestElements[2].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne',
            shouldRemoveElement: true
          });
  
          interReaction.remove({ 
            compName: 'InterReactionComponentToo',
            compId: 'InterReactionComponentToo',
            shouldRemoveElement: true
          });
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compList, With compName (comp-name) And compGroup (comp-group),'
          + ' And shouldRemoveElement Set To true'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentToo',
              compGroup: 'TEST_GROUP'
            },
            singleCompContainerLmnt
          );
  
          interReaction.createAssignToDomElement(
            { // Without a compGroup...
              compName: 'InterReactionComponentToo'
            },
            singleCompContainerLmnt
          );
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(3);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[2]).to.equal('object');
          expect(irTestElements[2].constructor.name).to.equal('InterReactionElement');
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
   
          expect(irTestElements.length).to.equal(2);
   
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(3);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(2);
  
          interReaction.remove({
            compGroup: 'TEST_GROUP',
            shouldRemoveElement: true
          });
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
  
          irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
   
          expect(irTestElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(0);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compList, With compName (comp-name),'
          + ' And shouldRemoveElement Set To true'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
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
  
          interReaction.remove({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                shouldRemoveElement: true
              },
              { 
                compName: 'InterReactionComponentToo',
                shouldRemoveElement: true
              }
            ]
          });
  
          irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
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
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compList, With compName (comp-name), And compId (comp-id),'
          + ' And shouldRemoveElement Set to True'
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
  
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(3);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[2]).to.equal('object');
          expect(irTestElements[2].constructor.name).to.equal('InterReactionElement');
  
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
  
          interReaction.remove({
            compList: [
              { 
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne',
                shouldRemoveElement: true
              },
              { 
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo',
                shouldRemoveElement: true
              }
            ]
          });
  
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
  
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
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
        });
  
        it((
          'Method #remove Removes Components, InterReactionElements, With compList, With compName (comp-name) And compGroup (comp-group),'
          + ' And shouldRemoveElement Set To true'
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
  
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(3);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[2]).to.equal('object');
          expect(irTestElements[2].constructor.name).to.equal('InterReactionElement');
  
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
   
          expect(irTestElements.length).to.equal(2);
   
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
  
          interReaction.remove({
            compList: [
              { 
                compGroup: 'TEST_GROUP',
                shouldRemoveElement: true
              }
            ]
          });
  
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
  
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
   
          expect(irTestElements.length).to.equal(0);
  
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
        });
      });

      describe('Negative Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
          listedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${listedCompContainerClassName}`);
        });

        it('Method #remove Does Nothing With Empty args', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.remove();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With Undefined compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.remove({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With Empty String compName (comp-name)', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.remove({
            compName: '',
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With Non-matching compName', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.remove({
            compName: 'THIS_COMPONENT_DOES_NOT_EXIST'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With Matching compName And Non-matching compId', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With compName (comp-name) and compGroup', () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
  
          interReaction.remove({
            compName: 'InterReactionComponentOne',
            compGroup: 'InterReactionComponentOne'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #remove Does Nothing With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.remove({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #remove Does Nothing With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.remove({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it('Method #remove Does Nothing, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.remove({
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
  
        it('Method #remove Does Nothing, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.remove({
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
  
        it('Method #remove Does Nothing, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
  
          interReaction.remove({
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
  
        it('Method #remove Does Nothing, With compList, With Matching compNames And Non-matching compIds', () => {
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
  
          interReaction.remove({
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
      });
    });
  };

const InterReactionRemoveDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionRemoveDomIntegrationTestRunner;
