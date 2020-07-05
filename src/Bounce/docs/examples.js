export const bounceExample = `() => {
    const [ play, setPlay ] = React.useState(false)
    return (
        <Layout>
            <Cell span="4"><Button onClick={() => setPlay(true) }>Play</Button></Cell>
            <Cell span="8">
                <Bounce
                  onEnter={()=> setPlay(true)}
                  onEnter={()=> setPlay(false)}
                  triggerAnimation={play}
                >
                    <FormField label="Field label">
                        <Input size="small" placeholder="Placeholder" />
                    </FormField>
                </Bounce>
              </Cell>
            </Layout>
      )
}
`;
