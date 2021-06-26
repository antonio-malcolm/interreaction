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
import ReactDOM from 'react-dom';

import InterReactionElementFactory from 'interreaction/element/InterReactionElementFactory';

import InterReactionEventFactory from 'interreaction/event/InterReactionEventFactory';
import InterReactionEventNames from 'interreaction/event/InterReactionEventNames';

import InterReactionPortalsManager from 'interreaction/portal/InterReactionPortalsManager';
import InterReactionPortalsRenderer from 'interreaction/portal/InterReactionPortalsRenderer';

import InterReaction from 'interreaction/InterReaction';
import InterReactions from 'interreaction/InterReactions';

import InterReactionConfigDefaults from 'interreaction/InterReactionConfigDefaults';
import InterReactionConfigOptions from 'interreaction/InterReactionConfigOptions';
import InterReactionReadyStates from 'interreaction/InterReactionReadyStates';
import InterReactionWebComponentsLoader from 'interreaction/InterReactionWebComponentsLoader';
import InterReactionUtils from 'interreaction/InterReactionUtils';

const InterReactionFactory = (function() {
  const interReactionEventFactory = new InterReactionEventFactory();

  const setInterReactionReadyState = function(readyState, msgTxt) {
    switch (readyState) {
      case InterReactionReadyStates.ERROR:
        msgTxt = `InterReaction: ERROR! ${msgTxt}`;

        console.error(msgTxt);

        window[
          InterReactionReadyStates.readyStatePropertyKey
        ] = readyState;

        window[
          InterReactionReadyStates.readyStateReasonPropertyKey
        ] = msgTxt;

        interReactionEventFactory.dispatchEvent(
          InterReactionEventNames.INSTANCE_ERROR,
          { 'message': msgTxt }
        );

        break;

      case InterReactionReadyStates.LOADING:
        window[
          InterReactionReadyStates.readyStatePropertyKey
        ] = readyState;

        interReactionEventFactory.dispatchEvent(
          InterReactionEventNames.INSTANCE_LOADING
        );

        break;

      case InterReactionReadyStates.READY:
        window[
          InterReactionReadyStates.readyStatePropertyKey
        ] = readyState;

        interReactionEventFactory.dispatchEvent(
          InterReactionEventNames.INSTANCE_READY
        );

        break;

      default:
        window[
          InterReactionReadyStates.readyStatePropertyKey
        ] = InterReactionReadyStates.readyStateKeys.UNLOADED;

        interReactionEventFactory.dispatchEvent(
          InterReactionEventNames.INSTANCE_UNLOADED
        );

        break;
    }
  };

  const init = function(AppRootComponent, componentNamesToComponents, interReactionConfig) {
    const initInterReaction = function() {
      if (!InterReactionUtils.isNonEmptyObject(componentNamesToComponents)) {
        setInterReactionReadyState(
          InterReactionReadyStates.ERROR,
          'No components provided to manage! Exiting...'
        );

        return;
      }

      setInterReactionReadyState(
        InterReactionReadyStates.LOADING,
      );
  
      if (!InterReactionUtils.isAssignedNotNull(AppRootComponent)) {
        AppRootComponent = React.Fragment;
  
        console.warn(
          'InterReaction: Application root component was not provided! Will attempt to use React#Fragment...'
        );
      }

      let interReactionElementClassNames = [];
      let interReactionElementTagName = InterReactionConfigDefaults.TAGNAME;
      let interReactionInstanceId = InterReactionConfigDefaults.INSTANCE_ID;
      let shouldEnableDebugging = false;
      let rootLmntAttributes = {};

      if (InterReactionUtils.isNonEmptyObject(interReactionConfig)) {
        if (InterReactionUtils.isNonEmptyString(interReactionConfig[InterReactionConfigOptions.INSTANCE_ID], true)) {
          interReactionInstanceId = interReactionConfig[InterReactionConfigOptions.INSTANCE_ID];
        }

        if (InterReactionUtils.isNonEmptyString(interReactionConfig[InterReactionConfigOptions.TAGNAME], true)) {
          interReactionElementTagName = interReactionConfig[InterReactionConfigOptions.TAGNAME];
        }

        if (interReactionConfig[InterReactionConfigOptions.SHOULD_APPLY_DEFAULT_CLASSNAME] === true) {
          interReactionElementClassNames.push(InterReactionConfigDefaults.CLASSNAME);
          rootLmntAttributes.className = `${InterReactionConfigDefaults.CLASSNAME}_root`;
        }

        if (InterReactionUtils.isNonEmptyString(interReactionConfig[InterReactionConfigOptions.CLASSNAME], true)) {
          if (/\s/.test(interReactionConfig[InterReactionConfigOptions.CLASSNAME])) {
            interReactionConfig[InterReactionConfigOptions.CLASSNAME].split(/\s/).forEach((className) => {
              className = className.trim();

              if (InterReactionUtils.isNonEmptyString(className, true)) {
                interReactionElementClassNames.push(className);
              }
            });
          } else {
            interReactionElementClassNames.push(
              interReactionConfig[InterReactionConfigOptions.CLASSNAME].trim()
            );
          }
        }

        if (interReactionConfig[InterReactionConfigOptions.SHOULD_ENABLE_DEBUGGING] === true) {
          shouldEnableDebugging = true;
        }
      }

      let interReactionElementFactory;

      try {
        interReactionElementFactory = new InterReactionElementFactory(
          interReactionElementTagName,
          interReactionInstanceId,
          interReactionElementClassNames
        );
      } catch (ex) {
        setInterReactionReadyState(
          InterReactionReadyStates.ERROR,
          'Could not instantiate the InterReactionElementFactory.'
        );

        console.error(ex.message);

        return;
      }

      let interReactionRootElement = interReactionElementFactory.createRootElement(
          rootLmntAttributes
        );

      let interReaction;
  
      const bodyLmnt = document.body;
  
      if (interReactionConfig[InterReactionConfigOptions.SHOULD_APPLY_DEFAULT_CLASSNAME] === true) {
        if (!bodyLmnt.classList.contains(InterReactionConfigDefaults.CLASSNAME)) {
          bodyLmnt.classList.add(InterReactionConfigDefaults.CLASSNAME);
        }
      }
  
      interReactionRootElement = bodyLmnt.appendChild(interReactionRootElement);
  
      if (!InterReactionUtils.isAssignedNotNull(interReactionRootElement)) {
        setInterReactionReadyState(
          InterReactionReadyStates.ERROR,
          'Could not find interReaction root element on body.'
        );
  
        return;
      }

      if (typeof interReactionRootElement.getAttribute !== 'function') {
        setInterReactionReadyState(
          InterReactionReadyStates.ERROR,
          'Could not find interReaction root element on body.'
        );
  
        return;
      }
  
      ReactDOM.hydrate(
        <AppRootComponent>
          <InterReactionPortalsRenderer ref={
            (interReactionPortalsRenderer) => {
              interReaction = new InterReaction(
                interReactionElementFactory,
                new InterReactionPortalsManager(
                  interReactionPortalsRenderer,
                  shouldEnableDebugging
                ),
                componentNamesToComponents,
                interReactionElementTagName,
                interReactionElementClassNames,
                shouldEnableDebugging
              )
            }
          } />
        </AppRootComponent>,
        interReactionRootElement
      );
  
      /**
       * Set namespaced APIs on the global object...
       */
      window.interReaction = Object.freeze({
        [InterReactions.COMPONENT_ASSIGN]: interReaction.assignNewComponentsToElementsByDetailsWithList,
        [InterReactions.COMPONENT_MOUNT]: interReaction.mountComponentsByDetailsWithList,
        [InterReactions.COMPONENT_REMOUNT]: interReaction.remountComponentsByDetailsWithList,
        [InterReactions.COMPONENT_REMOVE]: interReaction.removeComponentsByDetailsWithList,
        [InterReactions.COMPONENT_REPLACE]: interReaction.replaceComponentsByDetailsWithList,
        [InterReactions.COMPONENT_TOGGLE_MOUNT]: interReaction.toggleMountComponentsByDetailsWithList,
        [InterReactions.COMPONENT_UNMOUNT]: interReaction.unmountComponentsByDetailsWithList,
        [InterReactions.COMPONENT_UPDATE]: interReaction.updateComponentsByDetailsWithList,
        [InterReactions.CREATE_ASSIGN_TO_DOM_ELEMENT]: interReaction.createAssignToDomElement,
        [InterReactions.CREATE_ASSIGN_TO_DOM_SELECTOR]: interReaction.createAssignToDomSelector,
        [InterReactions.CREATE_ELEMENT]: interReaction.createElement
      });
  
      interReaction.assignNewComponentsToElements();
  
      setInterReactionReadyState(
        InterReactionReadyStates.READY
      );
    };
  
    const initDependencies = function() {
      InterReactionWebComponentsLoader.loadWebComponents().then(
        initInterReaction
      ).catch(
        (err) => {
          setInterReactionReadyState(
            InterReactionReadyStates.ERROR,
            'Dependencies failed to load.'
          );

          console.error(err);
        }
      );
    };

    if (document.readyState !== 'loading') {
      initDependencies();
    } else {
      document.addEventListener(
        'DOMContentLoaded',
        initDependencies
      );
    }
  };

  return Object.freeze({ init });
})();

export default InterReactionFactory;
