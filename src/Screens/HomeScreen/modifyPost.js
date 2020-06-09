/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import { 
  NavigationBar,
  ImageBackground,
  Screen,
  Icon,
  TouchableOpacity,
} from '@shoutem/ui'

import axios from '../../axiosConfig'

/*
    1. 수정 버튼을 누르면
    2. 수정화면으로 이동 (화면엔 내용이 채워져있음)
     -- 필터와 가격은 변경하면 안되지 않나? description과 title만 변경?
     -- 인스타그램을 보니 사진은 변경이 안되고, 글 수정만 가능
    3. 수정 후 재 업로드.
    : upload page 리팩토링 후 진행
*/
import Title from '../../Components/Title'
class ModifyScreen extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imageFile: null,
      isSelectFilter: false,
      filterData:[],
      filter_id: '',
      userId:-1,
      title: '',
      description: '',
      tag:'',
      price:'',
    }
  }

  render(){
    return (
      <Screen styleName='fill-parent' style ={{ backgroundColor:'#1E1E1E'}}>
        <ImageBackground
          source={require('../../assets/image/Header.jpg')}
          styleName="large-ultra-wide"
        >
          <NavigationBar
            styleName="clear"
            leftComponent={
              <TouchableOpacity>
                <Icon name="left-arrow" />
              </TouchableOpacity>
            }
            centerComponent={
              <Title title={'Modify'} topMargin={50}/>
            }
            rightComponent={
              <TouchableOpacity
                onPress={() => {this.onClickUpload()}}>
                <Icon name="share" style ={{color  :"white", marginRight:15}} />
              </TouchableOpacity>
            }
          />
        </ImageBackground>
      </Screen>
    )
  }
}
export default ModifyScreen
