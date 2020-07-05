import React from 'react';
import PropTypes from 'prop-types';
import styles from './Bounce.st.css';
import { CSSTransition } from 'react-transition-group';

import { dataHooks, timeout } from './constants';

function FirstChild({ children }) {
  const childrenArray = React.Children.toArray(children);
  return childrenArray[0] || null;
}

/** Bounce animation component */
class Bounce extends React.PureComponent {
  render() {
    const {
      dataHook,
      children,
      onEnter,
      onExited,
      triggerAnimation,
    } = this.props;

    return (
      <div {...styles('root', {}, this.props)} data-hook={dataHook}>
        <CSSTransition
          in={triggerAnimation}
          timeout={timeout}
          classNames={{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.exit,
            exitActive: styles.exitActive,
          }}
          onEnter={onEnter}
          onExited={onExited}
        >
          <div data-hook={dataHooks.animateContent}>
            <FirstChild children={children} />
          </div>
        </CSSTransition>
      </div>
    );
  }
}

Bounce.displayName = 'Bounce';

Bounce.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** The component which we would like to animate. When given multiple components- only the first child node will be animated. */
  children: PropTypes.node,

  /** Triggers the enter or exit states of the component. */
  triggerAnimation: PropTypes.bool,

  /** A callback fired immediately after the 'enter' or 'appear' class is applied.*/
  onEnter: PropTypes.func,

  /** A callback fired immediately after the 'exit' class is applied.*/
  onExited: PropTypes.func,
};

Bounce.defaultProps = {
  children: <div />,
};

export default Bounce;
