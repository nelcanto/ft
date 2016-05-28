var gulp = require('gulp'),
    connect = require('gulp-connect'),
    traceur =  require('gulp-traceur'),
    sass = require('gulp-ruby-sass');


gulp.task('connect', function(){
    connect.server({
        livereload: true,
        port: 8005
    });
});


gulp.task('reload', function(){
    gulp.src('./dist/**/*.*')
        .pipe(connect.reload());
});

gulp.task('sass', function(){
        sass('./sass/*.scss')
        .pipe(gulp.dest('dist/css'));
});

gulp.task('traceur', function(){
    gulp.src('./scripts/*.js')
    .pipe(traceur())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('fonts', function () {
    gulp.src('./bower_components/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch(['./sass/*.scss'], ['sass']);
    gulp.watch(['./scripts/*.js'], ['traceur']);
    gulp.watch(['./**/*.*'], ['reload']);

});

gulp.task('default', ['connect', 'traceur', 'watch', 'sass', 'fonts']);