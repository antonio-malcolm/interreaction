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
import React from 'react';

import InterReactionAttributeKeys from 'interreaction/InterReactionAttributeKeys';
import InterReactionPropertyKeys from 'interreaction/InterReactionPropertyKeys';
import InterReactionUtils from 'interreaction/InterReactionUtils';

import InterReactionPortal from 'interreaction/portal/InterReactionPortal';

/**
 * Non-member static methods...
 */

const createComponentInstance = function(
  comp,
  key,
  props = {}
) {
  if (!InterReactionUtils.isAssignedNotNull(comp)) {
    return null;
  }

  if (!InterReactionUtils.isNonNullObject(props)) {
    props = {};
  }

  props = Object.assign(
    props,
    key
  );

  return React.createElement(comp, props);
};

const createPortaledComponentInstance = function(
  comp,
  keys,
  parentIrElement,
  props = {}
) {
  if (!InterReactionUtils.isAssignedNotNull(comp)) {
    return null;
  }

  return React.createElement(
      InterReactionPortal,
      {
        child: createComponentInstance(
          comp,
          keys.compKey,
          props
        ),
        domNode: parentIrElement,
        key: keys.portalKey,
        ref: React.createRef()
      }
    );
};

const cloneComponentInstance = function(
  comp,
  props = {},
) {
  if (!InterReactionUtils.isAssignedNotNull(comp)) {
    return null;
  }

  if (!InterReactionUtils.isNonNullObject(props)) {
    props = {};
  }

  // React #cloneElement doesn't clone the props,
  // as documented, so we do it, here...
  props = Object.assign(
    { ...comp.props },
    props
  );

  return React.cloneElement(comp, props);
};

const clonePortaledComponentInstance = function(
  portalComp,
  props = {},
) {
  if (!InterReactionUtils.isAssignedNotNull(portalComp)) {
    return;
  }

  let comp = portalComp.ref.current.getChild();

  if (!InterReactionUtils.isAssignedNotNull(comp)) {
    return;
  }

  portalComp.ref.current.setChild(
      cloneComponentInstance(
        comp,
        props
      )
    );
};

const createPortaledComponentKeys = function() {
  const keySuffix1 = InterReactionUtils.generateRandomWholeNumber();
  const keySuffix2 = Date.now();
  const compKey = `interReactionnPortaledComp__${keySuffix1}-${keySuffix2}`;
  const portalKey = `interReactionPortal__${keySuffix1}-${keySuffix2}`;

  return Object.freeze({
      compKey,
      portalKey
    });
};

