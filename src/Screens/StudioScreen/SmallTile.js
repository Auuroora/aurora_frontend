import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Modal, Dimensions, StyleSheet} from "react-native"
import { 
  Image,
  TouchableOpacity,
  View,
  Text
} from '@shoutem/ui'
const { width } = Dimensions.get('window')

Tile.propTypes = {
  image: PropTypes.string,
  filterId: PropTypes.number,
  onPressDone: PropTypes.func,
  selectFilter: PropTypes.func,
  deleteFilter :PropTypes.func,
}
export default function Tile (props) {
  
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)
        }}
      >              
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>필터를 삭제하시겠습니까?</Text>
            <View style ={{flexDirection: 'row', marginTop:30}}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.buttonText}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitbutton}
                onPress={async()=>{
                  await props.deleteFilter(props.filterId)
                  setModalVisible(!modalVisible)
                }}>
                <Text style={styles.buttonText}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
      <TouchableOpacity
        styleName="flexible"
        onLongPress={() => setModalVisible(!modalVisible)}
        onPress={() => {props.selectFilter(props.filter)}}>
        <Image
          style={{width: (1/3.2)* width, height: (1/3.2) * width}}
          styleName="medium-square"
          source={{ uri: props.image  }}
        />
      </TouchableOpacity>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  '#1E1E1E',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5
  },
  openButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  submitbutton: {
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#FA3311',
    marginRight: 10
  },
  closeButton: {
    height: 50,
    borderRadius: 6,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginRight: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
})