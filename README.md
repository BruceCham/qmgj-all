## 我假装你已经正确的安装`node`及`npm`

### 第一步 安装并运行mongodb
```
下载安装成功后，找到其安装的位置，里面有bin文件夹

在bin所在的文件夹位置，新建data文件夹，并在data里面创建qmgj文件夹
(data用来存放所有的数据库，qmgj是这个项目指定的数据库名)

进入到bin里面，在里面打开cmd(shift+右键)

运行命令
mongod --dbpath ..\data\qmgj

此时，数据库启动成功，记住不要关闭cmd窗口
```
### 第二步 下载项目并安装运行后端代码
```
进入到下载的项目里面，安装依赖包
npm install 

安装成功后，运行
npm run start
```

### 第三步 运行前端开发环境
```
项目中，public文件夹里面全是前端资源

进入到public中，安装依赖
npm install

安装成功后，运行
gulp
```

