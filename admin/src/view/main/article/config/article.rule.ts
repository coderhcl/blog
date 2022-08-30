import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  searchTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
})

export default rules
