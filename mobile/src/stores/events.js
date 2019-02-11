import EntitiesStore, {loadAllHelper} from './entities-store'
import {action} from 'mobx'

export default class Events extends EntitiesStore {
  @action loadAll = loadAllHelper('events')
}