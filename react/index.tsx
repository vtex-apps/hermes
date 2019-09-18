/* eslint-disable no-console */
import React from 'react'
import { PageBlock, Alert } from 'vtex.styleguide'

import Logo from './components/Logo'
import Speedometer from './components/Speedometer'

export default class App extends React.Component {
  public state: {
    wifiStatus: boolean
    slackStatus: boolean
    githubStatus: boolean
    gmailStatus: boolean
    googleOAuthStatus: boolean
    cloudflareStatus: boolean
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      wifiStatus: true,
      slackStatus: true,
      githubStatus: true,
      gmailStatus: true,
      googleOAuthStatus: true,
      cloudflareStatus: true,
    }
  }

  public async componentDidMount() {
    window.addEventListener('online', () => this.setState({ wifiStatus: true }))
    window.addEventListener('offline', () =>
      this.setState({ wifiStatus: false })
    )
  }

  public componentWillUnmount() {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }

  public render() {
    const {
      wifiStatus,
      slackStatus,
      githubStatus,
      gmailStatus,
      googleOAuthStatus,
      cloudflareStatus,
    } = this.state
    return (
      <div
        className="flex justify-center pb7 bg-muted-5 min-vh-100"
        style={{ backgroundColor: '#666' }}>
        <div className="w-100 ph10 pv5">
          <div className="flex flex-row items-center">
            <Logo />
            <h2 className="ml3 c-muted-5">H E R M E S</h2>
          </div>
          <PageBlock variation="aside">
            <div>
              <div className="mb3">
                <Alert type={wifiStatus ? 'success' : 'error'}>{`wifi is ${
                  wifiStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert type={slackStatus ? 'success' : 'error'}>{`Slack is ${
                  slackStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert type={githubStatus ? 'success' : 'error'}>{`Github is ${
                  githubStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert type={githubStatus ? 'success' : 'error'}>{`Github is ${
                  githubStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert type={gmailStatus ? 'success' : 'error'}>{`Gmail is ${
                  gmailStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert
                  type={
                    googleOAuthStatus ? 'success' : 'error'
                  }>{`Google OAuth is ${
                  googleOAuthStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
              <div className="mb3">
                <Alert
                  type={
                    cloudflareStatus ? 'success' : 'error'
                  }>{`Cloud Flare is ${
                  cloudflareStatus ? 'online' : 'offline'
                }`}</Alert>
              </div>
            </div>
            <Speedometer />
          </PageBlock>
        </div>
      </div>
    )
  }
}
