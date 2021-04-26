#!/usr/bin/env node
//脚手架的工作过程:
// 1.通过命令行交互询问用户问题
// 2.根据用户回答的结果生成文件
const inquirer = require('inquirer');
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
inquirer.prompt([
   {
      type: 'input',
      name: 'name',
      message: 'Project name?'
    }
])
.then( anwsers =>{
  // 根据用户回答的结果生成文件

  //模板目录
  const tmplDir = path.join(__dirname,'template');
  //目标目录
  const destDir = process.cwd();
  //将模板下的文件全部转换到目标目录
  fs.readdir(tmplDir,(err,files)=>{
    if (err) throw err
    files.forEach(file => {
      //通过模板引擎渲染文件
      ejs.renderFile(path.join(tmplDir,file),anwsers,(err,result) => {
        if(err) throw err
        fs.writeFileSync(path.join(destDir,file),result)
      })

    });
  })
})