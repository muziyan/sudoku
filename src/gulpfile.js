const gulp = require("gulp");

gulp.task("webpack",()=>{
    const config = require("./webpack.config")
    const webpack = require("webpack-stream");
    gulp.src("./js/**/*.js")
        .pipe(webpack(config))
        .pipe(gulp.dest('../www/js'))
})

gulp.task("less",()=>{
    const less = require("gulp-less");
    less.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"))
})

gulp.task("default",['webpack',"less"]);