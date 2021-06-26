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

const webComponentsPromises = [];

if (!('customElements' in window)) {
  webComponentsPromises.push(
    import(/* webpackChunkName: "webcomponents-polyfill-custom-elements" */ '@webcomponents/custom-elements')
  );
}

if (!(typeof window.CustomEvent === 'function')) {
  webComponentsPromises.push(
    import(/* webpackChunkName: "webcomponents-polyfill-platform" */ '@webcomponents/webcomponents-platform')
  );
}

const loadWebComponents = function() {
  return Promise.all(webComponentsPromises);
}

const InterReactionWebComponentsLoader = Object.freeze({
  loadWebComponents
});

export default InterReactionWebComponentsLoader;
