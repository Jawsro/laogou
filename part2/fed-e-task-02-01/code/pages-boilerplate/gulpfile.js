/**
 * 1、创建文件
 * 2、npm init 初始化文件
 * 3、npm i gulp --save-dev 安装gulp模块
 * 4、根目录新建gulpfile.js,gulp的入口文件
 * 5、导入相关插件
 * 6、npm run serve 启动服务器
 * 7、npm run build 打包编译的文件
 */
const { src, dest,parallel,series,watch} = require('gulp');
//减少require的引用
const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();
// const sass = require('gulp-sass');
// const babel =require('gulp-babel');
// const imagemin =require('gulp-imagemin');
const del = require("del");

const browserSync = require('browser-sync');

const bs = browserSync.create();

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clean = () =>{//文件清除
  return del(['dist','temp'])
}

const style = () =>{
  return src('src/assets/styles/*.scss',{base:'src'})//base:基准路径
    .pipe(plugins.sass({ outputStyle:'expanded'}))//outputStyle:'expanded' 样式格式规范 
    .pipe(dest('temp'))//编译后的文件存在temp文件夹
}

const script = () =>{
  return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(plugins.babel( { presets:['@babel/preset-env'] } ) )//presets:['@babel/preset-env'] js转换格式
    .pipe(dest('temp'))//编译后的文件存在temp文件夹
}

const page = () =>{
  return src('src/*.html',{base:'src'})
    .pipe(plugins.swig() )
    .pipe(dest('temp'))//编译后的文件存在temp文件夹
}

const image = () =>{
  return src('src/assets/images/**',{base:'src'})//base:基准路径
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))//编译后的文件存在dist文件夹
}

const font = () =>{
  return src('src/assets/fonts/**',{base:'src'})//base:基准路径
    .pipe(plugins.imagemin())//outputStyle:'expanded' 样式格式规范 
    .pipe(dest('dist'))//编译后的文件存在dist文件夹
}

const extra = () =>{
  return src('public/**',{base:'public'})
   .pipe(dest('dist'))
}

const serve = () =>{//开发服务器
  //源代码修改后，自动更新dist文件下代码
  watch('src/assets/styles/*.scss',style)
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)
  // watch('src/assets/images/**',image)
  // watch(font)
  // watch('public/**',extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ],bs.reload)
  bs.init({
    notify:false,
    port:2080,
    files:'temp/**',//监视temp文件夹下所有文件的变化，浏览器自动更新
    server:{
      baseDir:['temp','src','public'],
      routes:{
        '/node_modules':'node_modules'
      }
    }
  })
}
const useref = () => {
  return src('temp/*.html',{base:'temp'})
    .pipe(plugins.useref({ searchPath:['temp','.']}))
    .pipe(plugins.if(/\.js$/,plugins.uglify()))
    .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/,plugins.htmlmin({ 
      collapseWhitepace:true,
      minifyCSS:true,
      minifyJS:true
    })))
    .pipe(dest('dist'))//最后将文件存在dist文件下
}

const compile = parallel( style,script,page );//src文件下的所有文件的执行

const build =series(
  clean,
  parallel(
    series(compile,useref),
    extra,
    image,
    font
  )
);

const develop = series(compile,serve)
module.exports = {
  clean,
  build,
  develop,
  // compile,
  // useref
} 
