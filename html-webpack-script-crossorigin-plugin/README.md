### 说明

在HTML的script标签中加入crossorigin="anonymous"

### 安装

```javascript
   npm install html-webpack-script-crossorigin-plugin 
```

### 使用

```javascript
    //配置srcOrigin来添加crossorigin="anonymous"
    //srcOrigin为false或未定义的时候，则全局都添加crossorigin="anonymous"
    plugins = [
        new HtmlWebpackScriptCrossoriginPlugin({
            srcOrigin: "s4.fx.kgimg.com" //可以是数组，也可以是string
        })
    ]
```

### 注意
如果和**会更改HTML中资源src的插件**混用，请把该插件**放到最后**，因为该插件是通过匹配script标签中的src来添加crossorigin="anonymous"的
