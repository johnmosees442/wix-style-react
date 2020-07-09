import React from 'react';
import Input from './Input';
import classes from './Input.st.css';
import DATA_ATTR from './DataAttr';

class ThemedInput extends Input {
  getDataAttr = ({ dataHook, size, status }) => {
    return {
      'data-hook': dataHook,
      [DATA_ATTR.DATA_SIZE]: size,
      [DATA_ATTR.DATA_STATUS]: status,
    };
  };

  render() {
    const {
      size,
      dataHook,
      rtl,
      status,
      disabled,
      forceHover,
      forceFocus,
      roundInput,
      className,
      noLeftBorderRadius,
      noRightBorderRadius,
      readOnly,
      withSelection,
    } = this.props;

    const placeholder = this.props.placeholder;
    return (
      <div
        {...classes(
          'root',
          {
            size,
            focus: forceFocus || this.state.focus,
            status,
            forceHover,
            readOnly,
            disabled,
            withSelection,
            roundInput,
            noRightBorderRadius,
            noLeftBorderRadius,
          },
          { className },
        )}
        dir={rtl ? 'rtl' : null}
        {...this.getDataAttr({ dataHook, size, status })}
      >
        {super.render({ placeholder })}
      </div>
    );
  }
}

ThemedInput.propTypes = {
  ...Input.propTypes,
};

export default ThemedInput;
