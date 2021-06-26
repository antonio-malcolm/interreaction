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

const callerNameDefault = 'InterReactionValidations';

const InterReactionValidations = function(shouldEnableDebugging) {
  const doDetailsContainMinimumExpectedProperties = function(
    details,
    callerName,
    shouldAllowCompGroupAsRequiredInsteadOfName
  ) {
    if (!InterReactionUtils.isNonEmptyString(callerName, true)) {
      callerName = callerNameDefault;
    }

    if (!InterReactionUtils.isNonEmptyObject(details)) {
      if (shouldEnableDebugging) {
        console.warn(
          `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ' No details provided, for React component matching or assignment!'
        );
      }

      return false;
    }

    if (shouldAllowCompGroupAsRequiredInsteadOfName !== true) {
      shouldAllowCompGroupAsRequiredInsteadOfName = false;
    }

    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    const compList = details[InterReactionPropertyKeys.COMPONENT_LIST];
    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
  
    if (!InterReactionUtils.isNonEmptyString(compName)) {
      if (!InterReactionUtils.isAssignedNotNull(compList)) {
        let warnMsg = `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ` Neither details prop: "${InterReactionPropertyKeys.COMPONENT_NAME}",`
          + ` nor "${InterReactionPropertyKeys.COMPONENT_LIST}", was provided for React component matching!`

        if (shouldAllowCompGroupAsRequiredInsteadOfName) {
          if (!InterReactionUtils.isNonEmptyString(compGroup)) {
            warnMsg = `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
              + ` Neither details prop: "${InterReactionPropertyKeys.COMPONENT_NAME}", nor "${InterReactionPropertyKeys.COMPONENT_GROUP}"`
              + ` nor "${InterReactionPropertyKeys.COMPONENT_LIST}", was provided for React component matching!`

            if (shouldEnableDebugging) {
              console.warn(warnMsg);
            }

            return false;
          }
        } else {
          if (shouldEnableDebugging) {
            console.warn(warnMsg);
          }

          return false;
        }
      }
    }

    if (InterReactionUtils.isNonEmptyString(compName, true)) {
      if (InterReactionUtils.isAssignedNotNull(compList)) {
        if (shouldEnableDebugging) {
          console.warn(`${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
            + ` Only one, of either details property: "${InterReactionPropertyKeys.COMPONENT_NAME}"`
            + `, or "${InterReactionPropertyKeys.COMPONENT_GROUP}"`
            + `, or "${InterReactionPropertyKeys.COMPONENT_LIST}" should be provided for React component matching!`
          );
        }
    
        return false;
      }

      if (shouldAllowCompGroupAsRequiredInsteadOfName) {
        if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
          if (shouldEnableDebugging) {
            console.warn(`${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
              + ` Only one, of either details property: "${InterReactionPropertyKeys.COMPONENT_NAME}"`
              + `, or "${InterReactionPropertyKeys.COMPONENT_GROUP}"`
              + `, or "${InterReactionPropertyKeys.COMPONENT_LIST}" should be provided for React component matching!`
            );
          }
  
          return false;
        }
      }
    }
  
    if (InterReactionUtils.isAssignedNotNull(compList)) {
      if (!Array.isArray(compList)) {
        if (shouldEnableDebugging) {
          console.warn(
           `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
            + ` details property: "${InterReactionPropertyKeys.COMPONENT_LIST}" was provided,`
            + ` for React component matching, but is not an Array!`
          );
        }
  
        return false;
      }
  
      if (compList.length === 0) {
        if (shouldEnableDebugging) {
          console.warn(
           `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
            + ` details property: "${InterReactionPropertyKeys.COMPONENT_LIST}" was provided,`
            + ' for React component matching, but is empty!'
          );
        }
  
        return false;
      }
    }
    
    return true;
  };
  
  const doDetailsContainRequiredProperties = function(
    details,
    componentNamesToComponents,
    callerName,
    isCompIdRequired,
    shouldAllowCompGroupAsRequiredInsteadOfName
  ) {
    if (!InterReactionUtils.isNonEmptyString(callerName, true)) {
      callerName = callerNameDefault;
    }

    if (!InterReactionUtils.isNonEmptyObject(details)) {
      if (shouldEnableDebugging) {
        console.warn(
          `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ' No details provided, for React component matching or assignment!'
        );
      }

      return false;
    }

    if (isCompIdRequired !== true) {
      isCompIdRequired = false;
    }

    if (shouldAllowCompGroupAsRequiredInsteadOfName !== true) {
      shouldAllowCompGroupAsRequiredInsteadOfName = false;
    }

    const compName = details[InterReactionPropertyKeys.COMPONENT_NAME];
    const compGroup = details[InterReactionPropertyKeys.COMPONENT_GROUP];
    
    if (!InterReactionUtils.isNonEmptyString(compName, true)) {
      let warnMsg = `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
        + ` No details property: "${InterReactionPropertyKeys.COMPONENT_NAME}" was provided,`
        + ' for React component matching!';

      if (shouldAllowCompGroupAsRequiredInsteadOfName) {
        if (!InterReactionUtils.isNonEmptyString(compGroup, true)) {
          warnMsg = `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
            + ` No details property: "${InterReactionPropertyKeys.COMPONENT_NAME}" was provided,`
            + ` or "${InterReactionPropertyKeys.COMPONENT_GROUP}" was provided`
            + ' for React component matching!';

          if (shouldEnableDebugging) {
            console.warn(warnMsg);
          }
  
          return false;
        }
      } else {
        if (shouldEnableDebugging) {
          console.warn(warnMsg);
        }

        return false;
      }
    }

    if (!shouldAllowCompGroupAsRequiredInsteadOfName) {
      if (!InterReactionUtils.isNonEmptyString(compGroup, true)) {
        if (!InterReactionUtils.isNonEmptyObject(componentNamesToComponents)) {
          if (shouldEnableDebugging) {
            console.warn(
             `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
              + ` No React component mappings provided, against which to validate "${compName}",`
              + ` for interReaction element attribute: "${InterReactionAttributeKeys.COMPONENT_NAME}"`
            );
          }

          return false;
        } else {
          if (!InterReactionUtils.isAssignedNotNull(componentNamesToComponents[compName])) {
            if (shouldEnableDebugging) {
              console.warn(
               `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
                + ` No React component found, which matches value "${compName}",`
                + ` for details property: "${InterReactionPropertyKeys.COMPONENT_NAME}"`
              );
            }
        
            return false;
          }
        }

        if (isCompIdRequired) {
          const compId = details[InterReactionPropertyKeys.COMPONENT_ID];
          
          if (!InterReactionUtils.isNonEmptyString(compId, true)) {
            if (shouldEnableDebugging) {
              console.warn(
               `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
                + ` No details property: "${InterReactionPropertyKeys.COMPONENT_ID}" was provided,`
                + ' for DOM element matching!'
              );
            }
      
            return false;
          }
        }
      }
    }
  
    return true;
  };
  
  const doesInterReactionElementContainRequiredAttributes = function(
    interReactionElement,
    componentNamesToComponents,
    callerName
  ) {
    if (!InterReactionUtils.isNonEmptyString(callerName, true)) {
      callerName = callerNameDefault;
    }

    if (!InterReactionUtils.isAssignedNotNull(interReactionElement) || (interReactionElement.constructor.name !== 'InterReactionElement')) {
      if (shouldEnableDebugging) {
        console.warn(
         `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ' No interReaction element was provided for validation!'
        );
      }
  
      return false;
    }

    const compName = interReactionElement.getAttribute(InterReactionAttributeKeys.COMPONENT_NAME);
    
    if (!InterReactionUtils.isNonEmptyString(compName, true)) {
      if (shouldEnableDebugging) {
        console.warn(
         `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ` No ${interReactionElement.tagName} element attribute: "${InterReactionAttributeKeys.COMPONENT_NAME}" was provided,`
          + ' for React component matching!'
        );
      }
  
      return false;
    }
  
    if (!InterReactionUtils.isNonEmptyObject(componentNamesToComponents)) {
      if (shouldEnableDebugging) {
        console.warn(
         `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ` No React component mappings provided, against which to validate "${compName}",`
          + ` for ${interReactionElement.tagName} element attribute: "${InterReactionAttributeKeys.COMPONENT_NAME}"`
        );
      }
  
      return false;
    }

    if (!InterReactionUtils.isAssignedNotNull(componentNamesToComponents[compName])) {
      if (shouldEnableDebugging) {
        console.warn(
         `${InterReactionUtils.isNonEmptyString(callerName, true) ? `InterReaction#${callerName}` : 'InterReaction'}:`
          + ` No React component found, which matches value "${compName}",`
          + ` for ${interReactionElement.tagName} element attribute: "${InterReactionAttributeKeys.COMPONENT_NAME}"`
        );
      }
  
      return false;
    }
  
    return true;
  };
  
  return Object.freeze({
    doDetailsContainMinimumExpectedProperties,
    doDetailsContainRequiredProperties,
    doesInterReactionElementContainRequiredAttributes
  });
};

export default InterReactionValidations;
