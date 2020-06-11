import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  Icon,
  TouchableOpacity,
  Image
} from '@shoutem/ui'
import axios from '../../axiosConfig'

export default class Comments extends Component {
  constructor(props) {
    super(props)
  }

  onClickReport = async() => {
    const data = {
      report: {
        reportable_type: "Comment",
        reportable_id: this.props.id,
        category: "insult",
        content: "욕설 신고"
      }
    }
    await axios.post('/reports', data)
    .then((res) => {
      alert(res.data)
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{this.props.name}</Text>
            <View style={styles.contentHeader}>
              <TouchableOpacity style={{flexDirection:'row', justifyContent:"flex-end", marginTop: 3}} onPress={this.onClickReport}>
                <Image
                  source={ require('../../assets/image/siren.png' )}
                  style={styles.reportIcon}
                />
                <Text style={styles.report}>
                  욕설신고
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            rkType='primary3 mediumLine'
            style={styles.comment}
          >{this.props.comment}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  reportIcon: {
    width: 16,
    height: 16,
    color :'white',
    marginRight: 5
  },
  report:{
    fontSize: 11,
    color: 'white',
    marginTop: 5
  },
  comment:{
    fontSize:15,
    color:"#808080",
    marginLeft:15
  },
  name:{
    fontSize:16,
    color:'white',
    fontWeight:"bold",
  },
})
