import React from 'react';
import { storiesOf } from '@storybook/react';
import HorizontalTimeline from '../HorizontalTimeline';

const tests = [
  {
    describe: 'steps',
    its: [
      {
        it: 'defaults',
        props: {
          steps: [
            { label: 'Instructions completed' },
            { label: 'Domain check' },
            { label: 'Site is live worldwide' },
          ],
        },
      },
      {
        it: 'should have custom width for steps',
        props: {
          steps: [
            { label: 'Instructions completed', width: '50px' },
            { label: 'Domain check' },
            { label: 'Site is live worldwide', width: '5%' },
          ],
        },
      },
      {
        it: 'should have different icons and types for each step',
        props: {
          steps: [
            {
              label: 'Instructions completed',
              type: 'active',
              icon: <HorizontalTimeline.CompletedIcon />,
            },
            {
              label: 'Domain check',
              type: 'active',
              icon: <HorizontalTimeline.ActiveIcon />,
            },
            {
              label: 'Domain connecting',
              icon: <HorizontalTimeline.UpcomingIcon />,
            },
            {
              label: 'Site is live worldwide',
              icon: <HorizontalTimeline.ErrorIcon />,
            },
          ],
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(
      `${HorizontalTimeline.displayName}${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => <HorizontalTimeline {...props} />);
  });
});
