<template>
  <div class="container">
    <a-row>
      <a-col :span="12" :offset="6">
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
  .ant-carousel :deep(.slick-slide) {
    height: 500px;
    text-align: center;
    background: @secondaryColor;
    overflow: hidden;
  }

  .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: @white;
    background-color: @secondaryColor;
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
}
</style>
