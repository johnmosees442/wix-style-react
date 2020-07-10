import React, { useRef } from 'react';
import ScrollableContainer from './index';
import PropTypes from 'prop-types';

// use this wrapper if you need to use ScrollableContainer inside a class component
export const ScrollableContainerWrapper = props => {
  const scrollableContentRef = useRef();

  React.useLayoutEffect(() => {
    if (props.setupRef) {
      props.setupRef(scrollableContentRef.current);
    }
  }, [props]);

  return (
    <ScrollableContainer {...props} ref={scrollableContentRef}>
      {props.children}
    </ScrollableContainer>
  );
};

ScrollableContainerWrapper.propTypes = {
  /** A callback for setting a ref in parent component
   * ##### Signature:
   * function(target: HTMLElement) => void
   */
  setupRef: PropTypes.func,
};
