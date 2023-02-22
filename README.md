### 1.项目介绍
#### 本项目是采用的后台管理模板：https://github.com/PanJiaChen/vue-admin-template.git
#### 该系统是作为后台管理系统，负责货物、人员等的管理，用户的权限分配，数据可视化的实现。
### 2.技术选型
<img width="518" alt="655DCCE6723E3B0F97F1F842D3E7C839" src="https://user-images.githubusercontent.com/119716216/220264252-83ef5d93-05b4-4997-8235-6ae1a6cd831a.png">

### 3.项目结构
#### 3.1项目模块
##### 3.1.1登录模块
##### 3.1.2首页
##### 3.1.3权限管理模块
##### 3.1.4商品管理模块
#### 3.2 项目文件
build</br>
     ----index.js webpack配置文件【很少修改这个文件】</br>
mock</br>
    ----mock数据的文件夹【模拟一些假的数据mockjs实现的】，因为咱们实际开发的时候，利用的是真是接口</br>

node_modules</br>
     ------项目依赖的模块</br>

public</br>
     ------ico图标,静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面</br>

src</br>
    -----程序员源代码的地方</br>
    ------api文件夹:涉及请求相关的</br>
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译</br>
    ------components文件夹：一般放置非路由组件获取全局组件</br>
    ------icons这个文件夹的里面放置了一些svg矢量图</br>
    ------layout文件夹：他里面放置一些组件与混入</br>
    ------router文件夹：与路由相关的</br>
    -----store文件夹：一定是与vuex相关的</br>
    -----style文件夹：与样式相关的</br>
    ------utils文件夹：request.js是axios二次封装文件****</br>
    ------views文件夹：里面放置的是路由组件</br>

App.vue:根组件</br>
main.js：入口文件</br>
permission.js:与导航守卫相关</br>
settings：项目配置项文件</br>
.env.development
.env.producation
### 4.后台路由
<img width="802" alt="A6A3009EF1FB97CB4E96B0E5EA098F93" src="https://user-images.githubusercontent.com/119716216/220268282-7bfe3c38-9cb6-4872-9565-2939190f1c5c.png">

git clone https://github.com/bailicangdu/vue2-manage  

cd app  

npm install 或 yarn(推荐)

npm run dev (访问线上后台系统)


访问: http://localhost:8002
