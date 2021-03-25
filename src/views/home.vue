<template>
  <div class="container">
    <div class="message-info">
      <span>提示Tips</span>
    </div>
    <a-row type="flex" justify="space-between" align="middle">
        <a-col v-for="i in 4" :span="5" :key="i">
          <a-card title="Card title">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </a-card>
        </a-col>
    </a-row>
    <a-row class="like-list">
      <a-col :span="8">
        <a-carousel autoplay arrows effect="fade">
          <template #prevArrow>
            <div class="custom-slick-arrow left-arrow">
              <left-circle-outlined />
            </div>
          </template>
          <template #nextArrow>
            <div class="custom-slick-arrow right-arrow">
              <right-circle-outlined />
            </div>
          </template>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </a-carousel>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: { LeftCircleOutlined, RightCircleOutlined },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px 50px 15px;

  .message-info {
    line-height: 30px;
    padding: 15px;
    color: @white;
    background: @primaryColor;
    border-radius: 4px;
    margin-bottom: @verticalHeight;
  }

  .ant-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  }

  .ant-carousel :deep(.slick-slide) {
    height: 500px;
    text-align: center;
    background: @primaryColor;
    overflow: hidden;
  }

  .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: @white;
    background-color: @primaryColor;
    opacity: 0.5;
  }

  .ant-carousel {
    .custom-slick-arrow.left-arrow {
      left: 10px;
      z-index: 10;
      &::before {
        display: none;
      }
    }
    .custom-slick-arrow.right-arrow {
      right: 10px;
      &::before {
        display: none;
      }
    }
  }

  .like-list {
    margin-top: @verticalHeight;
  }
}
</style>
