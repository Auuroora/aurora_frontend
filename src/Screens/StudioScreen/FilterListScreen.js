import React, { Component } from 'react'
import {
  Dimensions,
  StyleSheet
} from 'react-native'

import {
  ListView,
  GridRow,
  Screen,
  View,
  Button,
  Subtitle,
  Spinner
} from '@shoutem/ui'

import LargeTile from '../../Components/LargeTile'
import axios from '../../axiosConfig'
import ImagePicker from 'react-native-image-picker'
import SmallTile from './SmallTile'

import { AWS_S3_STORAGE_URL } from 'react-native-dotenv'
import { loadImg } from '../../OpencvJs'
import { mapCvFunction, saveImage } from '../../utils'

const { width } = Dimensions.get('window')

const ImagePickerOptions = {
  title: 'Select Image',
  customButtons: [{ name: 'fb', title: '저장하기' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

class FilterListScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFile: {
        data: null
      },
      filterId: null,
      myFilter: [],
      purchaseFilter: [],
      showingList: this.currentTab,
      isImageSelected: false,
      groupedData: null,
      isModal:false
      isLoading: true,
      currentTab: 'my'
    }
    
    this.getFilterList()
  }

  getFilterList = async () => {
    const res = await axios.get('/myfilter', { "user_info": "true" })
    
    await this.setState({ 
      myFilter: res.data.my_filter,
      purchaseFilter: res.data.purchase_filter,
      showingList: res.data.my_filter
    })

    this.onClickTab(this.state.currentTab)
  }

  onClickTab = async (tabName) => {
    await this.setState({isLoading: true, currentTab: tabName})

    let groupedData = null

    if(this.state.currentTab === 'my') {
      groupedData = GridRow.groupByRows(this.state.myFilter, 3, () => {
        return 1
      })

    } else {
      groupedData = GridRow.groupByRows(this.state.purchaseFilter, 3, () => {
        return 1
      })
    }
    
    await this.setState({ groupedData: groupedData, isLoading: false })
  }

  onChooseFiletoApply = async () => {
    ImagePicker.showImagePicker(ImagePickerOptions, async response => {
      if (response.didCancel) {
        return
      }
      else if (response.error) {
        return
      }
      else if (response.customButton) {
        if (!this.state.isImageSelected || !this.state.imageFile) {
          alert('먼저 이미지를 선택해주세요.')
          return
        }
        await saveImage('data:image/jpeg;base64,' + this.state.imageFile.data)
        alert('이미지가 저장되었습니다.')
      }
      else {
        await this.setState({
          imageFile: response,
          originalFile: response.data,
          isImageSelected: true
        })
      }
    })
  }

  onClickLargeTile = () => {
    this.onChooseFiletoApply()
  }

  onClickFilter = async (filterInfo) => {
    if (!this.state.isImageSelected) {
      alert('이미지를 선택해주세요.')
      return
    }
    const res = await fetch(filterInfo)
    const preset = await res.json()
    let resultImg = null

    const imageDownSizeWidth = width
    const imageDownSizeHeight = this.state.imageFile.height * (width / this.state.imageFile.width)

    loadImg(this.state.originalFile, imageDownSizeWidth, imageDownSizeHeight)

    for (let key in preset) {
      const modifyFunc = mapCvFunction(key)
      try {
        resultImg = await modifyFunc(preset[key])
        this.setState({ modifiedFile: resultImg })
      } catch (e) {
        console.log(e)
      }
    }

    await this.setState(prevState => ({
      imageFile: {
        ...prevState.imageFile,
        data: this.state.modifiedFile
      }
    }))
  }


  deleteFilter = async(filterInfo) =>{
    console.log("delete", filterInfo)
    axios.delete('/filters/' + filterInfo)
      .then(() => {
        alert('필터 삭제가 완료되었습니다.')
      }).catch((err) => {
        console.log(err)
        alert('필터 삭제가 실패하였습니다.')
      })

  }
  renderRow = (rowData) => {
    const cellViews = rowData.map((filter, id) => {
      return (
        <SmallTile
          selectFilter={this.onClickFilter}
          deleteFilter ={this.deleteFilter}
          key={id}
          filter={AWS_S3_STORAGE_URL + filter.filter_data_path}
          image={AWS_S3_STORAGE_URL + filter.filter_name}
          filterId={filter.id}
        />
        
      )
    })
    return (
      <GridRow columns={3}>
        {cellViews}
      </GridRow>
    )
  }
  render() {

    return (
      <Screen style={styles.darkScreen}>
        <LargeTile
          image={this.state.isImageSelected ? { uri: 'data:image/jpeg;base64,' + this.state.imageFile.data } : null}
          onClickTile={this.onClickLargeTile}
          noImageComment={'이미지를 선택하고 필터를 적용하세요.'}
        ></LargeTile>
        <View style={styles.tabContainer}>
          <Button style={styles.tabButton} onPress={() => {this.onClickTab('my')}}>
            <Subtitle style={styles.tabText}>
              내가 만든 필터
            </Subtitle>
          </Button>
          <Button style={styles.tabButton} onPress={() => {this.onClickTab('purchase')}}>
            <Subtitle style={styles.tabText}>
              구매한 필터
            </Subtitle>
          </Button>
        </View>
        {this.state.isLoading ? (
          <Spinner/>
        ) : (
          <ListView
            style={{
              listContent: {
                backgroundColor: '#0A0A0A'
              }
            }}
            onRefresh={() => this.getFilterList()}
            data={this.state.groupedData}
            renderRow={this.renderRow}
          />
        )}
      </Screen>
    )
  }
}
export default FilterListScreen


const styles = StyleSheet.create({
  darkScreen: {
    backgroundColor: '#0A0A0A'
  },
  tabContainer: {
    flexDirection: 'row'
  },
  tabButton: {
    backgroundColor: '#222222',
    flex: 1,
    borderColor: '#333333'
  },
  tabText: {
    color: '#FAFAFA'
  }
})  
