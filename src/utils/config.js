import { message } from 'ant-design-vue'

// 消息提示的全局配置
message.config = ({
  top: message.top || '50%',
  duration: 2,
  // 最大显示数量
  maxCount: 2
})

export default message
