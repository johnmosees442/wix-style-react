import ReactTestUtils from 'react-dom/test-utils';

import styles from './InputArea.scss';
import { tooltipDriverFactory } from 'wix-ui-core/dist/src/components/tooltip/Tooltip.driver';
import { dataHooks } from './constants';

const inputAreaDriverFactory = ({ element, eventTrigger, wrapper }) => {
  const textAreaElement = element && element.childNodes[0];
  const textArea = () => element.querySelector('textarea');
  const name = () => textArea().getAttribute('name');
  const counterSelector = '[data-hook="counter"]';

  return {
    trigger: (trigger, event) =>
      ReactTestUtils.Simulate[trigger](textArea(), event),
    focus: () => textArea().focus(),
    enterText: text => {
      textArea().value = text;
      ReactTestUtils.Simulate.change(textArea(), {
        target: { name: name(), value: text },
      });
    },
    getValue: () => textArea().value,
    getName: name,
    getPlaceholder: () => textArea().placeholder,
    getDefaultValue: () => textArea().defaultValue,
    getRowsCount: () => textArea().rows,
    getMaxLength: () => textArea().maxLength,
    getTabIndex: () => textArea().tabIndex,
    getReadOnly: () => textArea().readOnly,
    getResizable: () => textAreaElement.classList.contains(styles.resizable),
    getDisabled: () =>
      textAreaElement.classList.contains(styles.disabled) &&
      textArea().disabled,
    getHasCounter: () => !!element.querySelectorAll(counterSelector).length,
    getCounterValue: () => element.querySelector(counterSelector).textContent,
    hasExclamation: () =>
      element.querySelectorAll(`.${styles.exclamation}`).length === 1,
    isFocusedStyle: () => textAreaElement.classList.contains(styles.hasFocus),
    isSizeSmall: () => textArea().classList.contains(styles.sizeSmall),
    isHoveredStyle: () => textAreaElement.classList.contains(styles.hasHover),
    isFocus: () => document.activeElement === textArea(),
    exists: () => !!textArea(),
    getStyle: () => textArea().style,
    getAriaLabel: () => textArea().getAttribute('aria-label'),
    getAriaControls: () => textArea().getAttribute('aria-controls'),
    getAriaDescribedby: () => textArea().getAttribute('aria-describedby'),

    // Status
    /** Return true if the given status is displayed */
    hasStatus: status => {
      const statusEl = element.querySelector(
        `[data-hook='${dataHooks.tooltip}']`,
      );
      return (statusEl && statusEl.getAttribute('data-status')) === status;
    },
    /** If there's a status message, returns its text value */
    getStatusMessage: () => {
      let tooltipText = null;
      const tooltipDriver = tooltipDriverFactory({
        element: element.querySelector(
          '[data-hook="status-indicator-tooltip"]',
        ),
        eventTrigger,
      });

      if (tooltipDriver.exists()) {
        tooltipDriver.mouseEnter();
        const contentElement = tooltipDriver.getContentElement();
        if (contentElement) {
          tooltipText = contentElement.textContent;
        }
      }

      return tooltipText;
    },
  };
};

export default inputAreaDriverFactory;
