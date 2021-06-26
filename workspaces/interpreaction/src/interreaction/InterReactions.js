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

const InterReactions = Object.freeze({
  CREATE_ASSIGN_TO_DOM_ELEMENT: 'createAssignToDomElement',
  CREATE_ASSIGN_TO_DOM_SELECTOR: 'createAssignToDomSelector',
  CREATE_ELEMENT: 'createElement',
  COMPONENT_ASSIGN: 'assign',
  COMPONENT_MOUNT: 'mount',
  COMPONENT_REMOUNT: 'remount',
  COMPONENT_REMOVE: 'remove',
  COMPONENT_REPLACE: 'replace',
  COMPONENT_TOGGLE_MOUNT: 'toggleMount',
  COMPONENT_UNMOUNT: 'unmount',
  COMPONENT_UPDATE: 'update'
});

export default InterReactions;
