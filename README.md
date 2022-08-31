# blog
## 前端
  前台使用nuxt3
  后台使用vite+ts+vue3+element-plus+axios+echart等
## 后端
  接口使用nestjs构建，控制器，拦截器，权限验证等都有

# 前台界面展示
### 首页
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/08cb930838103b17b63505732fef5136.png)
### 归档
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/15d88dd6bee90b23ad2bb773c1149bd7.png)
### 友链
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/ce9ff15ac0dd77fe72eaaf39a17f46da.png)
### 作品
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/32a7545b8fd70322d8c1a9ce53f8d16e.png)
### 建站日志
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/0b3a304c994544dcfe51c646ec956ca3.png)

# 后台界面展示
### 控制台
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/44f483102b86f98773d091973086c015.png)
### 编写文章
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/4bebbecee0ff28bc31da80cf27a3c44a.png)
### 发布文章
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/9aa58e3f9bfeb3a77d78b4cedc705fd0.png)
### 文章列表
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/057b19c2c0d75fee0f9bec232bd61d79.png)
### 分类列表
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/42e14ffa7ed590171d6bb477045024e3.png)
### 标签列表
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/e53b0011da3e4cb637b3fe03534c694e.png)
### 友链管理
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/652160bd424659a6ed50c9bbfc36e980.png)
### 作品管理
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/d75ee595f4bb2ed0b067c44227a699b1.png)
### 建站日志
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/c669283e61526033fc905805dc1afdb7.png)
### 用户登录
![](http://hclblog.oss-cn-shenzhen.aliyuncs.com/e122a6ceec1783502f70c2a74db3e167.png)

# 如何下载使用
1.先克隆该项目到本地

2. client 文件夹代表前台。

2.1 下载下来使用：npm i 下载所有包，然后使用npm run dev 就可以跑起来。首次跑起来可能为空白页面，则需要使用service文件夹了。
  
3.service 文件夹代表接口。

3.1 首先 npm i 下载所有使用到的包，然后需要把.env中的阿里云oss换成自己的（不会的推荐b站的Cain前端中的nestjs实现阿里云oss图片上传，很简单）。

3.2 以及配置好自己的数据库，也是在.env文件当中，已经标准好了，按自己数据库就行。

3.3 然后控制台输入 nest start -w  即可跑起来
  
4.admin 代表后台，用户必须登录才可以使用。

4.1 先找到service文件夹中的src/auth/conroller文件。把注册上面的Auth()注销掉才可以使用postman注册用户

4.2 用postman注册一个用户访问：localhost:8008/auth/register    Post请求，输入username，和password 就可以注册成功，然后登录后台
 
 #### 大概使用方法就这些，如有不懂的可以联系我2814884095@qq.com，项目开源出来大家学习。谢谢！
 
