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

import InterReactionAttributeKeys from 'interreaction/InterReactionAttributeKeys';
import InterReactionPropertyKeys from 'interreaction/InterReactionPropertyKeys';
import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';
import InterReactionException from 'interreaction/InterReactionException';
import InterReactionUtils from 'interreaction/InterReactionUtils';

const InterReactionElementFactory = function(
  interReactionElementTagName,
  interReactionInstanceId,
  interReactionElementClassNames
) {
  const customElementRegistry = window.customElements;

  if (!InterReactionUtils.isAssignedNotNull(customElementRegistry)) {
    throw new InterReactionException(
      'Web Components Custom Elements API is not present on window!'
      + ' Check module: InterReactionWebComponentsLoader, to ensure polyfill is loaded, in absence of native browser support.',
      'InterReactionElementFactory'
    );
  }

  let rootInterReactionElementTagName = 'root';

  if (!InterReactionUtils.isNonEmptyString(interReactionInstanceId, true)) {
    interReactionInstanceId = InterReactionConfigDefaults.INSTANCE_ID;
  }

  if (!InterReactionUtils.isNonEmptyString(interReactionElementTagName, true)) {
    interReactionElementTagName = InterReactionConfigDefaults.TAGNAME;
  }

  if (!InterReactionUtils.isNonEmptyArray(interReactionElementClassNames)) {
    interReactionElementClassNames = [];
  }

  interReactionElementClassNames.forEach((className, idx, classNames) => {
    if (/\s/.test(className)) {
      className.split(/\s/).forEach((clsNm) => {
        clsNm = clsNm.trim();

        if (InterReactionUtils.isNonEmptyString(clsNm, true)) {
          classNames.push(clsNm);
        }
      });

      classNames.splice(idx, 1);
    }
  });

  rootInterReactionElementTagName = `${interReactionElementTagName}-${rootInterReactionElementTagName}`;

  let InterReactionElement = class extends HTMLElement {
    constructor() {
      super();
    }
  };
  
  let InterReactionRootElement = class extends InterReactionElement {
    constructor() {
      super();
    }
  };

  if (InterReactionUtils.isAssignedNotNull(
    customElementRegistry.get(interReactionElementTagName)
  )) {
    InterReactionElement = customElementRegistry.get(interReactionElementTagName);
  } else {
    try {
      customElementRegistry.define(
        interReactionElementTagName,
        InterReactionElement
      );
    } catch (ex) {
      throw new InterReactionException(
        `Web Components Custom Elements Registry failed to define element with tagname "${interReactionElementTagName}"! \n${ex}`,
        'InterReactionElementFactory'
      );
    }

    const existingInterReactionElements = document.getElementsByTagName(
        interReactionElementTagName
      );
    
    for (let lmnt of existingInterReactionElements) {
      customElementRegistry.upgrade(lmnt);
    }
  }

  if (InterReactionUtils.isAssignedNotNull(
    customElementRegistry.get(rootInterReactionElementTagName)
  )) {
    InterReactionRootElement = customElementRegistry.get(interReactionElementTagName);
  } else {
    try {
      customElementRegistry.define(
        rootInterReactionElementTagName,
        InterReactionRootElement
      );
    } catch (ex) {
      throw new InterReactionException(
        `Web Components Custom Elements Registry failed to define root element with tagname "${rootInterReactionElementTagName}"! \n${ex}`,
        'InterReactionElementFactory'
      );
    }

    const existingInterReactionRootElements = document.getElementsByTagName(
        rootInterReactionElementTagName
      );
    
    for (let lmnt of existingInterReactionRootElements) {
      customElementRegistry.upgrade(lmnt);
    }
  }

  const getElementAttributesFromKeyValPairs = (pairs, shouldProvideExtraneousPairsAsString) => {
    if (shouldProvideExtraneousPairsAsString !== true) {
      shouldProvideExtraneousPairsAsString = false;
    }

    const elementAttributes = {};
    let compName;
    let compGroup;
    let compId;

    if (shouldProvideExtraneousPairsAsString) {
      elementAttributes.xtraKeyValsStr = '';
    } else {
      elementAttributes.xtraKeyVals = {};
    }

    if (InterReactionUtils.isNonEmptyObject(pairs)) {
      pairs = { ...pairs };

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionAttributeKeys.COMPONENT_NAME])) {
        compName = String(
            pairs[InterReactionAttributeKeys.COMPONENT_NAME]
          ).trim();

        delete pairs[InterReactionAttributeKeys.COMPONENT_NAME];
      }

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionPropertyKeys.COMPONENT_NAME])) {
        compName = String(
            pairs[InterReactionPropertyKeys.COMPONENT_NAME]
          ).trim();

        delete pairs[InterReactionPropertyKeys.COMPONENT_NAME];
      }

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionAttributeKeys.COMPONENT_GROUP])) {
        compGroup = String(
            pairs[InterReactionAttributeKeys.COMPONENT_GROUP]
          ).trim();

        delete pairs[InterReactionAttributeKeys.COMPONENT_GROUP];
      }

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionPropertyKeys.COMPONENT_GROUP])) {
        compGroup = String(
            pairs[InterReactionPropertyKeys.COMPONENT_GROUP]
          ).trim();

        delete pairs[InterReactionPropertyKeys.COMPONENT_GROUP];
      }

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionAttributeKeys.COMPONENT_ID])) {
        compId = String(
            pairs[InterReactionAttributeKeys.COMPONENT_ID]
          ).trim();

        delete pairs[InterReactionAttributeKeys.COMPONENT_ID];
      }

      if (InterReactionUtils.isAssignedNotNull(pairs[InterReactionPropertyKeys.COMPONENT_ID])) {
        compId = String(
            pairs[InterReactionPropertyKeys.COMPONENT_ID]
          ).trim();

        delete pairs[InterReactionPropertyKeys.COMPONENT_ID];
      }

      Object.keys(pairs).forEach((key) => {
        let val = String(pairs[key]).trim();
        key = key.trim();

        if (InterReactionUtils.isNonEmptyString(val, true)) {
          if (key === 'className' || key === 'class') {
            elementAttributes.className = val;
          } else {
            if (shouldProvideExtraneousPairsAsString) {
              if (!InterReactionUtils.isNonEmptyString(elementAttributes.xtraKeyValsStr, true)) {
                elementAttributes.xtraKeyValsStr = `${key}="${val}"`;
              } else {
                elementAttributes.xtraKeyValsStr = `${elementAttributes.keyValStr} ${key}="${val}"`;
              }
            } else {
              elementAttributes.xtraKeyVals[key] = val;
            }
          }
        }
      });
    }

    if (!InterReactionUtils.isNonEmptyString(compName, true)) {
      console.warn(
        `InterReactionElementFactory: each ${interReactionElementTagName} element should have a ${InterReactionAttributeKeys.COMPONENT_NAME} attribute which corresponds to a React component!`
      );
    }

    elementAttributes.compName = compName;
    elementAttributes.compGroup = compGroup;
    elementAttributes.compId = compId;

    if (InterReactionUtils.isNonNullObject(elementAttributes.xtraKeyVals)) {
      Object.freeze(elementAttributes.xtraKeyVals)
    }

    return Object.freeze(elementAttributes);
  };

  const createElement = (attributeKeysToValues = {}) => {
    const interReactionElement = new InterReactionElement();
    let elementClassNames = [ ...interReactionElementClassNames ];

    const elementAttributes = getElementAttributesFromKeyValPairs(attributeKeysToValues);

    interReactionElement.setAttribute(
        InterReactionAttributeKeys.INTERREACTION_INSTANCE_ID,
        interReactionInstanceId
      );

    if (InterReactionUtils.isNonEmptyString(elementAttributes.compName, true)) {
      interReactionElement.setAttribute(
          InterReactionAttributeKeys.COMPONENT_NAME,
          elementAttributes.compName
        );
    }

    if (InterReactionUtils.isNonEmptyString(elementAttributes.compGroup, true)) {
      interReactionElement.setAttribute(
          InterReactionAttributeKeys.COMPONENT_GROUP,
          elementAttributes.compGroup
        );
    }

    if (InterReactionUtils.isNonEmptyString(elementAttributes.compId, true)) {
      interReactionElement.setAttribute(
          InterReactionAttributeKeys.COMPONENT_ID,
          elementAttributes.compId
        );
    }

    if (InterReactionUtils.isNonEmptyString(elementAttributes.className, true)) {
      if (/\s/.test(elementAttributes.className)) {
        elementAttributes.className.split(/\s/).forEach((className) => {
          className = className.trim();

          if (InterReactionUtils.isNonEmptyString(className, true)) {
            elementClassNames.push(className);
          }
        });
      } else {
        elementClassNames.push(elementAttributes.className);
      }
    }

    if (InterReactionUtils.isNonEmptyArray(elementClassNames)) {
      elementClassNames.forEach((className) => {
        if (InterReactionUtils.isNonEmptyString(className, true)) {
          className = className.trim();

          if (!interReactionElement.classList.contains(className)) {
            interReactionElement.classList.add(className);
          }
        }
      });
    }

    Object.keys(elementAttributes.xtraKeyVals).forEach((key) => {
      if (InterReactionUtils.isNonEmptyString(
        elementAttributes.xtraKeyVals[key],
        true
      )) {
        interReactionElement.setAttribute(key, elementAttributes.xtraKeyVals[key]);
      }
    });

    return interReactionElement;
  };

  const createElementString = (attributeKeysToValues = {}) => {
    const elementAttributes = getElementAttributesFromKeyValPairs(attributeKeysToValues, true);
    let elementAttributeString = `${InterReactionAttributeKeys.INTERREACTION_INSTANCE_ID}="${interReactionInstanceId}"`;
    let elementClassName = interReactionElementClassNames.join(' ');
    let compName = elementAttributes.compName;
    let compGroup = elementAttributes.compGroup;
    let compId = elementAttributes.compId;

    if (InterReactionUtils.isNonEmptyString(elementAttributes.className, true)) {
      if (InterReactionUtils.isNonEmptyString(elementClassName, true)) {
        elementClassName = `${elementClassName} ${elementAttributes.className}`;
      } else {
        elementClassName = elementAttributes.className;
      }
    }

    compName = `${InterReactionUtils.isNonEmptyString(compName, true) ? ` ${InterReactionAttributeKeys.COMPONENT_NAME}="${compName}"` : ''}`;
    compGroup = `${InterReactionUtils.isNonEmptyString(compGroup, true) ? ` ${InterReactionAttributeKeys.COMPONENT_GROUP}="${compGroup}"` : ''}`;
    compId = `${InterReactionUtils.isNonEmptyString(compId, true) ? ` ${InterReactionAttributeKeys.COMPONENT_ID}="${compId}"` : ''}`;
    elementClassName = `${InterReactionUtils.isNonEmptyString(elementClassName, true) ? ` class="${elementClassName}"` : ''}`;
    elementAttributeString = `${elementAttributeString}${compName}${compId}${compGroup}${elementClassName}`;

    if (InterReactionUtils.isNonEmptyString(elementAttributes.xtraKeyValsStr, true)) {
      elementAttributeString = `${elementAttributeString} ${elementAttributes.xtraKeyValsStr}`;
    }

    return `<${interReactionElementTagName} ${elementAttributeString}></${interReactionElementTagName}>`;
  };

  const createRootElement = (attributeKeysToValues = {}) => {
    const interReactionRootElement = new InterReactionRootElement();

    interReactionRootElement.setAttribute(
        InterReactionAttributeKeys.INTERREACTION_INSTANCE_ID,
        interReactionInstanceId
      );

    if (InterReactionUtils.isNonNullObject(attributeKeysToValues)) {
      Object.keys(attributeKeysToValues).forEach((key) => {
        let val = String(attributeKeysToValues[key]).trim();
        key = key.trim();

        if (InterReactionUtils.isNonEmptyString(val, true)) {
          if (key === 'className' || key === 'class') {
            if (/\s/.test(val)) {
              val.split(/\s/).forEach((className) => {
                className = className.trim();

                if (InterReactionUtils.isNonEmptyString(className, true)) {
                  if (!interReactionRootElement.classList.contains(className)) {
                    interReactionRootElement.classList.add(className);
                  }
                }
              });
            } else {
              if (!interReactionRootElement.classList.contains(val)) {
                interReactionRootElement.classList.add(val);
              }
            }
          } else {
            interReactionRootElement.setAttribute(key, val);
          }
        }
      });
    }

    return interReactionRootElement;
  };

  return Object.freeze({
    createElement,
    createElementString,
    createRootElement
  });
};

export default InterReactionElementFactory;
