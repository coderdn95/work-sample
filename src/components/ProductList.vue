<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import IconFolder from './icons/IconFolder.vue'
import Banner from './Banner.vue'
import ControlPanel from './ControlPanel.vue'
import axios from 'axios'
import Modal from './Modal.vue'
import Loading from './Loading.vue'

const state = reactive({
  images: [],
  upLoadFiles: [],
  isLoading: false,
  errorMessage: '',
  showModal: false
})

const showError = (msg: string) => {
  state.errorMessage = msg
  setTimeout(() => {
    state.errorMessage = ''
  }, 5000)
}

const validateFile = (file: File) => {
  const maxSize = 1024 * 1024
  if (file.size > maxSize) {
    showError('File size exceeds 1MB limit.')
    return
  }

  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    showError('Only JPEG and PNG files are allowed.')
    return
  }

  state.errorMessage = ''
}
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      validateFile(files[i])
      if (!state.errorMessage) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            state.images.push(e.target.result as string)
          }
        }
        reader.readAsDataURL(files[i])
      }
    }
  }
}

const onClickLeft = (index: number) => {
  if (index === 0) {
    return
  }
  let temp = state.images[index]
  state.images[index] = state.images[index - 1]
  state.images[index - 1] = temp
}

const onClickRight = (index: number) => {
  if (index === state.images.length - 1) {
    return
  }
  let temp = state.images[index]
  state.images[index] = state.images[index + 1]
  state.images[index + 1] = temp
}

const onDelete = (index: number) => {
  state.images = [...state.images.slice(0, index), ...state.images.slice(index + 1)]
}

const openModal = () => {
  state.showModal = true
}

const onSubmit = async () => {
  if (state.images.length === 0) return
  state.showModal = false
  try {
    state.isLoading = true
    const formData = new FormData()

    for (let i = 0; i < state.images.length; i++) {
      formData.append('files[]', state.images[i])
    }
    const response = await axios.post('https://httpbin.org/post', formData)
    console.log(response.data)

    state.upLoadFiles = response.data.files
    state.images = []
  } catch (error) {
    console.error('Error uploading files:', error)
  } finally {
    state.isLoading = false
    openModal()
  }
}
</script>

<template>
  <div v-if="state.isLoading">
    <Loading />
  </div>
  <div class="wrapper">
    <Modal v-if="state.showModal" message="Your data was saved!" :duration="3000"></Modal>
    <Banner />
    <main>
      <div class="previewWrapper">
        <template v-if="state.images.length">
          <div class="previewContainer">
            <div class="previewBox" v-for="(item, index) in state.images" :key="index">
              <img :src="item" data-test="imageItem" class="imageItem" />
              <div class="controlPanel">
                <ControlPanel
                  :index="index"
                  :imgLength="state.images.length - 1"
                  @onClickLeft="onClickLeft"
                  @onClickRight="onClickRight"
                  @onDelete="onDelete"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="uploadBtnWrapper">
          <input
            type="file"
            multiple
            name="upload-file"
            id="upload-file"
            accept="image/*"
            @change="onFileChange"
            hidden
          />
          <label for="upload-file" refs="upload-file" class="uploadBtn"
            ><IconFolder />ファイルを選択する</label
          >
        </div>
        <p v-if="state.errorMessage" style="color: red">
          {{ state.errorMessage }}
        </p>
        <div class="btnWrapper">
          <button class="btn btnSubmit" :disabled="state.images.length === 0" type="submit">
            保存
          </button>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 30px;
}
.banner {
  display: none;
}
.bannerDes {
  font-weight: bold;
}
main {
  width: 100%;
}

.previewWrapper {
  margin-bottom: 30px;
}

.previewContainer {
  display: grid;
  grid-template-columns: repeat(2, 48%);
  grid-gap: 15px;
}

.imageItem {
  max-width: 100%;
  overflow: hidden;
}

.btnSubmit {
  display: block;
  background-color: var(--vt-c-green);
  width: 70%;
  color: var(--vt-c-white);
  font-weight: bold;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
}

.btnSubmit:hover {
  background-color: var(--vt-c-green-light);
}

.btnSubmit:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
}

.btnWrapper {
  display: flex;
  justify-content: center;
  align-self: normal;
  margin-top: 30px;
}
.uploadBtnWrapper {
  display: inline-block;
}
.uploadBtn {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: var(--vt-c-dark-light);
  border: 1px solid var(--vt-c-dark);
  padding: 4px;
  border-radius: 4px;
  font-weight: normal;
  cursor: pointer;
}

.uploadBtn:hover {
  background-color: var(--vt-c-grey-light);
}

.previewBox {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--vt-c-dark);
  border-radius: 4px;
  position: relative;
}

.controlPanel {
  position: absolute;
  right: 15px;
  top: 10px;
}

@media screen and (min-width: 580px) {
  .banner {
    display: block;
    width: 350px;
    height: 500px;
    background-color: var(--vt-c-grey-light);
    padding: 20px;
  }
}

@media screen and (min-width: 720px) {
  .previewContainer {
    grid-template-columns: repeat(3, 33.3%);
    grid-gap: 15px;
  }
}

@media screen and (min-width: 980px) {
  .previewContainer {
    grid-template-columns: repeat(4, 24%);
    grid-gap: 15px;
  }
}
</style>
