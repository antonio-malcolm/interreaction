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
    describe('Method #createAssignToDomElement DOM Integration Tests', () => {
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
          'Method #createAssignToDomElement Creates New InterReactionElement, With compName (comp-name),'
          + ' Adds It To DOM, And Assigns A React Component Instance'
        ), () => {
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElement, With compName (comp-name) And compId (comp-id),'
          + ' Adds It To DOM, And Assigns A React Component Instance'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
          if (typeof irElementClassNameDefault === 'string') {
            if (irElementClassNameDefault.length > 0) {
              expect(
                irTestElements[0].classList.contains(irElementClassNameDefault)
              ).to.be.true;
            }
          }
  
          if (irElementCustomClassNames.length > 0) {
            irElementCustomClassNames.forEach((className) => {
              expect(
                irTestElements[0].classList.contains(className)
              ).to.be.true;
            });
          }
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElement, With compName (comp-name), compId (comp-id),'
          + ' And compGroup (comp-group), Adds It To DOM, And Assigns A React Component Instance'
        ), () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            },
            groupedCompContainerLmnt
          );
    
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
          if (typeof irElementClassNameDefault === 'string') {
            if (irElementClassNameDefault.length > 0) {
              expect(
                irTestElements[0].classList.contains(irElementClassNameDefault)
              ).to.be.true;
            }
          }
  
          if (irElementCustomClassNames.length > 0) {
            irElementCustomClassNames.forEach((className) => {
              expect(
                irTestElements[0].classList.contains(className)
              ).to.be.true;
            });
          }
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With compName (comp-name),'
          + ' Adds Them To DOM, And Assigns New React Component Instance, To Each'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
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
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With compName (comp-name) And compId (comp-id),'
          + ' Adds Them To DOM, And Assigns New React Component Instance, To Each'
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
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"][comp-id="InterReactionComponentToo"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
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
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With compName (comp-name) And compGroup (comp-group),'
          + ' Adds Them To DOM, And Assigns New React Component Instance, To Each'
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
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"][comp-group="TEST_GROUP"]`
            );
      
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
      
          expect(irTestElements.length).to.equal(2);
  
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
    
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With compName (comp-name), compId (comp-id),'
          + ' And compGroup (comp-group), Adds Them To DOM, And Assigns New React Component Instance, To Each'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne',
                compGroup: 'TEST_GROUP'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo',
                compGroup: 'TEST_GROUP'
              },
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"][comp-id="InterReactionComponentToo"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(2);
  
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
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElement, With \'append\' Arg, compName (comp-name),'
           + ' Adds It To DOM, After Node Specified By Second Query Selector, And Assigns A React Component Instance'
        ), () => {
          let testDelimiterLmntClassName = 'test_delimiter_lmnt';
          let testDelimiterLmnt = document.createElement('div');
    
          testDelimiterLmnt.className = testDelimiterLmntClassName;
    
          singleCompContainerLmnt.appendChild(testDelimiterLmnt);
    
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt,
            'append'
          );
    
          let testElements = singleCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === singleCompContainerLmnt)
            );
    
          expect(testElements.length).to.equal(2);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('HTMLDivElement');
          expect(testElements[0].className).to.equal(testDelimiterLmntClassName);
    
          expect(typeof testElements[1]).to.equal('object');
          expect(testElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElement, With \'prepend\' Arg, compName (comp-name),'
           + ' Adds It To DOM, Before Node Specified By Second Query Selector, And Assigns A React Component Instance'
        ), () => {
          let testDelimiterLmntClassName = 'test_delimiter_lmnt';
          let testDelimiterLmnt = document.createElement('div');
    
          testDelimiterLmnt.className = testDelimiterLmntClassName;
    
          singleCompContainerLmnt.appendChild(testDelimiterLmnt);
    
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt,
            'prepend'
          );
    
          let testElements = singleCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === singleCompContainerLmnt)
            );
    
          expect(testElements.length).to.equal(2);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('InterReactionElement');
  
          expect(typeof testElements[1]).to.equal('object');
          expect(testElements[1].constructor.name).to.equal('HTMLDivElement');
          expect(testElements[1].className).to.equal(testDelimiterLmntClassName);
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElement, With \'replace\' Arg, compName (comp-name),'
           + ' Adds It To The DOM, According To The Provided Query Selector, Replacing Any Existing Child Nodes,'
           + ' And Assigns A React Component Instance'
        ), () => {
          let testDelimiterLmntOne = document.createElement('div');
          let testDelimiterLmntTwo = document.createElement('div');
    
          singleCompContainerLmnt.appendChild(testDelimiterLmntOne);
          singleCompContainerLmnt.appendChild(testDelimiterLmntTwo);
    
          interReaction.createAssignToDomElement(
            { compName: 'InterReactionComponentOne' },
            singleCompContainerLmnt,
            'replace'
          );
    
          let testElements = singleCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === singleCompContainerLmnt)
            );
    
          expect(testElements.length).to.equal(1);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With \'append\' Arg, compName (comp-name),'
           + ' Adds Each To The DOM, According To The Provided Query Selector, To The Tail Of The Node, And Assigns React Component Instances'
        ), () => {
          let testDelimiterLmntClassName = 'test_delimiter_lmnt';
          let testDelimiterLmnt = document.createElement('div');
    
          testDelimiterLmnt.className = testDelimiterLmntClassName;
    
          listedCompContainerLmnt.appendChild(testDelimiterLmnt);
    
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt,
            'append'
          );
    
          let testElements = listedCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === listedCompContainerLmnt)
            );
    
          expect(testElements.length).to.equal(3);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('HTMLDivElement');
          expect(testElements[0].className).to.equal(testDelimiterLmntClassName);
    
          expect(typeof testElements[1]).to.equal('object');
          expect(testElements[1].constructor.name).to.equal('InterReactionElement');
  
          expect(typeof testElements[2]).to.equal('object');
          expect(testElements[2].constructor.name).to.equal('InterReactionElement');
  
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
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With \'prepend\' Arg, compName (comp-name),'
           + ' Adds Each To The DOM, According To The Provided Query Selector, To The Head Of The Node, And Assigns React Component Instances'
        ), () => {
          let testDelimiterLmntClassName = 'test_delimiter_lmnt';
          let testDelimiterLmnt = document.createElement('div');
    
          testDelimiterLmnt.className = testDelimiterLmntClassName;
    
          listedCompContainerLmnt.appendChild(testDelimiterLmnt);
    
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt,
            'prepend'
          );
    
          let testElements = listedCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === listedCompContainerLmnt)
            );
    
          expect(testElements.length).to.equal(3);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('InterReactionElement');
  
          expect(typeof testElements[1]).to.equal('object');
          expect(testElements[1].constructor.name).to.equal('InterReactionElement');
  
          expect(typeof testElements[2]).to.equal('object');
          expect(testElements[2].constructor.name).to.equal('HTMLDivElement');
          expect(testElements[2].className).to.equal(testDelimiterLmntClassName);
  
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
  
        it((
          'Method #createAssignToDomElement Creates New InterReactionElements, With compList, With \'replace\' Arg, compName (comp-name),'
           + ' Adds Each To The DOM, According To The Provided Query Selector, Replacing Any Existing Child Nodes, And Assigns React Component Instances'
        ), () => {
          listedCompContainerLmnt.appendChild(
            document.createElement('div')
          );
    
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt,
            'replace'
          );
    
          let testElements = listedCompContainerLmnt.querySelectorAll('*');
  
          testElements = Array.from(testElements).filter(
              lmnt => (lmnt.parentElement === listedCompContainerLmnt)
            );
  
          // Should be length of one, as each InterReactionElement will be replaced by the next...
          expect(testElements.length).to.equal(1);
  
          expect(typeof testElements[0]).to.equal('object');
          expect(testElements[0].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(1);
  
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

        it('Method #createAssignToDomElement Does Nothing, With Undefined compName', () => {
          interReaction.createAssignToDomElement(
            {
              compName: undefined,
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With Empty String compName', () => {
          interReaction.createAssignToDomElement(
            {
              compName: '',
              compId: 'InterReactionComponentOne'
            },
            singleCompContainerLmnt
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With Undefined DOM Node', () => {
          interReaction.createAssignToDomElement(
            {
              compName: 'InterReactionComponentOne'
            }
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With Undefined compList', () => {
          interReaction.createAssignToDomElement(
            { compList: undefined},
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With Empty Array compList', () => {
          interReaction.createAssignToDomElement(
            { compList: [] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With compList, With Undefined compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: undefined },
              { compId: 'InterReactionComponentOne' }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With compList, With Empty String compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: '' },
              {
                compName: '',
                compId: 'InterReactionComponentOne'
              }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #createAssignToDomElement Does Nothing, With compList, With Non-matching compNames', () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'SOME_RANDOM_NAME' },
              {
                compName: 'SOME_RANDOM_NAME',
                compId: 'InterReactionComponentOne'
              }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it((
          'Method #createAssignToDomElement Does Nothing, With compList, With Matching compNames And Non-Matching compIds'
        ), () => {
          interReaction.createAssignToDomElement(
            { compList: [
              { compName: 'SOME_RANDOM_NAME' },
              {
                compName: 'SOME_RANDOM_NAME',
                compId: 'InterReactionComponentOne'
              }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(0);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
      });
    });
  };

const InterReactionCreateAssignDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionCreateAssignDomIntegrationTestRunner;
