var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
          baseDir: "public"
        }
    });

    gulp.watch("public/sass/*.scss", ['sass']);
    gulp.watch("public/**/*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/stylesheets"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
