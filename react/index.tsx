import React from 'react'

import { PageBlock, Alert } from 'vtex.styleguide'

export default class App extends React.Component {
  public state: {
    wifiStatus: boolean
    slackStatus: boolean
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      wifiStatus: true,
      slackStatus: true,
    }
  }

  public componentDidMount() {
    window.addEventListener('online', () => this.setState({ wifiStatus: true }))
    window.addEventListener('offline', () =>
      this.setState({ wifiStatus: false })
    )
    const loop = () =>
      setTimeout(async () => {
        const res = await fetch('https://status.slack.com/api/v2.0.0/current')
        console.log('ews ', res)
        loop()
      }, 1000)
    loop()
  }

  public componentWillUnmount() {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }

  public render() {
    const { wifiStatus } = this.state
    return (
      <div
        className="flex justify-center pb7 bg-muted-5 min-vh-100"
        style={{ backgroundColor: '#333' }}>
        <div className="w-100 pa5">
          <PageBlock variation="half">
            <div>
              <Alert type={wifiStatus ? 'success' : 'error'}>{`wifi is ${
                wifiStatus ? 'online' : 'offline'
              }`}</Alert>
            </div>
            <div>wifi data</div>
          </PageBlock>
        </div>
      </div>
    )
  }
}
