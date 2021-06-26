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
import dayjs from 'dayjs';

import InterReactionComponentClassNames from 'component/interreaction/constant/InterReactionComponentClassNames';

import HandsomePenguin from 'component/interreaction/asset/image/penguin-5_463-384.jpg';

const InterReactionComponentFive = function(props) {
  console.log('InterReactionComponentFive is mounting. HALLO!');

  return (
    <section className={ `${InterReactionComponentClassNames.COMPONENT} ${InterReactionComponentClassNames.COMPONENT}_five` }>
      <img
        className={ InterReactionComponentClassNames.IMG_FIELD }
        src={ HandsomePenguin }
        width="463"
        height="384"
        alt="there should be a picture of a super-handsome penguin here..."
      />

      <p className={ InterReactionComponentClassNames.RENDER_DATETIME_FIELD }>
        { dayjs().format('DD MMMM YYYY [at] HH:mm:ss') }
      </p>

      <p className={ InterReactionComponentClassNames.COMPONENT_TYPE_FIELD }>
        Function Component
      </p>

      <p className={ InterReactionComponentClassNames.MSG_FIELD }>
        { props.msg }
      </p>
    </section>
  );
};

export default InterReactionComponentFive;
