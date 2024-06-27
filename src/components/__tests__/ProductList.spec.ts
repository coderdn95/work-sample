import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductList from '../ProductList.vue'
import ControlPanel from '../ControlPanel.vue'

describe('Check Input Upload File', () => {
  it('render a Upload File Input', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
  })
  it('Has a label with the correct text', () => {
    const wrapper = mount(ProductList)
    const labelUpload = wrapper.find('label[for="upload-file"]')
    expect(labelUpload.exists()).toBe(true)
    expect(labelUpload.text()).toBe('ファイルを選択する')
  })

  it('File input has multiple attribute', () => {
    const wrapper = mount(ProductList)

    const inputUpload = wrapper.find('input[type="file"]')

    expect(inputUpload.attributes('multiple')).toBeDefined()
  })
})

describe('Check Btn Submit', () => {
  it('render a Submit button', () => {
    const wrapper = mount(ProductList)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })
  it('has a button with the correct text', () => {
    const wrapper = mount(ProductList)
    const submitBtn = wrapper.find('button[type="submit"]')
    expect(submitBtn.text()).toBe('保存')
  })
})

describe('SettingControl', () => {
  it('Open buttonContent when click [设定] button', async () => {
    const wrapper = mount(ControlPanel)
    expect(wrapper.find('[data-test="buttonContent"]').exists()).toBe(false)
    await wrapper.find('[data-test="settingButton"]').trigger('click')
    await expect(wrapper.find('[data-test="buttonContent"]').exists()).toBe(true)
  })
})
