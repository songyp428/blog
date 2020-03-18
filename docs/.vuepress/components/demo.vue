<template>
  <div>
    <div class="upload-container">
      <div
        class="img-container"
        :class="
          file.key === fileUrlKey
            ? operateMethod === 'upload'
              ? 'img-container-enter'
              : 'img-container-out'
            : ''
        "
        v-for="(file, index) in pictureList"
        :key="file.key"
      >
        <img :src="file.url" alt="" />
        <span class="img-hover-container">
          <!--<a download="download" :href="file.url" target="_blank">
            <span><i class="el-icon-download"></i></span>
          </a>-->
          <span @click="handleRemoveFile(index)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
      <!--<el-upload
        action=""
        list-type="picture-card"
        :show-file-list="false"
        :before-upload="beforeFileUpload"
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>-->
    </div>
    <el-button @click="handleReset">重置</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileUrlKey: '',
      operateMethod: '',
      pictureList: [{
        url: 'https://s3plus.sankuai.com/v1/mss_217611ce09cf41e682ea066ca826ce67/small-file/2020-03-16_23:33:09_251554803888_.pic_hd.jpg',
        key: '0'
      },{
        url: 'https://s3plus.sankuai.com/v1/mss_217611ce09cf41e682ea066ca826ce67/small-file/2020-03-16_23:33:34_201554803883_.pic_hd.jpg',
        key: '1'
      }]
    }
  },
  mounted() {
  },
  methods: {
    handleReset() {
      this.fileUrlKey = ''
      this.operateMethod = ''
      this.pictureList = [{
        url: 'https://s3plus.sankuai.com/v1/mss_217611ce09cf41e682ea066ca826ce67/small-file/2020-03-16_23:33:09_251554803888_.pic_hd.jpg',
        key: '0'
      },{
        url: 'https://s3plus.sankuai.com/v1/mss_217611ce09cf41e682ea066ca826ce67/small-file/2020-03-16_23:33:34_201554803883_.pic_hd.jpg',
        key: '1'
      }]
    },
    handleRemoveFile(index) {
      this.fileUrlKey = this.pictureList[index].key
      this.operateMethod = 'remove'
      setTimeout(() => {
        this.pictureList.splice(index, 1)
      }, 500)
    },
    beforeFileUpload(file) {
      console.log(file)
    }
  }
}
</script>

<style>
  @keyframes entermove {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @-webkit-keyframes entermove /*Safari and Chrome*/ {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  @keyframes outmove {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @-webkit-keyframes outmove /*Safari and Chrome*/ {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .upload-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .img-container {
    display: inline-block;
    position: relative;
    margin-right: 4px;
    width: 100px;
    height: 100px;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    overflow: hidden;
  }

  .img-title {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }

  .img-hover-container {
    position: absolute;
    width: 100%;
    height: 100px;
    left: 0;
    top: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .img-container:hover .img-hover-container {
    opacity: 1;
  }

  .img-container-enter {
    animation: entermove ease 0.8s;
    -webkit-animation: entermove ease 0.8s; /*Safari and Chrome*/
  }

  .img-container-out {
    animation: outmove ease 1s;
    -webkit-animation: outmove ease 1s; /*Safari and Chrome*/
  }
</style>