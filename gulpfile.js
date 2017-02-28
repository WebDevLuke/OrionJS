//--------------------------------------------------------------------------------------------------------------------------------------
// SET DEPENDENCIES
//--------------------------------------------------------------------------------------------------------------------------------------

// Required for all tasks
const gulp = require('gulp');
// Used to compile JS modules
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const glob = require('glob');
const streamify = require('gulp-streamify');
const rename = require("gulp-rename");


//--------------------------------------------------------------------------------------------------------------------------------------
// PRODUCTION FUNCTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// BUILD
gulp.task('build', function() {
	var files = glob.sync('test/test.global.js');
	files.map(function(file) {
		return browserify({entries: file})
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source(file))
		.pipe(rename("test.global-compiled.js"))
		.pipe(gulp.dest('./test'));
	});
});

// WATCH FUNCTION
gulp.task("watch", function() {
	// JS
	gulp.watch('modules/*.js', ['build']);
	gulp.watch('helpers/*.js', ['build']);
});