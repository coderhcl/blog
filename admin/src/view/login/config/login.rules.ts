import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
})

export default rules
