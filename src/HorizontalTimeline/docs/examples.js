export const structure = `
<HorizontalTimeline
  steps={[
    {label: 'Instructions completed'},
    {label: 'Domain check'},
    {label: 'Site is live worldwide'},
  ]}
/>
`;

export const width = `
<HorizontalTimeline
  steps={[
    {label: 'Thirty percent width', width: '30%'},
    {label: 'Width is auto'},
    {label: 'Two hundred pixels width', width: '200px'},
  ]}
/>
`;

export const predefined = `
<HorizontalTimeline
  steps={[
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
    { label: 'Domain connecting' },
    {
      label: 'Site is live worldwide',
      icon: <HorizontalTimeline.ErrorIcon />,
    },
  ]}
/>
`;
