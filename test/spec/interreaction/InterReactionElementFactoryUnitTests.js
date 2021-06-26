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

import InterReactionElementFactory from 'interreaction/element/InterReactionElementFactory';

import InterReactionAttributeKeys from 'interreaction/InterReactionAttributeKeys';
import InterReactionPropertyKeys from 'interreaction/InterReactionPropertyKeys';

import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';
import InterReactionException from 'interreaction/InterReactionException';

const irAttributeKeyValPairs = {
    [InterReactionPropertyKeys.COMPONENT_NAME]: 'TEST_NAME',
    [InterReactionPropertyKeys.COMPONENT_ID]: 'TEST_ID',
    [InterReactionPropertyKeys.COMPONENT_GROUP]: 'TEST_GROUP',
    className: 'TEST_CLASSNAME',
    'some-other-attribute': 'TEST_ATTRIBUTE',
    'yet-some-other-attribute': 'TEST_ATTRIBUTE'
  };

const irPropertyKeyValPairs = {
    [InterReactionAttributeKeys.COMPONENT_NAME]: 'TEST_NAME',
    [InterReactionAttributeKeys.COMPONENT_ID]: 'TEST_ID',
    [InterReactionAttributeKeys.COMPONENT_GROUP]: 'TEST_GROUP',
    className: 'TEST_CLASSNAME FOOBAR',
    'some-other-attribute': 'TEST_ATTRIBUTE',
    'yet-some-other-attribute': 'TEST_ATTRIBUTE'
  };

