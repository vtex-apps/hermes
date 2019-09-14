/* eslint-disable no-console */
import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { Tag, PageBlock, Alert } from 'vtex.styleguide'

export default class App extends React.Component {
  public state: {
    wifiStatus: boolean
    slackStatus: boolean
    wifiSpeed: number
  }
  public constructor(props: any) {
    super(props)
    this.state = {
      wifiStatus: true,
      slackStatus: true,
      wifiSpeed: 420,
    }
  }

  public async componentDidMount() {
    window.addEventListener('online', () => this.setState({ wifiStatus: true }))
    window.addEventListener('offline', () =>
      this.setState({ wifiStatus: false })
    )
    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }
    const loop: any = () =>
      setTimeout(() => {
        const { wifiSpeed } = this.state
        this.setState({
          wifiSpeed:
            wifiSpeed > 440
              ? wifiSpeed - getRandomInt(5, 10)
              : wifiSpeed < 400
              ? wifiSpeed + getRandomInt(5, 10)
              : wifiSpeed - getRandomInt(5, 10),
        })
        loop()
      }, getRandomInt(420, 840))

    loop()
  }

  public componentWillUnmount() {
    window.removeEventListener('online', () => {})
    window.removeEventListener('offline', () => {})
  }

  public render() {
    const { wifiStatus, wifiSpeed } = this.state
    return (
      <div
        className="flex justify-center pb7 bg-muted-5 min-vh-100"
        style={{ backgroundColor: '#333' }}>
        <div className="w-100 pa5">
          <PageBlock variation="aside">
            <div>
              <Alert type={wifiStatus ? 'success' : 'error'}>{`wifi is ${
                wifiStatus ? 'online' : 'offline'
              }`}</Alert>
            </div>
            <div className="flex flex-column">
              <div className="center" style={{ width: 300, height: 170 }}>
                <ReactSpeedometer
                  maxValue={500}
                  value={wifiSpeed}
                  needleColor="black"
                  startColor="red"
                  segments={10}
                  endColor="green"
                />
              </div>
              <span className="mt4 tc">
                WiFi Speed
                <span className="ml4">
                  <Tag
                    type={wifiSpeed > 400 ? 'success' : 'warning'}
                    variation="low">
                    {`ping ${Math.floor(wifiSpeed / 10)}`}
                  </Tag>
                </span>
              </span>
            </div>
          </PageBlock>
        </div>
      </div>
    )
  }
}
