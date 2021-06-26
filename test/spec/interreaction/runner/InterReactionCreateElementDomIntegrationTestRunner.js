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

const runTests = function(testProps = {}) {
    describe('Method #createElement DOM Integration Tests', () => {
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
  
      describe('Positive Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
        });
  
        it('Method #createElement Creates New InterReactionElement With compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
            })
          );
  
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"]`
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
        });
    
        it('Method #createElement Creates New InterReactionElement With compName (comp-name) And compId (comp-id)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne'
            })
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
        });
    
        it('Method #createElement Creates New InterReactionElement With compName (comp-name) And compGroup (comp-group)', () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
    
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
        });
    
        it('Method #createElement Creates New InterReactionElement With compName (comp-name), compId (comp-id) And compGroup (comp-group)', () => {
          groupedCompContainerLmnt.appendChild(
            interReaction.createElement({
              compName: 'InterReactionComponentOne',
              compId: 'InterReactionComponentOne',
              compGroup: 'TEST_GROUP'
            })
          );
    
          let irTestElements = groupedCompContainerLmnt.querySelectorAll(
              `${irElementTagName}[comp-name="InterReactionComponentOne"][comp-id="InterReactionComponentOne"][comp-group="TEST_GROUP"]`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
        });
      });

      describe('Negative Test Cases', () => {
        beforeEach(() => {
          resetDomTestContainer();
  
          singleCompContainerLmnt = document.querySelector(`#${testContainerId} > .${singleCompContainerClassName}`);
          groupedCompContainerLmnt = document.querySelector(`#${testContainerId} > .${groupedCompContainerClassName}`);
        });
  
        it('Method #createElement Creates New InterReactionElement Without compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement()
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
        });
  
        it('Method #createElement Creates New InterReactionElement With Empty String compName (comp-name)', () => {
          singleCompContainerLmnt.appendChild(
            interReaction.createElement({ compName: '' })
          );
    
          let irTestElements = singleCompContainerLmnt.querySelectorAll(
              `${irElementTagName}`
            );
    
          expect(irTestElements.length).to.equal(1);
          expect(typeof irTestElements[0]).to.equal('object');
          expect(irTestElements[0].constructor.name).to.equal('InterReactionElement');
        });
      });
    });
  };

const InterReactionCreateElementDomIntegrationTestRunner = Object.freeze({
    runTests
  });

export default InterReactionCreateElementDomIntegrationTestRunner;
