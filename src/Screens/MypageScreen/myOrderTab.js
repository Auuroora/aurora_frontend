import * as React from 'react'
import { View,StyleSheet, Dimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import PropTypes from 'prop-types'
import {
  ListView,
  Row,
  Subtitle,
  Image,
  Divider
} from '@shoutem/ui'

const { height } = Dimensions.get('window')

myOrderTab.propTypes = {
  orderList: PropTypes.array
}
const renderRow = (order) =>{
  return (
    <View style={{ backgroundColor: 'gray'}}>
      <Row
        style ={{ backgroundColor: '#1E1E1E'}}>
        <Image
          style={{ height: height * 0.12, width: height * 0.12 }}
          source={{uri: "http://dmshopkorea.com/data/bbs/design/201304/3064753709_9d951bfb_0x1800.jpg"}}
        />
        <View styleName="vertical stretch">
          <Subtitle style={{
            color: 'white',
            marginBottom: 0
          }}>필터ID: {order.id}</Subtitle>
          <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>금액: {order.total} 원</Subtitle>
          <Subtitle styleName="md-gutter-right" style={{color: 'white', marginBottom: 15, fontSize: 13}}>구매일: {order.purchased_at}</Subtitle>
        </View>
      </Row>
      <Divider styleName="line" />
    </View>
  )
}
const PurchasetRoute = (props) => (
  <ListView
    style={{ backgroundColor: 'pink' }}
    data={props.orderList}
    renderRow={renderRow}
  />
)
 
const SalesRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
)
 
const initialLayout = { width: Dimensions.get('window').width }
 
export default function myOrderTab(props) {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'purchase', title: 'Purchase' },
    { key: 'sales', title: 'Sales' },
  ])
 
  const renderScene = SceneMap({
    purchase: () => <PurchasetRoute orderList={props.orderList}/>,
    sales: SalesRoute,
  })
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{color:'gray'}}
    />
  )
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
})