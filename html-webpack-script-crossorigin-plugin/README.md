### 说明

fis插件：编写HTML打包时增加script crossorigin跨域的属性

### 安装

```javascript
   npm install fis-postpackager-crossorigin -g
```

### 使用

```javascript
       
    //fis3配置
    fis.match('::package', {
    postpackager:[
        fis.plugin('crossorigin',{
            srcOrigin: "http://www.xxx.com" //可以是string，也可以是array
        })
	]

