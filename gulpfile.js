var gulp = require('gulp'),
　　//代替 minifycss
　　cleanCSS = require('gulp-clean-css'),
　　//minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var imagemin = require('gulp-imagemin');

    // 监视文件改动并重新载入
    gulp.task('serve', function() {
      browserSync({
        server: {
          //指定根目录
          baseDir: './',
          //指定index路径
          //index:'dist/pages/watcher.html'
        }
      });
      //{cwd: 'src'}：输出目录
      gulp.watch(['pages/*.html', 'static/**/*.css', 'static/**/*.js'], {cwd: 'src'}, reload);
    });

    gulp.task('html',function(){
        return gulp.src('src/pages/**/*.html')
            .pipe(gulp.dest('dist/pages'));
    })

    gulp.task('font',function(){
        return gulp.src('src/static/font/*')
            .pipe(gulp.dest('dist/static/font'))
    })

    gulp.task('imagemin',function(){
        return gulp.src('src/static/img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/static/img'));
    });

    //语法检查
    gulp.task('jshint', function () {
        return gulp.src('src/static/js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    //压缩css
    gulp.task('minifycss', function() {
        return gulp.src('src/static/css/*.css')    //需要操作的文件
            //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(cleanCSS({compatibility: 'ie7'}))   //执行压缩
            .pipe(gulp.dest('dist/static/css'));   //输出文件夹
    });

    //压缩,合并 js
    gulp.task('minifyjs', function() {
        return gulp.src('src/static/js/**/*.js')      //需要操作的文件
            //.pipe(concat('main.js'))    //合并所有js到main.js
            //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
            .pipe(uglify({mangle: false}))    //压缩  mangle: false-不混淆变量
            .pipe(gulp.dest('dist/static/js'));  //输出
    });

　　//默认命令，在cmd中输入gulp后，执行的就是这个任务(压缩js需要在检查js之后操作)
    gulp.task('default',['jshint'],function() {
        gulp.start('html','font','imagemin','minifycss','minifyjs'); 
　　});