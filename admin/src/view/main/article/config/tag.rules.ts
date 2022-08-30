import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  tagname: [
    { required: true, message: '标签不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '长度为2-20个字符', trigger: 'blur' },
  ],
})

export default rules