describe('InterReactionElementFactory Unit Tests', () => {
  describe('Positive Test Cases', () => {
    describe('Instantiation With No Args Uses Defaults', () => {
      let interReactionElementFactory;
      
      before(() => {
        interReactionElementFactory = new InterReactionElementFactory();
      });

      it('Method #createElement, With No Args, Returns Instance Of InterReactionElement', () => {
        const interReactionElement = interReactionElementFactory.createElement();

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');
      });
      
      it((
        'Method #createElement, With Expected Key:Value Pairs Arg, Returns Instance Of InterReactionElement,'
        + ' With Expected Attributes'
      ), () => {
        const interReactionElement = interReactionElementFactory.createElement(
            irPropertyKeyValPairs
          );

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let irPropertyKey = InterReactionPropertyKeys[key];
          let expectedLmntAttrVal;

          if (typeof irPropertyKey === 'string') {
            expectedLmntAttrVal = irPropertyKeyValPairs[irPropertyKey];
          }

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionElement.className).to.be.a('string');

        expect(interReactionElement.className).to.include(
          irPropertyKeyValPairs.className
        );

        expect(
          interReactionElement.getAttribute('some-other-attribute')
        ).to.equal(
          irPropertyKeyValPairs['some-other-attribute']
        );
      });

      it((
        'Method #createElement, With Alternate, InterReactionElement Attribute-Keyed Key:Value Pairs Arg,'
        + ' Returns Instance Of InterReactionElement, With Expected Attributes'
      ), () => {
        const interReactionElement = interReactionElementFactory.createElement(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionElement.className).to.be.a('string');

        expect(interReactionElement.className).to.include(
          irAttributeKeyValPairs.className
        );

        expect(
          interReactionElement.getAttribute('some-other-attribute')
        ).to.equal(
          irAttributeKeyValPairs['some-other-attribute']
        );
      });

      it('Method #createElementString, With No Args, Returns Instance Of InterReactionElement String', () => {
        const interReactionElementStr = interReactionElementFactory.createElementString();

        expect(typeof interReactionElementStr).to.equal('string');
      });
      
      it((
        'Method #createElementString, With Expected Key:Value Pairs Arg, Returns Instance Of InterReactionElement String,'
        + ' Containing Expected Attributes'
      ), () => {
        const interReactionElementStr = interReactionElementFactory.createElementString(
            irPropertyKeyValPairs
          );

        expect(typeof interReactionElementStr).to.equal('string');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let irPropertyKey = InterReactionPropertyKeys[key];
          let expectedLmntAttrVal;

          if (typeof irPropertyKey === 'string') {
            expectedLmntAttrVal = irPropertyKeyValPairs[irPropertyKey];
          }

          if (typeof expectedLmntAttrVal === 'string') {
            expect(interReactionElementStr).to.include(
                `${InterReactionAttributeKeys[key]}="${expectedLmntAttrVal}"`
              );
          }
        });

        expect(interReactionElementStr).to.include(
          irPropertyKeyValPairs.className
        );

        expect(interReactionElementStr).to.include(
          `some-other-attribute="${irPropertyKeyValPairs['some-other-attribute']}"`
        );
      });

      it(('Method #createElementString, With Alternate, InterReactionElement Attribute-Keyed Key:Value Pairs Arg,'
        + ' Returns Instance Of InterReactionElement String, Containing Expected Attributes'
      ), () => {
        const interReactionElementStr = interReactionElementFactory.createElementString(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionElementStr).to.equal('string');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(interReactionElementStr).to.include(
                `${InterReactionAttributeKeys[key]}="${expectedLmntAttrVal}"`
              );
          }
        });

        expect(interReactionElementStr).to.include(
          irAttributeKeyValPairs.className
        );

        expect(interReactionElementStr).to.include(
          `some-other-attribute="${irAttributeKeyValPairs['some-other-attribute']}"`
        );
      });

      it('Method #createRootElement, With No Args, Returns Instance Of InterReactionElement', () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement();

        expect(typeof interReactionRootElement).to.equal('object');

        // This appears to be dependent upon instantiation / usage,
        // However, InterReactionRootElement extends InterReactionElement...
        expect(interReactionRootElement.constructor.name).to.be.oneOf([
          'InterReactionElement',
          'InterReactionRootElement'
        ]);
      });
      
      it((
        'Method #createRootElement, With Key:Value Pairs Arg, Returns Instance Of InterReactionElement,'
        + ' With Expected Attributes'
      ), () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionRootElement).to.equal('object');

        // This appears to be dependent upon instantiation / usage,
        // However, InterReactionRootElement extends InterReactionElement...
        expect(interReactionRootElement.constructor.name).to.be.oneOf([
          'InterReactionElement',
          'InterReactionRootElement'
        ]);

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionRootElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionRootElement.className).to.be.a('string');

        expect(interReactionRootElement.className).to.include(
          irAttributeKeyValPairs.className
        );

        expect(
          interReactionRootElement.getAttribute('some-other-attribute')
        ).to.equal(
          irAttributeKeyValPairs['some-other-attribute']
        );
      });
    });

    describe('Instantiation With Valid Args', () => {
      let interReactionElementFactory;
      
      before(() => {
        interReactionElementFactory = new InterReactionElementFactory(
            InterReactionConfigDefaults.TAGNAME,
            InterReactionConfigDefaults.INSTANCE_ID,
            [ InterReactionConfigDefaults.CLASSNAME ]
          );
      });

      it('Method #createElement, With No Args, Returns Instance Of InterReactionElement', () => {
        const interReactionElement = interReactionElementFactory.createElement();

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');
      });
      
      it((
        'Method #createElement, With Expected Key:Value Pairs Arg, Returns Instance Of InterReactionElement,'
        + ' With Expected Attributes'
      ), () => {
        const interReactionElement = interReactionElementFactory.createElement(
            irPropertyKeyValPairs
          );

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let irPropertyKey = InterReactionPropertyKeys[key];
          let expectedLmntAttrVal;

          if (typeof irPropertyKey === 'string') {
            expectedLmntAttrVal = irPropertyKeyValPairs[irPropertyKey];
          }

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionElement.className).to.be.a('string');

        expect(interReactionElement.className).to.include(
          irPropertyKeyValPairs.className
        );

        expect(
          interReactionElement.getAttribute('some-other-attribute')
        ).to.equal(
          irPropertyKeyValPairs['some-other-attribute']
        );
      });

      it((
        'Method #createElement, With Alternate, InterReactionElement Attribute-Keyed Key:Value Pairs Arg,'
        + ' Returns Instance Of InterReactionElement, With Expected Attributes'
      ), () => {
        const interReactionElement = interReactionElementFactory.createElement(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionElement.className).to.be.a('string');

        expect(interReactionElement.className).to.include(
          irAttributeKeyValPairs.className
        );

        expect(
          interReactionElement.getAttribute('some-other-attribute')
        ).to.equal(
          irAttributeKeyValPairs['some-other-attribute']
        );
      });

      it('Method #createElementString, With No Args, Returns Instance Of InterReactionElement String', () => {
        const interReactionElementStr = interReactionElementFactory.createElementString();

        expect(typeof interReactionElementStr).to.equal('string');
      });
      
      it((
        'Method #createElementString, With Expected Key:Value Pairs Arg, Returns Instance Of InterReactionElement String,'
        + ' Containing Expected Attributes'
      ), () => {
        const interReactionElementStr = interReactionElementFactory.createElementString(
            irPropertyKeyValPairs
          );

        expect(typeof interReactionElementStr).to.equal('string');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let irPropertyKey = InterReactionPropertyKeys[key];
          let expectedLmntAttrVal;

          if (typeof irPropertyKey === 'string') {
            expectedLmntAttrVal = irPropertyKeyValPairs[irPropertyKey];
          }

          if (typeof expectedLmntAttrVal === 'string') {
            expect(interReactionElementStr).to.include(
                `${InterReactionAttributeKeys[key]}="${expectedLmntAttrVal}"`
              );
          }
        });

        expect(interReactionElementStr).to.include(
          irPropertyKeyValPairs.className
        );

        expect(interReactionElementStr).to.include(
          `some-other-attribute="${irPropertyKeyValPairs['some-other-attribute']}"`
        );
      });

      it(('Method #createElementString, With Alternate, InterReactionElement Attribute-Keyed Key:Value Pairs Arg,'
        + ' Returns Instance Of InterReactionElement String, Containing Expected Attributes'
      ), () => {
        const interReactionElementStr = interReactionElementFactory.createElementString(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionElementStr).to.equal('string');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(interReactionElementStr).to.include(
                `${InterReactionAttributeKeys[key]}="${expectedLmntAttrVal}"`
              );
          }
        });

        expect(interReactionElementStr).to.include(
          irAttributeKeyValPairs.className
        );

        expect(interReactionElementStr).to.include(
          `some-other-attribute="${irAttributeKeyValPairs['some-other-attribute']}"`
        );
      });

      it('Method #createRootElement, With No Args, Returns Instance Of InterReactionElement', () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement();

        expect(typeof interReactionRootElement).to.equal('object');
        expect(interReactionRootElement.constructor.name).to.equal('InterReactionElement');
      });
      
      it((
        'Method #createRootElement, With Key:Value Pairs Arg, Returns Instance Of InterReactionElement,'
        + ' With Expected Attributes'
      ), () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement(
            irAttributeKeyValPairs
          );

        expect(typeof interReactionRootElement).to.equal('object');
        expect(interReactionRootElement.constructor.name).to.equal('InterReactionElement');

        Object.keys(InterReactionAttributeKeys).forEach((key) => {
          let expectedLmntAttrVal = irAttributeKeyValPairs[
              InterReactionAttributeKeys[key]
            ];

          if (typeof expectedLmntAttrVal === 'string') {
            expect(
              interReactionRootElement.getAttribute(
                InterReactionAttributeKeys[key]
              )
            ).to.equal(expectedLmntAttrVal);
          }
        });

        expect(interReactionRootElement.className).to.be.a('string');

        expect(interReactionRootElement.className).to.include(
          irAttributeKeyValPairs.className
        );

        expect(
          interReactionRootElement.getAttribute('some-other-attribute')
        ).to.equal(
          irAttributeKeyValPairs['some-other-attribute']
        );
      });
    });

    describe('Instantiation With Valid Args, With Space-delimited And Extraneous Spaces className Variations', () => {
      let interReactionElementFactory;
      
      before(() => {
        interReactionElementFactory = new InterReactionElementFactory(
            InterReactionConfigDefaults.TAGNAME,
            InterReactionConfigDefaults.INSTANCE_ID,
            [
              `${InterReactionConfigDefaults.CLASSNAME} ${InterReactionConfigDefaults.CLASSNAME}`,
              `${InterReactionConfigDefaults.CLASSNAME}_1      `
            ]
          );
      });

      it('Method #createElement, With No Args, Returns Instance Of InterReactionElement', () => {
        const interReactionElement = interReactionElementFactory.createElement();

        expect(typeof interReactionElement).to.equal('object');
        expect(interReactionElement.constructor.name).to.equal('InterReactionElement');
      });

      it((
        'Method #createRootElement, With Valid Args, With Space-delimited Variation, Returns Instance Of InterReactionElement,'
        + ' Has className'
      ), () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement({
            className: `${InterReactionConfigDefaults.CLASSNAME} ${InterReactionConfigDefaults.CLASSNAME}`
          });

        expect(typeof interReactionRootElement).to.equal('object');
        expect(interReactionRootElement.constructor.name).to.equal('InterReactionElement');
        expect(interReactionRootElement.className).to.include(InterReactionConfigDefaults.CLASSNAME);
      });

      it((
        'Method #createRootElement, With Valid Args, With Extraneous Spaces Variation, Returns Instance Of InterReactionElement,'
        + ' Has className'
      ), () => {
        const interReactionRootElement = interReactionElementFactory.createRootElement({
            className: `${InterReactionConfigDefaults.CLASSNAME}      `
          });

        expect(typeof interReactionRootElement).to.equal('object');
        expect(interReactionRootElement.constructor.name).to.equal('InterReactionElement');
      });
    });
  });

  describe('Negative Test Cases', () => {
    it('Instantiation With Invalid Custom Element Tagname Arg Throws Exception', () => {
      const testFunc = function() {
          new InterReactionElementFactory('foobar');
        };

      expect(testFunc).to.throw().to.be.instanceOf(InterReactionException);
    });
  });
});
