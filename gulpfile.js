const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');

gulp.task('test', ['pre-test'], () => {
    gulp.src('tests/**/*.spec.js')
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
})

gulp.task('pre-test', function () {
    return gulp.src(['lib/*.js'])
        // Covering files
        .pipe(istanbul({}))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('default', ['test'], () => {

})