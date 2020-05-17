import axios from 'axios'

const instance = axios.create({
  // .. where we make our configurations
  baseURL: 'http://aurora-application.ap-northeast-2.elasticbeanstalk.com'
})

export default instance
