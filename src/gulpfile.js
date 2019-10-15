const gulp = require("gulp");

gulp.task("webpack",()=>{
    const config = require("./webpack.config")
    const webpack = require("webpack-stream");
    gulp.src("./js/**/*.ts")
        .pipe(webpack(config,require("webpack")))
        .pipe(gulp.dest('../www/js'))
})

gulp.task("less",()=>{
    const less = require("gulp-less");
    gulp.src("./less/*.less")
        .pipe(less())
        .pipe(gulp.dest("../www/css"))
})

gulp.task("default",['webpack',"less"]);