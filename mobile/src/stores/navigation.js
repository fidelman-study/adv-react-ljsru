import { NavigationActions, StackActions } from 'react-navigation'
import { autorun } from 'mobx'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
  ref = null

  initStore = () => {
    let firstRun = true

    autorun(() =>{
      // has to be sync
      const { user } = this.getStore('auth')
      const screen = user ? 'lists' : 'auth'
      if (!firstRun) this.goTo(screen)
      firstRun = false
    })
  }

  setNavRef = ref => {
    this.ref = ref
    this.initStore()
  }

  goTo = (routeName, params) => this.ref.dispatch(NavigationActions.navigate({
    routeName, params,
  }))

  goBack = () => this.ref.dispatch(NavigationActions.back())

  reset = routeName => this.ref.dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName })
    ]
  }))
}

export default NavigationStore