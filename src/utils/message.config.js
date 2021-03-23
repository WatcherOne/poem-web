/***************************************************************
 * author: watcher
 * emails: 286154864@qq.com
 * function: show message config
 * createdTime: 2021-03-22 11:20
 ***************************************************************/

import { message } from 'ant-design-vue'

// 消息提示的全局配置
message.config = ({
  top: '500px',
  duration: 2,
  // 最大显示数量
  maxCount: 2
})

export default message
