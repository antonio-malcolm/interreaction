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

// polyfills import first!
import 'polyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import CommonUtils from 'util/CommonUtils';

import InterReactionComponentOne from 'component/interreaction/InterReactionComponentOne';
import InterReactionComponentToo from 'component/interreaction/InterReactionComponentToo';
import InterReactionComponentThree from 'component/interreaction/InterReactionComponentThree';
import InterReactionComponentFour from 'component/interreaction/InterReactionComponentFour';
import InterReactionComponentFive from 'component/interreaction/InterReactionComponentFive';

import App from 'component/App';

const initInterReaction = function(InterReactionFactory) {
  InterReactionFactory.init(
    App,
    {
      InterReactionComponentOne,
      InterReactionComponentToo,
      InterReactionComponentThree,
      InterReactionComponentFour,
      InterReactionComponentFive
    },
    {
      className: (
          (process.env.WORKSPACE === 'preact')
          ? 'ir-preact'
          : 'ir-react'
        ),
      shouldEnableDebugging: (
          (process.env.ENVIRON === 'dev')
          || (process.env.ENVIRON === 'prod-dev')
        ),
      tagName: CommonUtils.isNonEmptyString(
          process.env.CUSTOM_TAGNAME
        ) ? process.env.CUSTOM_TAGNAME
        : undefined
    }
  );
};

if (process.env.SHOULD_INCLUDE_INTERREACTION === 'true') {
  if (process.env.WORKSPACE === 'preact') {
    import('interpreaction').then((InterReactionFactory) => {
      initInterReaction(
        InterReactionFactory.default
      );
    }).catch((err) => {
      console.error(
        `ERROR! Could not load the InterReactionFactory, due to error:`
      );
      console.error(err);
    });
  } else {
    import('interreaction').then((InterReactionFactory) => {
      initInterReaction(
        InterReactionFactory.default
      );
    }).catch((err) => {
      console.error(
        `ERROR! Could not load the InterReactionFactory, due to error:`
      );
      console.error(err);
    });
  }
} else {
  ReactDOM.render(
    <App />,
    document.getElementById('app-root')
  );
}
