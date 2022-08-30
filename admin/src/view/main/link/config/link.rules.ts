import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '网站名称不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '长度为1-10个字符', trigger: 'blur' },
  ],
  avatar: [{ required: true, message: '网站logo不能为空', trigger: 'blur' }],
  url: [{ required: true, message: '网站链接不能为空', trigger: 'blur' }],
  outline: [{ required: true, message: '网站简述不能为空', trigger: 'blur' }],
})

export default rules
