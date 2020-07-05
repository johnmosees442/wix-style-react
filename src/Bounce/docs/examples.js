export const bounceExample = `() => {
    const [ trigger, setTrigger ] = React.useState(false)
    return (
        <Layout>
          <Cell span='8'>
            <Bounce
              onEnter={() => setTrigger(true)}
              onEnter={() => setTrigger(false)}
              triggerAnimation={trigger}
            >
              <FormField label="Field label">
                <Input size="small" placeholder="Placeholder" />
              </FormField>
            </Bounce>
          </Cell>
          <Cell><Button onClick={() => setTrigger(true)}>Play</Button></Cell>
    </Layout>
   )
}
`;
