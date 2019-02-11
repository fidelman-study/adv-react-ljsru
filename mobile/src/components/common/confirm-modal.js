import React from 'react'
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'

class ConfirmModal extends React.Component {
  render() {
    const {
      visible,
      children,
      onConfirm,
      onCancel
    } = this.props

    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.container}>
          <Text>{children}</Text>
          <View style={styles.buttons}>
            <Button title="ok" onPress={onConfirm}/>
            <Button title="cancel" onPress={onCancel}/>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    maxWidth: '80%',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default ConfirmModal