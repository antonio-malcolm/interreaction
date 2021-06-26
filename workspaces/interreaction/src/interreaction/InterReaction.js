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
import InterReactionUtils from 'interreaction/InterReactionUtils';
import InterReactionValidations from 'interreaction/InterReactionValidations';

const irElementAssignMethods = Object.freeze({
  APPEND: 'append',
  PREPEND: 'prepend',
  REPLACE: 'replace' 
});

const availableIrElementAssignMethods = Object.values(irElementAssignMethods);

const InterReaction = function(
  interReactionElementFactory,
  interReactionPortalsManager,
  componentNamesToComponents,
  interReactionElementTagName,
  interReactionElementClassNames,
  shouldEnableDebugging
) {
  if (shouldEnableDebugging !== true) {
    shouldEnableDebugging = false;
  }

  /**
   * Internal fields...
   */

  const interReactionValidations = new InterReactionValidations(shouldEnableDebugging);

  /**
   * Internal methods...
   */

  const assignIrElementToDomElement = function(irElement, domLmnt, assignMethod) {
    switch (assignMethod) {
      case irElementAssignMethods.PREPEND:
        let prependableElement = domLmnt.firstChild;

        if (InterReactionUtils.isAssignedNotNull(prependableElement)) {
          domLmnt.insertBefore(irElement, prependableElement);
        } else {
          domLmnt.appendChild(irElement);
        }

        break;

      case irElementAssignMethods.REPLACE:
        if (typeof domLmnt.replaceChildren === 'function') {
          domLmnt.replaceChildren();
        } else {
          let replaceableElement;

          while (replaceableElement = domLmnt.firstChild) {
            if (typeof replaceableElement.remove === 'function') {
              replaceableElement.remove();
            } else {
              domLmnt.removeChild(replaceableElement);
            }
          }
        }

        domLmnt.appendChild(irElement);
        break;

      default:
        domLmnt.appendChild(irElement);
        break;
    }
  };

  const assignIrElementsToDomElementsByDetailsAndSelector = function(details, querySelector, assignMethod) {
    let assignableDomElements = Array.from(
        document.querySelectorAll(querySelector)
      );

    if (!InterReactionUtils.isNonEmptyArray(assignableDomElements)) {
      if (shouldEnableDebugging) {
        console.warn(
          `InterReaction#assignIrElementToDomElementBySelector: no assignable elements found, with query selector: "${querySelector}". Skipping...`
        );
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyString(assignMethod)) {
      assignMethod = irElementAssignMethods.APPEND;
    }

    if (availableIrElementAssignMethods.indexOf(assignMethod) < 0) {
      if (shouldEnableDebugging) {
        console.warn(`InterReaction#assignIrElementToDomElement: assignMethod ${assignMethod} is not valid - defaulting to append...`);
        console.warn(
          'InterReaction#assignIrElementToDomElement: available assignMethod values are:'
          + ` ${InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(availableIrElementAssignMethods)}.`
        );
      }

      assignMethod = irElementAssignMethods.APPEND;
    }

    assignableDomElements.forEach((domLmnt) => {
      assignIrElementToDomElement(
        interReactionElementFactory.createElement(details),
        domLmnt,
        assignMethod
      );
    });
  };

  const findParentIrElementsByDetails = function(details, callerName) {
    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];

    const querySelector = `${interReactionElementTagName}[${InterReactionAttributeKeys.COMPONENT_NAME}="${compName}"]`
      + `${(InterReactionUtils.isNonEmptyString(compId, true)) ? `[${InterReactionAttributeKeys.COMPONENT_ID}="${compId}"]` : ''}`;

    let parentIrElements = document.querySelectorAll(querySelector);

    if (!(InterReactionUtils.isAssignedNotNull(parentIrElements) && parentIrElements.length > 0)) {
      if (shouldEnableDebugging) {
        console.warn(
          `${callerName ? `InterReaction#${callerName}` : 'InterReaction'}):`
          + ` no interReaction <${interReactionElementTagName}> element found, by query selector: "${querySelector}"`
        );
      }

      parentIrElements = [];
    } else {
      // Enforce uniqueness on #compId - process only first found...
      if (InterReactionUtils.isNonEmptyString(compId, true)) {
        parentIrElements = [ parentIrElements[0] ];
      } else {
        parentIrElements = Array.from(parentIrElements);
      }
    }

    return parentIrElements;
  };

  /**
   * Exposed methods...
   */

  const createElement = interReactionElementFactory.createElement;

  const createAssignToDomElement = function(details, domLmnt, assignMethod) {
    if (!document.body.contains(domLmnt)) {
      if (shouldEnableDebugging) {
        console.warn('InterReaction#createAssignToDomElement: DOM node is null or undefined. Skipping...');
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyString(assignMethod)) {
      assignMethod = irElementAssignMethods.APPEND;
    }

    if (availableIrElementAssignMethods.indexOf(assignMethod) < 0) {
      if (shouldEnableDebugging) {
        console.warn(`InterReaction#createAssignToDomElement: assignMethod ${assignMethod} is not valid - defaulting to append...`);
        console.warn(
          'InterReaction#createAssignToDomElement: available assignMethod values are:'
          + ` ${InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(availableIrElementAssignMethods)}.`
        );
      }

      assignMethod = irElementAssignMethods.APPEND;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
          details,
          'createAssignToDomElement'
      )) {
        return;
      }

      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach((detail) => {
        if (!interReactionValidations.doDetailsContainRequiredProperties(
          detail,
          componentNamesToComponents,
          'createAssignToDomElement',
          false
        )) {
          return;
        }

        assignIrElementToDomElement(
          interReactionElementFactory.createElement(detail),
          domLmnt,
          assignMethod
        );

        assignNewComponentsToElementsByDetails(detail);
      });
    } else {
      if (!interReactionValidations.doDetailsContainRequiredProperties(
        details,
        componentNamesToComponents,
        'createAssignToDomElement',
        false
      )) {
        return;
      }

      assignIrElementToDomElement(
        interReactionElementFactory.createElement(details),
        domLmnt,
        assignMethod
      );

      assignNewComponentsToElementsByDetails(details);
    }
  };

  const createAssignToDomSelector = function(details, querySelector, assignMethod) {
    if (!InterReactionUtils.isNonEmptyString(querySelector, true)) {
      if (shouldEnableDebugging) {
        console.warn('InterReaction#createAssignToDomSelector: query selector is empty, null, or undefined. Skipping...');
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyString(assignMethod)) {
      assignMethod = irElementAssignMethods.APPEND;
    }

    if (availableIrElementAssignMethods.indexOf(assignMethod) < 0) {
      if (shouldEnableDebugging) {
        console.warn(`InterReaction#createAssignToDomSelector: assignMethod ${assignMethod} is not valid - defaulting to append...`);
        console.warn(
          'InterReaction#createAssignToDomSelector: available assignMethod values are:'
          + ` ${InterReactionUtils.convertArrayToCommaDelimitedStringWithAndOr(availableIrElementAssignMethods)}.`
        );
      }

      assignMethod = irElementAssignMethods.APPEND;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
          details,
          'createAssignToDomSelector'
      )) {
        return;
      }

      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach((detail) => {
        if (!interReactionValidations.doDetailsContainRequiredProperties(
          detail,
          componentNamesToComponents,
          'createAssignToDomSelector',
          false
        )) {
          return;
        }

        assignIrElementsToDomElementsByDetailsAndSelector(
          detail,
          querySelector,
          assignMethod
        );

        assignNewComponentsToElementsByDetails(detail);
      });
    } else {
      if (!interReactionValidations.doDetailsContainRequiredProperties(
        details,
        componentNamesToComponents,
        'createAssignToDomSelector',
        false
      )) {
        return;
      }

      assignIrElementsToDomElementsByDetailsAndSelector(
        details,
        querySelector,
        assignMethod
      );

      assignNewComponentsToElementsByDetails(details);
    }
  };

  const assignNewComponentToElement = function(parentIrElement, compProps, groupName) {
    if (!interReactionValidations.doesInterReactionElementContainRequiredAttributes(
      parentIrElement,
      componentNamesToComponents,
      'assignNewComponentToElement'
    )) {
      return;
    }

    const compName = parentIrElement.getAttribute(InterReactionAttributeKeys.COMPONENT_NAME);
    const comp = componentNamesToComponents[compName];

    if (!InterReactionUtils.isNonEmptyString(groupName)) {
      if (parentIrElement.hasAttribute(InterReactionAttributeKeys.COMPONENT_GROUP)) {
        groupName = parentIrElement.getAttribute(InterReactionAttributeKeys.COMPONENT_GROUP);
      }
    }

    if (InterReactionUtils.isNonEmptyArray(interReactionElementClassNames)) {
      interReactionElementClassNames.forEach((className) => {
        if (!parentIrElement.classList.contains(className)) {
          parentIrElement.classList.add(className);
        }
      });
    }

    interReactionPortalsManager.assignNewPortaledComponentToElement(
      comp,
      parentIrElement,
      compProps,
      groupName
    );
  };
  
  const assignNewComponentsToElements = function() {
    const parentIrElements = document.querySelectorAll(
      interReactionElementTagName
    );

    if (!(parentIrElements && parentIrElements.length)) {
      if (shouldEnableDebugging) {
        console.info(
          `InterReaction#assignNewComponentsToElements:`
          + ` No predefined ${interReactionElementTagName} elements found, on initial page load. `
          + ` Waiting, for method calls...`
        );
      }

      return;
    }

    parentIrElements.forEach(function(lmnt) {
      assignNewComponentToElement(lmnt);
    });
  };    
  
  const assignNewComponentsToElementsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'assignNewComponentsToElementsByDetails',
      false
    )) {
      return;
    }

    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compProps = details[InterReactionPropertyKeys.COMPONENT_PROPS];

    const parentIrElements = findParentIrElementsByDetails(
      details,
      'assignNewComponentsToElementsByDetails',
      false
    );

    parentIrElements.every((lmnt, idx) => {
      assignNewComponentToElement(lmnt, compProps, compGroup);

      // Enforce uniqueness on #compId - process only first found...
      if (InterReactionUtils.isNonEmptyString(compId, true) && idx === 0) {
        return false;
      }

      return true;
    });
  };
  
  const assignNewComponentsToElementsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'assignNewComponentsToElementsByDetailsWithList'
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach((details) => {
        assignNewComponentsToElementsByDetails(details);
      });
    } else {
      assignNewComponentsToElementsByDetails(details);
    }
  };

  const mountComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'mountComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.mountPortaledComponentByNameAndId(
        compName,
        compId
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        interReactionPortalsManager.mountPortaledComponentsByGroupName(
          compGroup
        );
      } else {
        interReactionPortalsManager.mountPortaledComponentsByName(
          compName
        );
      }
    }
  };

  const mountComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'mountComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(compDetls) {
        mountComponentsByDetails(compDetls);
      });
    } else {
      mountComponentsByDetails(details);
    }
  };

  const remountComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'remountComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.remountPortaledComponentByNameAndId(
        compName,
        compId
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        interReactionPortalsManager.remountPortaledComponentsByGroupName(
          compGroup
        );
      } else {
        interReactionPortalsManager.remountPortaledComponentsByName(
          compName
        );
      }
    }
  };

  const remountComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'remountComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(compDetls) {
        remountComponentsByDetails(compDetls);
      });
    } else {
      remountComponentsByDetails(details);
    }
  };

  const removeComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'removeComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];
    let shouldRemoveElement = details[InterReactionPropertyKeys.SHOULD_REMOVE_ELEMENT];
    let shouldRemoveElementByGroup = false;

    if (shouldRemoveElement !== true) {
      shouldRemoveElement = false;
    }

    const removeParentIrElements = function() {
      if (shouldRemoveElement) {
        let parentIrElements = findParentIrElementsByDetails(details, 'removeComponentsByDetails');
  
        if (shouldRemoveElementByGroup) {
          parentIrElements = Array.from(
              document.querySelectorAll(
                `${interReactionElementTagName}[${InterReactionAttributeKeys.COMPONENT_GROUP}="${compGroup}"]`
              )
            );
        } else {
          parentIrElements = findParentIrElementsByDetails(details, 'removeComponentsByDetails');
        }
  
        parentIrElements.every(function(lmnt, idx) {
          if (typeof lmnt.remove === 'function') {
            lmnt.remove();
          } else { 
            if (InterReactionUtils.assignedNotNull(lmnt.parentNode)) {
              lmnt.parentNode.removeChild(lmnt);
            }
          }
  
          // Enforce uniqueness on #compId - process only first found...
          if (InterReactionUtils.isNonEmptyString(compId, true) && idx === 0) {
            return false;
          }
  
          return true;
        });
      }
    };

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.removePortaledComponentByNameAndId(
        compName,
        compId,
        removeParentIrElements
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        shouldRemoveElementByGroup = true;

        interReactionPortalsManager.removePortaledComponentsByGroupName(
          compGroup,
          removeParentIrElements
        );
      } else {
        interReactionPortalsManager.removePortaledComponentsByName(
          compName,
          removeParentIrElements
        );
      }
    }
  };

  const removeComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'removeComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(compDetls) {
        removeComponentsByDetails(compDetls);
      });
    } else {
      removeComponentsByDetails(details);
    }
  };

  const replaceComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'replaceComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const replacementCompName = details[InterReactionPropertyKeys.COMPONENT_REPLACEMENT];

    if (!(replacementCompName && replacementCompName.length)) {
      if (shouldEnableDebugging) {
        console.warn(
          'InterReaction#replaceComponentsByDetails:'
          + ' No replacement component name provided with event details property:'
          + ` "${InterReactionPropertyKeys.COMPONENT_REPLACEMENT}".`
          + ' Skipping...'
        );
      }

      return;
    }

    const replacementComp = componentNamesToComponents[replacementCompName];

    if (!InterReactionUtils.isAssignedNotNull(replacementComp)) {
      if (shouldEnableDebugging) {
        console.warn(
         'InterReaction#replaceComponentsByDetails:'
          + ` No replacement component found, which matches value "${replacementCompName}",`
          + ` for details property: "${InterReactionPropertyKeys.COMPONENT_REPLACEMENT}".`
          + ' Skipping...'
        );
      }

      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];
    const compProps = details[InterReactionPropertyKeys.COMPONENT_PROPS];
    let shouldUpdateElementByGroup = false;

    const updateParentIrElements = function(newCompName, prevCompName, compId) {
      let parentIrElements = [];

      if (shouldUpdateElementByGroup) {
        parentIrElements = Array.from(
            document.querySelectorAll(
              `${interReactionElementTagName}[${InterReactionAttributeKeys.COMPONENT_GROUP}="${compGroup}"]`
            )
          );
      } else {
        const irLmntUpdateDetails = {
            [InterReactionPropertyKeys.COMPONENT_NAME]: prevCompName
          };
  
        if (InterReactionUtils.isNonEmptyString(compId)) {
          irLmntUpdateDetails[InterReactionPropertyKeys.COMPONENT_ID] = compId
        }

        parentIrElements = findParentIrElementsByDetails(irLmntUpdateDetails, 'replaceComponentsByDetails');
      }

      parentIrElements.every((lmnt, idx) => {
        lmnt.setAttribute(
          InterReactionAttributeKeys.COMPONENT_NAME,
          newCompName
        );

        lmnt.setAttribute(
          InterReactionAttributeKeys.COMPONENT_REPLACED,
          prevCompName
        );

        // Enforce uniqueness on #compId - process only first found...
        if (InterReactionUtils.isNonEmptyString(compId, true) && idx === 0) {
          return false;
        }

        return true;
      });
    };

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.replacePortaledComponentByNameAndId(
        compName,
        compId,
        replacementCompName,
        replacementComp,
        compProps,
        updateParentIrElements
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        shouldUpdateElementByGroup = true;

        interReactionPortalsManager.replacePortaledComponentsByGroupName(
          compGroup,
          replacementCompName,
          replacementComp,
          compProps,
          updateParentIrElements
        );
      } else {
        interReactionPortalsManager.replacePortaledComponentsByName(
          compName,
          replacementCompName,
          replacementComp,
          compProps,
          updateParentIrElements
        );
      }
    }
  };
  
  const replaceComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'replaceComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(details) {
        replaceComponentsByDetails(details);
      });
    } else {
      replaceComponentsByDetails(details);
    }
  };

  const toggleMountComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'toggleMountComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.toggleMountPortaledComponentByNameAndId(
        compName,
        compId
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        interReactionPortalsManager.toggleMountPortaledComponentsByGroupName(
          compGroup
        );
      } else {
        interReactionPortalsManager.toggleMountPortaledComponentsByName(
          compName
        );
      }
    }
  };

  const toggleMountComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'toggleMountComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(compDetls) {
        toggleMountComponentsByDetails(compDetls);
      });
    } else {
      toggleMountComponentsByDetails(details);
    }
  };

  const unmountComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'unmountComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.unmountPortaledComponentByNameAndId(
        compName,
        compId
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        interReactionPortalsManager.unmountPortaledComponentsByGroupName(
          compGroup
        );
      } else {
        interReactionPortalsManager.unmountPortaledComponentsByName(
          compName
        );
      }
    }
  };

  const unmountComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'unmountComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(compDetls) {
        unmountComponentsByDetails(compDetls);
      });
    } else {
      unmountComponentsByDetails(details);
    }
  };

  const updateComponentsByDetails = function(details) {
    if (!interReactionValidations.doDetailsContainRequiredProperties(
      details,
      componentNamesToComponents,
      'updateComponentsByDetails',
      false,
      true
    )) {
      return;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compId = details[InterReactionPropertyKeys.COMPONENT_ID];
    const compProps = details[InterReactionPropertyKeys.COMPONENT_PROPS];

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      interReactionPortalsManager.updatePortaledComponentByNameAndId(
        compName,
        compId,
        compProps
      );
    } else {
      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        interReactionPortalsManager.updatePortaledComponentsByGroupName(
          compGroup,
          compProps
        );
      } else {
        interReactionPortalsManager.updatePortaledComponentsByName(
          compName,
          compProps
        );
      }
    }
  };
  
  const updateComponentsByDetailsWithList = function(details) {
    if (!interReactionValidations.doDetailsContainMinimumExpectedProperties(
        details,
        'updateComponentsByDetailsWithList',
        true
    )) {
      return;
    }

    if (details.hasOwnProperty(InterReactionPropertyKeys.COMPONENT_LIST)) {
      details[InterReactionPropertyKeys.COMPONENT_LIST].forEach(function(details) {
        updateComponentsByDetails(details);
      });
    } else {
      updateComponentsByDetails(details);
    }
  };

  return Object.freeze({
    createAssignToDomElement,
    createAssignToDomSelector,
    createElement,
    assignNewComponentToElement,
    assignNewComponentsToElements,
    assignNewComponentsToElementsByDetails,
    assignNewComponentsToElementsByDetailsWithList,
    mountComponentsByDetails,
    mountComponentsByDetailsWithList,
    remountComponentsByDetails,
    remountComponentsByDetailsWithList,
    removeComponentsByDetails,
    removeComponentsByDetailsWithList,
    replaceComponentsByDetails,
    replaceComponentsByDetailsWithList,
    toggleMountComponentsByDetails,
    toggleMountComponentsByDetailsWithList,
    unmountComponentsByDetails,
    unmountComponentsByDetailsWithList,
    updateComponentsByDetails,
    updateComponentsByDetailsWithList
  });
};

export default InterReaction;
