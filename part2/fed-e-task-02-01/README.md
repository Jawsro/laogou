## 简答题

**1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。**

答:工程化就是遵循一定的标准和规范，通过工具提高效率的一种手段。一切以提高效率、降低成本、质量保证为目的的手段都属于「工程化」
  主要解决的问题：
    无法使用模块化或者组件化
    无法保证代码风格统一和代码质量
    重复的机械化工作
    传统语言的或语法的弊端

　

　

**2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？**

答:脚手架不仅可以帮我们生成项目，创建基础的项目结构，还可以给开发者提供一种约束和规范，以便于代码的维护和团队的开发工作。

　

　

## 编程题

**1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具**
答：工作原理就是：在启动的时候，会询问一些预设的问题，然后将回答的结果与模板文件生成项目结构
　

　

**2、尝试使用 Gulp 完成项目的自动化构建**  ( **[先要作的事情](https://gitee.com/lagoufed/fed-e-questions/blob/master/part2/%E4%B8%8B%E8%BD%BD%E5%8C%85%E6%98%AF%E5%87%BA%E9%94%99%E7%9A%84%E8%A7%A3%E5%86%B3%E6%96%B9%E5%BC%8F.md)** )

(html,css,等素材已经放到code/pages-boilerplate目录)

　

　

## 说明：

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 说明文档和代码统一提交至作业仓库。
#gulp-demo
npm init 项目初始化

npm i gulp --save-dev 安装

npm i gulp-sass node-sass 安装gulp-sass依赖

npm i gulp-babel @babel/core @babel/preset-env --save-dev  //js的转换插件

npm i gulp-imagemin --save-dev //image转换插件

npm i del --save-dev //文件清除

npm i gulp-load-plugins --save-dev //自动加载插件，减少require的引入

npm i browser-sync --save-dev 启动一个服务器

npm i gulp-swig --save-dev //编译html文件

npm i gulp-useref --save-dev  //文件引用处理

npm i gulp-htmlmin gulp-uglify gulp-clean-css --save-dev //html js css 文件压缩插件

npm i gulp-if --save-dev //判断文件类型
