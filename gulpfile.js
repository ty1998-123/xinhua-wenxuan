//先导入模块
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
//创建或发布任务
//测试任务
// function fnTest(){
//     console.log('测试成功');
// }
//处理css的任务
function fnSass(){
    return gulp.src('./src/sass/*.scss') //源文件
    .pipe(sass({outputStyle: 'expanded'})) //编译sass
    .pipe(cssnano()) //压缩css
    .pipe(rename({suffix : '.min'})) //重命名
    .pipe(gulp.dest('./dist/css')); //导出成品
}
// function fnCss(){
//     return gulp.src('./src/css/*.css') //源文件
//     .pipe(cssnano()) //压缩css
//     .pipe(rename({suffix : '.min'})) //重命名
//     .pipe(gulp.dest('./dist/css')); //导出成品
// }
//处理js的任务
function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}

//压缩图片
function fnImg(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}
/* //复制首页
function fnCopyIndex(){
    return gulp.src('./src/public.html')
    .pipe(gulp.dest('./dist'));
} */

//创建监听任务
function fnWatch(){
    gulp.watch('./src/sass/*.scss',fnSass);
    // gulp.watch('./src/css/*.css',fnCss);
    // gulp.watch('./src/js/*.js',fnJS);
    // gulp.watch('./src/index.html',fnCopyIndex);
}
//导出模块
// exports.test = fnTest;
// exports.css = fnCss;
// exports.js = fnJS;
// exports.copy = fnCopyIndex;
exports.default = fnWatch;
// exports.img = fnImg;
// exports.sass = fnSass;