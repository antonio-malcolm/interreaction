/**
 * Copyrighht 2021 to present, Antonio Malcolm.
 * All rights reserved.
 *
 * This source code file is a part of protoreaction (A.K.A., "protoReaction").
 *
 * This source code is licensed under the BSD 3-Clause license,
 * and is subject to the terms of the BSD 3-Clause license,
 * found in the LICENSE file, in the root directory of this project.
 * If a copy of the BSD 3-Clause license cannot be found,
 * as part of this project, you can obtain one, at:
 * https://opensource.org/licenses/BSD-3-Clause
 */

'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

const Paths = require('../../../../constant/Paths');
const AppInfo = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/AppInfo`);
const CurrentVarValues = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/CurrentVarValues`);
const Environs = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/Environs`);
const VarNames = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/VarNames`);
const Workspaces = require(`${Paths.CONSTANT_APP_ROOT_ABSOLUTE}/Workspaces`);

const htmlWebpackPluginConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/html-webpack-plugin.config.js`);
const loaderConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/loader.config.js`);
const optimizationConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/optimization.config.js`);
const performanceConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/performance.config.js`);
const resolveConfig = require(`${Paths.CONFIG_APP_ROOT_ABSOLUTE}/webpack/resolve.config.js`);

const aliases = require('./aliases.js');

module.exports = {
  name: AppInfo.CURRENT_WORKSPACE_APP_NAME,
  target: 'web',
  entry: {
    // Requires absolute paths...
    [AppInfo.CURRENT_WORKSPACE_APP_NAME]: `${Paths.SRC_APP_ROOT_ABSOLUTE}/index-dev.js`
  },
  output: {
    // Requires an absolute path...
    path: Paths.BUILD_DIST_ABSOLUTE,
    crossOriginLoading: 'anonymous',
    filename: `[name].${CurrentVarValues.WORKSPACE}.${CurrentVarValues.ENVIRON}.[contenthash].js`,
    chunkFilename: `[name].${CurrentVarValues.WORKSPACE}.${CurrentVarValues.ENVIRON}.[contenthash].[id].chunk.js`
  },
  mode: 'development',
  // Required for testing framework webpack integration...
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      loaderConfig.rules.audioRule,
      loaderConfig.rules.cssRule,
      loaderConfig.rules.fontRule,
      loaderConfig.rules.imageRule,
      loaderConfig.rules.jsRule,
      loaderConfig.rules.videoRule
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
    new Webpack.EnvironmentPlugin({
      [VarNames.ENVIRON]: Environs.PROD_DEV,
      [VarNames.WORKSPACE]: Workspaces.PREACT,
      [VarNames.APP_NAME]: AppInfo.CURRENT_WORKSPACE_APP_NAME,
      [VarNames.SHOULD_INCLUDE_INTERREACTION]: new String(
          CurrentVarValues.SHOULD_INCLUDE_INTERREACTION
        ),
      [VarNames.CUSTOM_TAGNAME]: (
          (CurrentVarValues.WITH_CUSTOM_TAGNAME === true)
            ? 'custom-tagname-test'
            : ''
        )
    }),
    new Webpack.ids.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin(
      htmlWebpackPluginConfig
    ),
    new HtmlWebpackPlugin({
      ...htmlWebpackPluginConfig,
      filename: 'interreaction-test.html',
      template: `${Paths.TEMPLATE_HTML_APP_ROOT_ABSOLUTE}/interreaction-test.html`,
      title: 'interReaction - Component Integration Project Test - Preact Build (production + development)',
      buildName: 'Preact',
      environmentName: 'production + development',
      mainClassName: 'preact',
      projectName: 'interPreaction',
      customTagName: (
          (CurrentVarValues.WITH_CUSTOM_TAGNAME === true)
            ? 'custom-tagname-test'
            : 'inter-reaction'
        )
    }),
    ...loaderConfig.plugins
  ],
  optimization: optimizationConfig
};
