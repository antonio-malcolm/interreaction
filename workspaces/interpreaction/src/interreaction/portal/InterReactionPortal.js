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

const isAssignedNotNull = function(obj) {
  return (
    (typeof obj !== 'undefined')
    && (obj !== null)
  );
};

class InterReactionPortal extends React.Component {
  state = {
    child: this.props.child,
    domNode: this.props.domNode,
    isRemountingChild: false,
    shouldMountChild: true
  }

  mountChild = () => {
    if (!this.state.shouldMountChild) {
      this.setState({ shouldMountChild: true });
    }
  }

  remountChild = () => {
    if (!this.state.isRemountingChild) {
      if (this.state.shouldMountChild) {
        this.setState({
          isRemountingChild: true,
          shouldMountChild: false
        });
      }
    }
  }

  getChild = () => {
    return this.state.child;
  }

  setChild = (child) => {
    this.setState({ child });
  }

  toggleMountChild = () => {
    this.setState({
      shouldMountChild: !this.state.shouldMountChild
    });
  }

  unmountChild = () => {
    if (this.state.shouldMountChild) {
      this.setState({ shouldMountChild: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextState = { ...this.state };

    if (!nextState.shouldMountChild) {
      if (nextState.isRemountingChild) {
        nextState.isRemountingChild = false;

        this.setState(nextState);
      } else {
        if (prevState.isRemountingChild) {
          nextState.shouldMountChild = true;

          this.setState(nextState);
        }
      }
    }
  }

  render() {
    if (!this.state.shouldMountChild) {
      return null;
    }

    if (!isAssignedNotNull(this.state.child)) {
      return null;
    }

    if (!isAssignedNotNull(this.state.domNode)) {
      return null;
    }

    return ReactDOM.createPortal(
      this.state.child,
      this.state.domNode
    );
  }
}

export default InterReactionPortal;
