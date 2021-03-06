import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MapView, Location, Permissions } from 'expo'
import {observer} from 'mobx-react'
import {observable, action} from 'mobx'

@observer
export default class EventMap extends Component {
  static navigationOptions = {
    title: 'Event Map',
  }

  @observable coordinates = null
  @observable permissionGranted = false
  @observable permissionAsked = false

  @action setPermission = granted => this.permissionGranted = granted
  @action setPermissionAsked = asked => this.permissionAsked = asked
  @action setCoordinates = coords => this.coordinates = coords

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.LOCATION)
    this.setPermissionAsked(true)
    this.setPermission(status === 'granted')

    const {coords} = await Location.getCurrentPositionAsync()
    this.setCoordinates(coords)
  }

  render() {
    if (!this.coordinates) return null

    return (
      <MapView
        style={styles.container}
        initialRegion={{
          ...this.coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker coordinate={{...this.coordinates}} />
      </MapView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})