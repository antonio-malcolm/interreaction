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

'use strict';

const Paths = require('../../../../constant/Paths');
const AppInfo = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/AppInfo`);
const CurrentVarValues = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/CurrentVarValues`);

const loaderConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/loader.config.js`);
const performanceConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/performance.config.js`);
const resolveConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/resolve.config.js`);

const optimizationConfig = require(`${Paths.CONFIG_CURRENT_WORKSPACE_ABSOLUTE}/webpack/optimization.config.js`);

const aliases = require('./aliases.js');

module.exports = {
  name: AppInfo.CURRENT_WORKSPACE_APP_NAME,
  entry: {
    // Require absolute paths...
    [AppInfo.CURRENT_WORKSPACE_APP_NAME]: `${Paths.SRC_CURRENT_WORKSPACE_ABSOLUTE}/index.js`
  },
  externals: [ 'preact', 'react', 'react-dom'],
  output: {
    // Requires an absolute path...
    path: Paths.BUILD_DIST_ABSOLUTE,
    filename: `[name].${CurrentVarValues.ENVIRON}.js`,
    chunkFilename: `[name].${CurrentVarValues.ENVIRON}.[id].chunk.js`,
    library: {
      type: 'umd2'
    }
  },
  mode: 'production',
  module: {
    rules: [
      loaderConfig.rules.jsRule
    ]
  },
  performance: performanceConfig,
  resolve: {
    extensions: resolveConfig.extensions,
    modules: resolveConfig.modules,
    symlinks: resolveConfig.symlinks,
    alias: aliases
  },
  plugins: [
    ...loaderConfig.plugins
  ],
  optimization: optimizationConfig
};
