<style>
.upload-file {
  display: none;
}
.upload-container {
  display: flex;
}
.upload-preview-img {
    height: 5rem;
    width: 5rem;
    background-size: cover;
}
</style>

<template>
    <div class="upload-container">
      <div class="upload-preview-img-wrapper">
        <div class="upload-preview-img" :style="previewSrc"></div>
      </div>
        <div class="upload-wrapper">
            <input type="file" :accept="options.accept" @change="changeFile" class="upload-file">
            <cov-button @click="touchUp">选择图片</cov-button>
        </div>
    </div>
</template>
<script>
import covButton from './button.vue'
const imageType = /^image\//

export default {
  data () {
    return {
      options: {
        accept: '.jpg,.png,.gif,.webp,jpeg'
      },
      $file: null,
      file: {}
    }
  },
  computed: {
    previewSrc () {
      if (this.file.src) {
        return {
          'background-image': 'url(' + this.file.src + ')'
        }
      }
      return {
        'background-color': '#ccc'
      }
    }
  },
  ready () {
    this.$file = this.$el.getElementsByClassName('upload-file')[0]
  },
  components: {
    covButton
  },
  methods: {
    sizeCalc (size) {
      return Math.round(size / 10.24) / 100 + 'Kb'
    },
    touchUp (e) {
      if (this.$file) {
        this.$file.click()
      }
    },
    changeFile (e) {
      let previewUrl = ''
      for (let i = 0, len = this.$file.files.length; i < len; i++) {
        previewUrl = ''
        if (imageType.test(this.$file.files[i].type)) {
          previewUrl = window.URL.createObjectURL(this.$file.files[i])
        }
        this.file = {
          src: previewUrl,
          raw: this.$file.files[i]
        }
      }
      let avFile = new window.AV.File(this.file.raw.name, this.file.raw)
      avFile
        .save()
        .then(file => {
          console.log(file.thumbnailURL(100, 200))
          this.$emit('upload-success', file.url())
        }, error => {
          this.$emit('upload-error', error)
        })
    },
    delFile (item) {
      this.file = {}
    }
  }
}
</script>