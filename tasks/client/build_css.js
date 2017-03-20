import gulp from "gulp";
import cssmin from "gulp-clean-css";
import {join} from "path";
import {base, tasks} from "./const";

import less from "gulp-less";



const CSS = base.DIST + "**/*.css";

const LESS = [
  base.DEV + "**/*.less",
  "!" + base.DEV + "bower_components/**/*.less",
  "!node_modules/**/*.less",
];




gulp.task(tasks.CLIENT_COMPILE_TO_CSS, () => {
  
  return gulp.src(LESS)
             .pipe(less())
             .on("error", (err) => {
                console.log(err);
             })
             .pipe(gulp.dest(base.DEV));
  
  
});


gulp.task(tasks.CLIENT_BUILD_CSS_DIST, () => {
  return gulp.src(CSS, {base: base.DIST})
             .pipe(cssmin())
             .pipe(gulp.dest(base.DIST));
});