const InterReactionPortalsManager = function(interReactionPortalsRenderer, shouldEnableDebugging) {
  if (shouldEnableDebugging !== true) {
    shouldEnableDebugging = false;
  }

  /**
   * Internal Fields...
   */

  /**
   * String component id : Object<String,String>(
   *  compName: component name,
   *  portalKey: portal key
   * )
   */
  const componentIdsToComponentNamesAndPortalKeys = {};

  /**
   * String component group name : Array<String>(portal keys)
   */
  const componentGroupNamesToPortalKeys = {};

  /**
   * String portal key : Object<String,String>(
   *  compName: component name,
   *  compId: component id
   * )
   */
  const portalKeysToComponentNamesIdsAndGroupNames = {};

  /**
   * String component name : Array<String>(portal keys)
   */
  const componentNamesToPortalKeys = {};

  /**
   * String portal key : React Component
   */
  const portalKeysToPortals = {};

  /**
   * Internal Methods...
   */

  const hasComponentByNameAndId = function(compName, compId) {
    const componentIdToComponentNameAndPortalKey = componentIdsToComponentNamesAndPortalKeys[compId];

    if (!InterReactionUtils.isNonEmptyObject(componentIdToComponentNameAndPortalKey)) {
      return false;
    }

    const componentName = componentIdToComponentNameAndPortalKey.compName;
    const portalKey = componentIdToComponentNameAndPortalKey.portalKey;

    if (!InterReactionUtils.isNonEmptyString(componentName, true)) {
      return false;
    }

    if (!InterReactionUtils.isNonEmptyString(portalKey, true)) {
      return false;
    }

    const componentNameIdAndGroupName = portalKeysToComponentNamesIdsAndGroupNames[portalKey];

    if (!InterReactionUtils.isNonEmptyObject(componentNameIdAndGroupName)) {
      return false;
    }

    if (componentNameIdAndGroupName.compName !== compName) {
      return false;
    }

    if (componentNameIdAndGroupName.compId !== compId) {
      return false;
    }

    const componentNameToPortalKeys = componentNamesToPortalKeys[compName];

    if (!InterReactionUtils.isNonEmptyArray(componentNameToPortalKeys)) {
      return false;
    }

    if (!componentNameToPortalKeys.includes(portalKey)) {
      return false;
    }

    if (!InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
      return false;
    }

    return true;
  };

  const hasComponentsByName = function(compName) {
    let hasComponentsByName = false;
    const componentNameToPortalKeys = componentNamesToPortalKeys[compName];

    if (InterReactionUtils.isNonEmptyArray(componentNameToPortalKeys)) {
      // This is a shallow check.
      // We need only to ensure at least one component exists, in the array...

      componentNameToPortalKeys.every((portalKey) => {
        const componentNameIdAndGroupName = portalKeysToComponentNamesIdsAndGroupNames[portalKey];

        if (InterReactionUtils.isNonEmptyObject(componentNameIdAndGroupName)) {
          if (componentNameIdAndGroupName.compName === compName) {
            if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
              hasComponentsByName = true;

              // Break Array#every loop...
              return false;
            }
          }
        }

        return true;
      });
    }

    return hasComponentsByName;
  };

  const hasComponentsByGroupName = function(groupName) {
    let hasComponentsByGroupName = false;

    const portalKeys = componentGroupNamesToPortalKeys[groupName];

    if (InterReactionUtils.isNonEmptyArray(portalKeys)) {
      portalKeys.every((key) => {
        if (InterReactionUtils.isAssignedNotNull(
          portalKeysToComponentNamesIdsAndGroupNames[key]
        )) {
          if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[key])) {
            hasComponentsByGroupName = true;
  
            // Break Array#every loop...
            return false;
          }
        }

        return true;
      });
    }

    return hasComponentsByGroupName;
  };

  /**
   * Exposed Methods...
   */

  const assignNewPortaledComponentToElement = function(comp, parentIrElement, props = {}, groupName) {
    const compName = parentIrElement.getAttribute(
        InterReactionAttributeKeys.COMPONENT_NAME
      );

    const compId = parentIrElement.getAttribute(
        InterReactionAttributeKeys.COMPONENT_ID
      );

    if (hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
          'InterReactionPortalsManager#assignNewPortaledComponentToElement:'
          + ` Existing component found, for ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}",`
          + ` with ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}"!`
          + ' You probably wanted to call InterReactionPortalsManager#replacePortaledComponentByNameAndId!'
          + ' Skipping...'
        );
      }

      return;
    }

    if (parentIrElement.hasAttribute(InterReactionAttributeKeys.COMPONENT_PORTAL)) {
      const lmntPortalKey = parentIrElement.getAttribute(InterReactionAttributeKeys.COMPONENT_PORTAL);

      if (InterReactionUtils.isNonEmptyString(lmntPortalKey)) {
        if (InterReactionUtils.isAssignedNotNull(
          portalKeysToPortals[lmntPortalKey]
        )) {
          if (shouldEnableDebugging) {
            console.warn(
              'InterReactionPortalsManager#assignNewPortaledComponentToElement:'
              + ` Existing component found, for ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}",`
              + ` mounted at element with ${InterReactionAttributeKeys.COMPONENT_PORTAL}: "${lmntPortalKey}"!`
              + ' You probably wanted to call InterReactionPortalsManager#replacePortaledComponentByNameAndId!'
              + ' Skipping...'
            );
          }
    
          return;   
        }
      }
    }

    if (!InterReactionUtils.isNonEmptyString(groupName, true)) {
      groupName = parentIrElement.getAttribute(
          InterReactionAttributeKeys.COMPONENT_GROUP
        );
    }

    const keys = createPortaledComponentKeys();

    if (!hasComponentsByName(compName)) {
      componentNamesToPortalKeys[compName] = [];
    }

    componentNamesToPortalKeys[compName].push(keys.portalKey);
    portalKeysToComponentNamesIdsAndGroupNames[keys.portalKey] = { compName };

    portalKeysToPortals[keys.portalKey] = createPortaledComponentInstance(
        comp,
        keys,
        parentIrElement,
        props
      );

    if (InterReactionUtils.isNonEmptyString(compId, true)) {
      componentIdsToComponentNamesAndPortalKeys[compId] = {
        compName,
        portalKey: keys.portalKey
      };

      portalKeysToComponentNamesIdsAndGroupNames[keys.portalKey].compId = compId;
    }

    interReactionPortalsRenderer.setPortals(
      Object.values(portalKeysToPortals)
    );

    parentIrElement.setAttribute(
      InterReactionAttributeKeys.COMPONENT_PORTAL,
      keys.portalKey
    );

    if (InterReactionUtils.isNonEmptyString(groupName, true)) {
      if (!InterReactionUtils.isNonEmptyArray(
        componentGroupNamesToPortalKeys[groupName]
      )) {
        componentGroupNamesToPortalKeys[groupName] = [];
      }

      componentGroupNamesToPortalKeys[groupName].push(keys.portalKey);
      portalKeysToComponentNamesIdsAndGroupNames[keys.portalKey].compGroup = groupName;

      parentIrElement.setAttribute(
        InterReactionAttributeKeys.COMPONENT_GROUP,
        groupName
      );
    }
  };

  const mountPortaledComponentByNameAndId = function(compName, compId) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#mountPortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    portalKeysToPortals[
      componentIdsToComponentNamesAndPortalKeys[compId].portalKey
    ].ref.current.mountChild();
  };

  const mountPortaledComponentsByName = function(compName) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#mountPortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      portalKeysToPortals[portalKey].ref.current.mountChild();
    });
  };

  const mountPortaledComponentsByGroupName = function(groupName) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#mountPortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        portalKeysToPortals[portalKey].ref.current.mountChild();
      }
    });
  };

  const remountPortaledComponentByNameAndId = function(compName, compId) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#remountPortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for remount!`
          + ' Skipping...'
        );
      }

      return;
    }

    portalKeysToPortals[
      componentIdsToComponentNamesAndPortalKeys[compId].portalKey
    ].ref.current.remountChild();
  };

  const remountPortaledComponentsByName = function(compName) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#remountPortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for remount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      portalKeysToPortals[portalKey].ref.current.remountChild();
    });
  };

  const remountPortaledComponentsByGroupName = function(groupName) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#remountPortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for remount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        portalKeysToPortals[portalKey].ref.current.remountChild();
      }
    });
  };

  const removePortaledComponentByNameAndId = function(compName, compId, callback) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#removePortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for removal!`
          + ' Skipping...'
        );
      }

      return;
    }

    const componentIdToComponentNameAndPortalKey = componentIdsToComponentNamesAndPortalKeys[compId];
    const componentNameToPortalKeys = componentNamesToPortalKeys[compName];
    const portalKey = componentIdToComponentNameAndPortalKey.portalKey;
    const compGroup = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compGroup;

    portalKeysToPortals[portalKey].ref.current.unmountChild();

    let spliceIdx = componentNameToPortalKeys.indexOf(portalKey);

    if (spliceIdx > -1) {
      componentNameToPortalKeys.splice(spliceIdx, 1);
    }

    if (!InterReactionUtils.isNonEmptyArray(
      componentNamesToPortalKeys[compName]
    )) {
      delete componentNamesToPortalKeys[compName];
    }

    if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
      spliceIdx = componentGroupNamesToPortalKeys[compGroup].indexOf(portalKey);

      if (InterReactionUtils.isNonEmptyArray(
        componentGroupNamesToPortalKeys[compGroup]
      )) {
        if (spliceIdx > -1) {
          componentGroupNamesToPortalKeys[compGroup].splice(spliceIdx, 1);
        }  
      }

      delete componentGroupNamesToPortalKeys[compGroup];
    }

    delete componentIdsToComponentNamesAndPortalKeys[compId];
    delete portalKeysToComponentNamesIdsAndGroupNames[portalKey];
    delete portalKeysToPortals[portalKey];

    interReactionPortalsRenderer.setPortals(
      Object.values(portalKeysToPortals)
    );

    if (typeof callback === 'function') {
      callback();
    }
  };

  const removePortaledComponentsByName = function(compName, callback) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#removePortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for removal!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      portalKeysToPortals[portalKey].ref.current.unmountChild();

      const compId = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compId;
      const compGroup = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compGroup;

      if (InterReactionUtils.isNonEmptyString(compId, true)) {
        delete componentIdsToComponentNamesAndPortalKeys[compId];
      }

      if (InterReactionUtils.isNonEmptyString(compGroup, true)) {
        delete componentGroupNamesToPortalKeys[compGroup];
      }

      delete portalKeysToComponentNamesIdsAndGroupNames[portalKey];
      delete portalKeysToPortals[portalKey];
    });

    delete componentNamesToPortalKeys[compName];

    interReactionPortalsRenderer.setPortals(
      Object.values(portalKeysToPortals)
    );

    if (typeof callback === 'function') {
      callback();
    }
  };

  const removePortaledComponentsByGroupName = function(groupName, callback) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#removePortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for removal!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        portalKeysToPortals[portalKey].ref.current.unmountChild();
      }

      if (InterReactionUtils.isAssignedNotNull(
        portalKeysToComponentNamesIdsAndGroupNames[portalKey])
      ) {
        const compId = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compId;
        const compName = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compName;
        const spliceIdx = componentNamesToPortalKeys[compName].indexOf(portalKey);
    
        if (spliceIdx > -1) {
          componentNamesToPortalKeys[compName].splice(spliceIdx, 1);
        }
  
        if (!InterReactionUtils.isNonEmptyArray(
          componentNamesToPortalKeys[compName]
        )) {
          delete componentNamesToPortalKeys[compName];
        }
   
        if (InterReactionUtils.isNonEmptyString(compId, true)) {
          delete componentIdsToComponentNamesAndPortalKeys[compId];
        }
      }

      delete portalKeysToComponentNamesIdsAndGroupNames[portalKey];
      delete portalKeysToPortals[portalKey];
    });

    delete componentGroupNamesToPortalKeys[groupName];

    interReactionPortalsRenderer.setPortals(
      Object.values(portalKeysToPortals)
    );

    if (typeof callback === 'function') {
      callback();
    }
  };

  const replacePortaledComponentByNameAndId = function(
    compName,
    compId,
    replacementCompName,
    replacementComp,
    props = {},
    callback
  ) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#replacePortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for replacement!`
          + ' Skipping...'
        );
      }

      return;
    }

    const compKey = createPortaledComponentKeys().compKey;
    const portalKey = componentIdsToComponentNamesAndPortalKeys[compId].portalKey;
    const spliceIdx = componentNamesToPortalKeys[compName].indexOf(portalKey);

    if (spliceIdx > -1) {
      componentNamesToPortalKeys[compName].splice(spliceIdx, 1);
    }

    if (!InterReactionUtils.isNonEmptyArray(componentNamesToPortalKeys[compName])) {
      delete componentNamesToPortalKeys[compName];
    }

    if (!InterReactionUtils.isNonEmptyArray(
      componentNamesToPortalKeys[replacementCompName]
    )) {
      componentNamesToPortalKeys[replacementCompName] = [];
    }

    componentNamesToPortalKeys[replacementCompName].push(portalKey);

    componentIdsToComponentNamesAndPortalKeys[compId].compName = replacementCompName;
    portalKeysToComponentNamesIdsAndGroupNames[portalKey].compName = replacementCompName;

    portalKeysToPortals[portalKey].ref.current.setChild(
      createComponentInstance(
        replacementComp,
        compKey,
        props
      )
    );

    if (typeof callback === 'function') {
      callback(replacementCompName, compName, compId);
    }
  };

  const replacePortaledComponentsByName = function(
    compName,
    replacementCompName,
    replacementComp,
    props = {},
    callback
  ) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#replacePortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for replacement!`
          + ' Skipping...'
        );
      }

      return;
    }

    const portalKeysFromCompNameSpliceIndices = [];

    componentNamesToPortalKeys[compName].forEach((portalKey, idx) => {
      const compKey = createPortaledComponentKeys().compKey;
      const compId = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compId;

      if (!InterReactionUtils.isNonEmptyArray(componentNamesToPortalKeys[replacementCompName])) {
        componentNamesToPortalKeys[replacementCompName] = [];
      }

      componentNamesToPortalKeys[replacementCompName].push(portalKey);
      portalKeysFromCompNameSpliceIndices.push(idx);

      if (InterReactionUtils.isNonEmptyString(compId, true)) {
        componentIdsToComponentNamesAndPortalKeys[compId].compName = replacementCompName;
      }

      portalKeysToComponentNamesIdsAndGroupNames[portalKey].compName = replacementCompName;

      portalKeysToPortals[portalKey].ref.current.setChild(
        createComponentInstance(
          replacementComp,
          compKey,
          props
        )
      );

      if (typeof callback === 'function') {
        callback(replacementCompName, compName, compId);
      }
    });

    portalKeysFromCompNameSpliceIndices.forEach((spliceIdx) => {
      componentNamesToPortalKeys[compName].splice(spliceIdx, 1);
    });

    if (!InterReactionUtils.isNonEmptyArray(componentNamesToPortalKeys[compName])) {
      delete componentNamesToPortalKeys[compName];
    }
  };

  const replacePortaledComponentsByGroupName = function(
    groupName,
    replacementCompName,
    replacementComp,
    props = {},
    callback
  ) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#replacePortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for replacement!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      const compKey = createPortaledComponentKeys().compKey;
      const compId = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compId;
      const compName = portalKeysToComponentNamesIdsAndGroupNames[portalKey].compName;
      const spliceIdx = componentNamesToPortalKeys[compName].indexOf(portalKey);

      if (spliceIdx > -1) {
        componentNamesToPortalKeys[compName].splice(spliceIdx, 1);
      }

      if (!InterReactionUtils.isNonEmptyArray(componentNamesToPortalKeys[compName])) {
        delete componentNamesToPortalKeys[compName];
      }

      if (!InterReactionUtils.isNonEmptyArray(componentNamesToPortalKeys[replacementCompName])) {
        componentNamesToPortalKeys[replacementCompName] = [];
      }

      componentNamesToPortalKeys[replacementCompName].push(portalKey);

      if (InterReactionUtils.isNonEmptyString(compId, true)) {
        componentIdsToComponentNamesAndPortalKeys[compId].compName = replacementCompName;
      }

      portalKeysToComponentNamesIdsAndGroupNames[portalKey].compName = replacementCompName;

      portalKeysToPortals[portalKey].ref.current.setChild(
        createComponentInstance(
          replacementComp,
          compKey,
          props
        )
      );

      if (typeof callback === 'function') {
        callback(replacementCompName, compName);
      }
    });
  };

  const toggleMountPortaledComponentByNameAndId = function(compName, compId) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#toggleMountPortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for toggle mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    portalKeysToPortals[
      componentIdsToComponentNamesAndPortalKeys[compId].portalKey
    ].ref.current.toggleMountChild();
  };

  const toggleMountPortaledComponentsByName = function(compName) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#toggleMountPortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for toggle mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      portalKeysToPortals[portalKey].ref.current.toggleMountChild();
    });
  };

  const toggleMountPortaledComponentsByGroupName = function(groupName) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#toggleMountPortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for toggle mount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        portalKeysToPortals[portalKey].ref.current.toggleMountChild();
      }
    });
  };

  const unmountPortaledComponentByNameAndId = function(compName, compId) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#unmountPortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for unmount!`
          + ' Skipping...'
        );
      }

      return;
    }

    portalKeysToPortals[
      componentIdsToComponentNamesAndPortalKeys[compId].portalKey
    ].ref.current.unmountChild();
  };

  const unmountPortaledComponentsByName = function(compName) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#unmountPortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for unmount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      portalKeysToPortals[portalKey].ref.current.unmountChild();
    });
  };

  const unmountPortaledComponentsByGroupName = function(groupName) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#unmountPortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for unmount!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        portalKeysToPortals[portalKey].ref.current.unmountChild();
      }
    });
  };

  const updatePortaledComponentByNameAndId = function(compName, compId, props) {
    if (!hasComponentByNameAndId(compName, compId)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentByNameAndId:'
          + ` No component found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyObject(props)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentByNameAndId:'
          + ` No props provided, for component, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}"`
          + ` and ${InterReactionPropertyKeys.COMPONENT_ID}: "${compId}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    clonePortaledComponentInstance(
        portalKeysToPortals[
            componentIdsToComponentNamesAndPortalKeys[compId].portalKey
          ],
        props
      );
  };

  const updatePortaledComponentsByName = function(compName, props) {
    if (!hasComponentsByName(compName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentsByName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyObject(props)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentsByName:'
          + ` No props provided, for components, with ${InterReactionPropertyKeys.COMPONENT_NAME}: "${compName}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentNamesToPortalKeys[compName].forEach((portalKey) => {
      clonePortaledComponentInstance(
        portalKeysToPortals[portalKey],
          props
        );
    });
  };

  const updatePortaledComponentsByGroupName = function(groupName, props) {
    if (!hasComponentsByGroupName(groupName)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentsByGroupName:'
          + ` No components found, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    if (!InterReactionUtils.isNonEmptyObject(props)) {
      if (shouldEnableDebugging) {
        console.warn(
            'InterReactionPortalsManager#updatePortaledComponentsByGroupName:'
          + ` No props provided, for components, with ${InterReactionPropertyKeys.COMPONENT_GROUP}: "${groupName}", for update!`
          + ' Skipping...'
        );
      }

      return;
    }

    componentGroupNamesToPortalKeys[groupName].forEach((portalKey) => {
      if (InterReactionUtils.isAssignedNotNull(portalKeysToPortals[portalKey])) {
        clonePortaledComponentInstance(
          portalKeysToPortals[portalKey],
          props
        );
      }
    });
  };

  return Object.freeze({
      assignNewPortaledComponentToElement,
      mountPortaledComponentByNameAndId,
      mountPortaledComponentsByName,
      mountPortaledComponentsByGroupName,
      remountPortaledComponentByNameAndId,
      remountPortaledComponentsByName,
      remountPortaledComponentsByGroupName,
      removePortaledComponentByNameAndId,
      removePortaledComponentsByName,
      removePortaledComponentsByGroupName,
      replacePortaledComponentByNameAndId,
      replacePortaledComponentsByName,
      replacePortaledComponentsByGroupName,
      toggleMountPortaledComponentByNameAndId,
      toggleMountPortaledComponentsByName,
      toggleMountPortaledComponentsByGroupName,
      unmountPortaledComponentByNameAndId,
      unmountPortaledComponentsByName,
      unmountPortaledComponentsByGroupName,
      updatePortaledComponentByNameAndId,
      updatePortaledComponentsByName,
      updatePortaledComponentsByGroupName
    });
};

export default InterReactionPortalsManager;
