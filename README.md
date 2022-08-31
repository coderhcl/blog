# blog
## 前端
  前台使用nuxt3
  后台使用vite+ts+vue3+element-plus+axios+echart等
## 后端
  接口使用nestjs构建，控制器，拦截器，权限验证等都有

# 前台界面展示
### 首页
![](https://github.com/coderhcl/pic/blob/main/q1.png)
### 归档
![](https://github.com/coderhcl/pic/blob/main/q2.png)
### 友链
![](https://github.com/coderhcl/pic/blob/main/q3.png)
### 作品
![](https://github.com/coderhcl/pic/blob/main/q4.png)
### 建站日志
![](https://github.com/coderhcl/pic/blob/main/q5.png)

# 后台界面展示
### 控制台
![](https://github.com/coderhcl/pic/blob/main/h1.png)
### 编写文章
![](https://github.com/coderhcl/pic/blob/main/h2.png)
### 发布文章
![](https://github.com/coderhcl/pic/blob/main/h3.png)
### 文章列表
![](https://github.com/coderhcl/pic/blob/main/h4.png)
### 分类列表
![](https://github.com/coderhcl/pic/blob/main/h5.png)
### 标签列表
![](https://github.com/coderhcl/pic/blob/main/h6.png)
### 友链管理
![](https://github.com/coderhcl/pic/blob/main/h7.png)
### 作品管理
![](https://github.com/coderhcl/pic/blob/main/h8.png)
### 建站日志
![](https://github.com/coderhcl/pic/blob/main/h9.png)
### 用户登录
![](https://github.com/coderhcl/pic/blob/main/h10.png)

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
 
