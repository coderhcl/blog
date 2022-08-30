import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  date: [{ required: true, message: '日期不能为空', trigger: 'blur' }],
  describe: [{ required: true, message: '描述不能为空', trigger: 'blur' }],
})

export default rules
