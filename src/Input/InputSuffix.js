import React from 'react';
import PropTypes from 'prop-types';
import DropDownArrow from 'wix-ui-icons-common/system/DropDownArrow';
import CloseButton from '../CloseButton';
import StatusIndicator from '../StatusIndicator';
import classes from './Input.st.css';
import Box from '../Box';
import { dataHooks } from './constants';
import Affix from './Affix';

const isFixVisible = fix => fix.isVisible;

const suffixRules = {
  inputStatusSuffix: ({ status, disabled }) => status && !disabled,
  clearButton: ({ isClearButtonVisible }) => isClearButtonVisible,
  menuArrow: ({ menuArrow, isClearButtonVisible }) =>
    menuArrow && !isClearButtonVisible,
  customSuffix: ({ suffix }) => !!suffix,
};

const getVisibleSuffixCount = args =>
  Object.keys(suffixRules)
    .map(key => suffixRules[key])
    .map(fn => fn(args))
    .filter(x => x).length;

const InputSuffix = ({
  statusMessage,
  status,
  disabled,
  onIconClicked,
  isClearButtonVisible,
  onClear,
  clearButtonSize,
  menuArrow,
  suffix,
  tooltipPlacement,
}) => {
  const suffixes = [
    {
      // Status Indicator
      component: key => (
        <Affix key={key}>
          <StatusIndicator
            dataHook={dataHooks.status}
            status={status}
            message={statusMessage}
            tooltipPlacement={tooltipPlacement}
          />
        </Affix>
      ),
      isVisible: suffixRules.inputStatusSuffix({ status, disabled }),
    },
    {
      // Close Button
      component: key => (
        <Affix key={key}>
          <CloseButton
            dataHook="input-clear-button"
            skin="standardFilled"
            size={clearButtonSize}
            onClick={onClear}
          />
        </Affix>
      ),
      isVisible: suffixRules.clearButton({ isClearButtonVisible }),
    },
    {
      // Custom Suffix
      component: key => React.cloneElement(suffix, { key }),
      isVisible: suffixRules.customSuffix({ suffix }),
    },
    {
      // Dropdown Arrow
      component: key => (
        <Affix key={key} className={classes.menuArrow}>
          <div
            key={key}
            className={classes.menuArrow}
            disabled={disabled}
            onClick={onIconClicked}
          >
            <DropDownArrow />
          </div>
        </Affix>
      ),
      isVisible: suffixRules.menuArrow({
        menuArrow,
        isClearButtonVisible,
      }),
    },
  ].filter(isFixVisible);

  return (
    <Box className={classes.suffixes}>
      {suffixes.map((s, key) => s.component(key))}
    </Box>
  );
};

InputSuffix.propTypes = {
  suffixes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.func.isRequired,
      isVisible: PropTypes.bool.isRequired,
    }),
  ),
  statusMessage: PropTypes.node,
  status: PropTypes.oneOf(['loading', 'error', 'warning']),
  disabled: PropTypes.bool,
  onIconClicked: PropTypes.func,
  isClearButtonVisible: PropTypes.bool,
  onClear: PropTypes.func,
  clearButtonSize: PropTypes.oneOf(['small', 'medium']),
  menuArrow: PropTypes.bool,
  suffix: PropTypes.node,
  tooltipPlacement: PropTypes.string,
};

export default InputSuffix;
export { getVisibleSuffixCount };
