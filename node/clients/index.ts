import { IOClients } from '@vtex/api'

import StatusClient from './status'

export class Clients extends IOClients {
  get status() {
    return this.getOrSet('status', StatusClient)
  }
}
