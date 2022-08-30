import { FormRules } from 'element-plus'
import { reactive } from 'vue'

const rules = reactive<FormRules>({
  categoryname: [
    { required: true, message: '分类不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '长度为2-10个字符', trigger: 'blur' },
  ],
})

export default rules
