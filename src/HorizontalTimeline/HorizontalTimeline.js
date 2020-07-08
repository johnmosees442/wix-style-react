import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import styles from './HorizontalTimeline.scss';
import classNames from 'classnames';
import StatusCompleteFilledSmall from 'wix-ui-icons-common/StatusCompleteFilledSmall';
import StatusAlertFilled from 'wix-ui-icons-common/StatusAlertFilled';
import { dataHooks } from './constants';

/** TODO-hr provide description */
class HorizontalTimeline extends React.PureComponent {
  render() {
    const { steps, dataHook, className } = this.props;

    return (
      <div className={classNames(styles.root, className)} data-hook={dataHook}>
        {steps.map(({ label, width, type, icon }, i) => {
          width = width || 'auto';
          type = type || 'inactive';
          icon = icon || <HorizontalTimeline.UpcomingIcon />;

          const isStepActive = type === 'active';
          const isNextStepActive =
            steps[i + 1] && steps[i + 1].type === 'active';

          return (
            <div className={styles.step} key={i} style={{ width }}>
              <div className={styles.topRow}>
                <div
                  className={classNames(styles.preIcon, {
                    [styles.active]: isStepActive,
                  })}
                />

                <div className={styles.iconWrapper}>{icon}</div>

                <div
                  className={classNames(styles.postIcon, {
                    [styles.active]: isNextStepActive,
                  })}
                />
              </div>

              {/* TODO-hr Fix ellipsis behaviour */}
              <Text
                className={styles.label}
                size="tiny"
                secondary={!isStepActive}
              >
                {label}
              </Text>
            </div>
          );
        })}
      </div>
    );
  }
}

HorizontalTimeline.UpcomingIcon = () => {
  return <div className={styles.upcomingIcon} />;
};

HorizontalTimeline.ActiveIcon = () => {
  return <div className={styles.activeIcon} />;
};

HorizontalTimeline.ErrorIcon = () => {
  return <StatusAlertFilled className={styles.errorIcon} />;
};

HorizontalTimeline.CompletedIcon = () => {
  return (
    <StatusCompleteFilledSmall size={23} className={styles.completedIcon} />
  );
};

HorizontalTimeline.displayName = 'HorizontalTimeline';

HorizontalTimeline.UpcomingIcon.displayName = 'HorizontalTimeline.UpcomingIcon';
HorizontalTimeline.ActiveIcon.displayName = 'HorizontalTimeline.ActiveIcon';
HorizontalTimeline.ErrorIcon.displayName = 'HorizontalTimeline.ErrorIcon';
HorizontalTimeline.CompletedIcon.displayName =
  'HorizontalTimeline.CompletedIcon';

// TODO-ht review description for every field

HorizontalTimeline.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** Timeline steps */
  steps: PropTypes.exact({
    /** step type */
    type: PropTypes.oneOf(['active', 'inactive']),

    /** step text */
    label: PropTypes.string.isRequired,

    /** step icon */
    icon: PropTypes.elementType,

    /** custom width for step */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // TODO-hr define this prop-type
  }).isRequired,
};

// TODO-hr find a way describe default values for steps
HorizontalTimeline.defaultProps = {};

export default HorizontalTimeline;
