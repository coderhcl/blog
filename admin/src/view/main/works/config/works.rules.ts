import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
  desc: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
  imgUrl: [{ required: true, message: '图片链接不能为空', trigger: 'blur' }],
  sourceUrl: [{ required: true, message: '作品链接不能为空', trigger: 'blur' }],
})

export default rules
