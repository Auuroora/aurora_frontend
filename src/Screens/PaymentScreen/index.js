import React, {Component} from 'react'
import { WebView } from 'react-native-webview';
import {
  StatusBar,
  Dimensions
} from 'react-native'
import {
  NavigationBar,
  ImageBackground,
  Screen,
  ListView,
  Row,
  Subtitle,
  Icon,
  Button,
  Image,
  View
} from '@shoutem/ui'

import Title from '../../Components/Title'

/* TODO
 * 1. 장바구니에 담긴 리스트 자료 api로 요청 후 보여주기
 * 2. +버튼 누를 경우, 결제 api호출
 */

const { height } = Dimensions.get('window')
class PaymentScreen extends Component{
  render() {
    return (
      <WebView
        source={{uri: 'http://aurora-application.ap-northeast-2.elasticbeanstalk.com/package_page?user_id=1'}}
        style={{marginTop: 20}}
      />
    );
  }
}

export default PaymentScreen