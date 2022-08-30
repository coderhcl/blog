import { defineStore } from 'pinia'
import { getArticleAndSelect } from '../api/index'
import Cookie from 'js-cookie'

const useStore = defineStore('store', {
  state: () => ({
    // 所有文章数据
    allArticleData: [],
    articleListData: [],
    articleTotal: 0,
    selectArtitleTotal: 0,
    dayMsgText: '',
    dayMsgFrom: '',
    category: [],
  }),
  actions: {},
  getters: {},
})

export default useStore
