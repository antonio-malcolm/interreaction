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
    describe('Method #assign DOM Integration Tests', () => {
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

        it('Method #assign Assigns New Components To InterReactionElements With compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({
            compName: 'InterReactionComponentOne',
          });
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
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
        });
  
        it('Method #assign Assigns New Component To InterReactionElement With compName (comp-name) And compId (comp-id)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicate IDs, on the DOM...
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          // ...SO, this should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
  
          componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This, ALSO, should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #assign Assigns New Components To InterReactionElements With compName (comp-name) And compGroup (comp-group)', () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne'
            })
          );
  
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo'
            })
          );
  
          interReaction.assign({
            compName: 'InterReactionComponentOne',
            compGroup: 'TEST_GROUP'
          });
  
          interReaction.assign({
            compName: 'InterReactionComponentToo',
            compGroup: 'TEST_GROUP'
          });
  
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it(
          'Method #assign Assigns New Component To InterReactionElement With compName (comp-name), compId (comp-id) And compGroup (comp-group)',
        () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicated IDs, on the DOM...
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne',
            compGroup: 'TEST_GROUP'
          });
  
          // Only FIRST should have been assigned...
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
  
          // ...SO, this should have a length of ONLY ONE!
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          // This, ALSO, should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
  
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This, ALSO, should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
        });
  
        it(
          'Method #assign Assigns New Components To InterReactionElements With compName (comp-name) And compGroup (comp-group) Assigned From Custom element',
        () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
  
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
              compGroup: 'TEST_GROUP'
            })
          );
  
          interReaction.assign({
            compName: 'InterReactionComponentOne'
          });
  
          interReaction.assign({
            compName: 'InterReactionComponentToo'
          });
  
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it(
          'Method #assign Assigns New Component To InterReactionElement With compName (comp-name), compId (comp-id)'
          + ' And compGroup (comp-group) Assigned To Custom Element'
        , () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicated IDs, on the DOM...
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
  
          // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign({
            compName: 'InterReactionComponentOne',
            compId: 'InterReactionComponentOne'
          });
  
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-group="TEST_GROUP"]`
            );
  
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          // ...SO, this should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
  
          // Only FIRST should have been assigned...
          componentElements = groupedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This, ALSO, should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
        });
  
        it('Method #assign Assigns New Components To InterReactionElements, With compList, With compName (comp-name)', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo'
            })
          );
  
          interReaction.assign(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] },
            listedCompContainerLmnt
          );
    
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
    
          irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentToo"]`
            );
    
          expect(irTestElements.length).to.equal(2);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
          expect(typeof irTestElements[1]).to.equal('object');
          expect(irTestElements[1].constructor.name).to.equal('InterReactionElement');
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(4);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          expect(componentElements.length).to.equal(2);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(2);
        });
  
        it(
          'Method #assign Assigns New Components To InterReactionElements, With compList, With compName (comp-name) And compId (comp-id),',
        () => {
           listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicate IDs, on the DOM...
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
              compId: 'InterReactionComponentToo'
            })
          );
   
           // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compId: 'InterReactionComponentOne'
              },
              {
                compName: 'InterReactionComponentToo',
                compId: 'InterReactionComponentToo'
              },
            ] }
          );
  
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"]`
            );
  
          expect(irTestElements.length).to.equal(2);
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
  
          // This should have a length of ONLY TWO!
          expect(componentElements.length).to.equal(2);
  
          // Only FIRST 'InterReactionComponentOne' should have been assigned...
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #assign Creates New InterReactionElements, With compList, With compName (comp-name) And compGroup (comp-group),'
          + ' Adds Them To DOM, And Assigns New React Component Instance, To Each'
        ), () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicate IDs, on the DOM...
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
              compId: 'InterReactionComponentToo'
            })
          );
  
          // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign(
            { compList: [
              {
                compName: 'InterReactionComponentOne',
                compGroup: 'TEST_GROUP'
              },
              {
                compName: 'InterReactionComponentToo',
                compGroup: 'TEST_GROUP'
              },
            ] }
          );
  
          // Only FIRST 'InterReactionComponentOne' should have been assigned to group...
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
  
          // This should have a length of ONLY TWO!
          expect(componentElements.length).to.equal(2);
  
          // Only FIRST 'InterReactionComponentOne' should have been assigned...
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This should have a length of ONLY ONE!
          expect(componentElements.length).to.equal(1);
  
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_too`
            );
  
          expect(componentElements.length).to.equal(1);
        });
  
        it((
          'Method #assign Creates New InterReactionElements, With compList, With compName (comp-name) And compGroup (comp-group) Assigned From Custom element,'
          + ' Adds Them To DOM, And Assigns New React Component Instance, To Each'
        ), () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
  
          // We can't stop people from doing dumb things, like using duplicate IDs, on the DOM...
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
              compId: 'InterReactionComponentToo',
              compGroup: 'TEST_GROUP'
            })
          );
  
          // ...HOWEVER, this should assign only ONE new component instance,
          // to the FIRST Custom Element it finds, with the abused compId...
          interReaction.assign(
            { compList: [
              { compName: 'InterReactionComponentOne' },
              { compName: 'InterReactionComponentToo' }
            ] }
          );
  
          let irTestElements = listedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
  
          expect(irTestElements.length).to.equal(2);
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
      
          expect(irTestElements.length).to.equal(3);
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          // This should have a length of ONLY TWO!
          expect(componentElements.length).to.equal(2);
  
          // Only FIRST 'InterReactionComponentOne' should have been assigned...
          componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}_one`
            );
  
          // This should have a length of ONLY ONE!
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

        it('Method #assign Does Nothing With Empty args', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign();
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Undefined compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({});
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Empty String compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({
            compName: '',
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Non-matching compName', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({
            compName: 'THIS_COMPONENT_DOES_NOT_EXIST'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Matching compName And Non-matching compId', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          interReaction.assign({
            compName: 'InterReactionComponentOne',
            compId: 'SOME_RANDOM_ID'
          });
  
          let componentElements = singleCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Undefined compList', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({
            compList: undefined,
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing With Empty Array compList', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          interReaction.assign({
            compList: [],
          });
  
          let componentElements = listedCompContainerLmnt.querySelectorAll(
              `.${InterReactionComponentClassNames.COMPONENT}`
            );
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing, With compList, With Undefined compNames', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
            })
          );
  
          interReaction.assign({
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
  
        it('Method #assign Does Nothing, With compList, With Empty String compNames', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
            })
          );
  
          interReaction.assign({
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
  
          expect(componentElements.length).to.equal(0);
        });
  
        it('Method #assign Does Nothing, With compList, With Non-matching compNames', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
            })
          );
  
          interReaction.assign({
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
  
        it('Method #assign Does Nothing, With compList, With Matching compNames And Non-matching compIds', () => {
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
          );
  
          listedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentToo',
              compId: 'InterReactionComponentToo'
            })
          );
  
          interReaction.assign({
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

const InterReactionAssignDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionAssignDomIntegrationTestRunner;
