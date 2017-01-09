var fs = require('fs'),
    gulp = require("gulp"),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
var browserSync = require('browser-sync').create();
var serverPath = './static/',//服务器资源路径
    rootPath = './static',//根性
    staticDir = 'static/app/',//静态资源根目录
    lessFiles = [staticDir + 'less/global.less',staticDir + 'less/*.less'],//less文件路径
    hashFiles = staticDir + '**/*.min',//hash处理文件 hashFiles+".js"
    htmlFiles = staticDir + '/view/*.html',
    htmlDir = './static/app/index.html',//页面基础路径
    jsArr = [
        "static/app/config/config.js",
        "static/app/config/config2.js",
        "static/app/controller/**/*.js"
    ],
    local = 'http://localhost:3000/User';

gulp.task('look', function () {
    browserSync.init({
        proxy: local,
        port: 3001,
        notify: false,
        open: local
    });
    gulp.watch(lessFiles, ['less-min']);
    gulp.watch([jsArr], ['js-watch']);
    gulp.watch([htmlFiles],['html-watch']);
});
gulp.task('js-watch',['js-min'],function(done){
    browserSync.reload();
    done();
});
gulp.task('html-watch',function(done){
    browserSync.reload();
    done();
})
gulp.task('less-min',function(){
    var onError = function(err) {
        plugins.notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "less error: <%= error.message %>",
            sound: "Beep"
        })(err);
        this.emit('end');
    };
  return gulp.src( lessFiles )
        .pipe(plugins.plumber({
            errorHandler: onError
        }))
        .pipe(plugins.less({
            relativeUrls: true
        }))
        .pipe(plugins.autoprefixer({
            browsers: ['last 20 versions'],
            cascade: true
        }))
        .pipe(plugins.cleanCss())
        .pipe(plugins.concat("app.min.css"))
        .pipe(gulp.dest( staticDir ))
        .pipe(plugins.notify({
            title: 'Gulp',
            subtitle: 'success',
            message: 'less OK',
            sound: "Pop"
        }))
        .pipe(browserSync.stream());
});

gulp.task("js-min",function(){
   return gulp.src(jsArr)
        .pipe(plugins.uglify({
            mangle: true,
            compress: {
                drop_console: true
            }
        }))
        .pipe(plugins.concat("app.min.js"))
        .pipe(gulp.dest("static/app/"));
});
gulp.task("default",['look','less-min','js-min']);
gulp.task("clean",function(){
    return gulp.src(staticDir + '*.min-*', {read: false})
    .pipe(plugins.clean());
});
gulp.task('min',["clean"],function(){
    gulp.run('less-min','js-min');
});