/// <binding Clean='clean:fonts, clean:icons, clean:images, clean:robots, clean:scripts, clean:sitemap, clean:styles, clean:webConfig' />
var del = require("del");
var gulp = require("gulp");
var addSrc = require("gulp-add-src");
var concat = require("gulp-concat");
var jshint = require("gulp-jshint");
var merge = require("merge-stream");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var typescript = require("gulp-typescript");
var uglify = require("gulp-uglify");

"use strict";

var paths = {
    root: "./wwwroot/"
};

paths.icons = paths.root;
paths.images = paths.root + "images/";
paths.fonts = paths.root + "fonts/";
paths.scripts = paths.root + "scripts/";
paths.styles = paths.root + "styles/";
paths.robots = paths.root;
paths.sitemap = paths.root;
paths.webConfig = paths.root;

// Images
gulp.task("clean:images", function () {
    return del(paths.images);
});

gulp.task("images", ["clean:images"], function () {
    return gulp.src("./images/**/*")
        .pipe(gulp.dest(paths.images));
});

// Icons
gulp.task("clean:icons", function () {
    return del([
        paths.icons + "*icon*",
        paths.icons + "browserconfig.xml",
        paths.icons + "manifest.json",
    ]);
});

gulp.task("icons", ["clean:icons"], function () {
    return gulp.src("./Icons/*.*")
        .pipe(gulp.dest(paths.icons));
});

// Fonts
gulp.task("clean:fonts", function () {
    return del(paths.fonts);
});

gulp.task("fonts:bootstrap", ["clean:fonts"], function () {
    return gulp.src("./bower_components/bootstrap-sass/assets/fonts/**/*.*")
        .pipe(gulp.dest(paths.fonts));
});

gulp.task("fonts:font-awesome", ["clean:fonts"], function () {
    return gulp.src("./bower_components/fontawesome/fonts/**/*.*")
        .pipe(gulp.dest(paths.fonts));
});

gulp.task("fonts", ["fonts:font-awesome"]);

// Scripts
gulp.task("clean:scripts", function () {
    return del(paths.scripts);
});

gulp.task("scripts:html5shiv-printshiv", ["clean:scripts"], function () {
    return gulp.src("./bower_components/html5shiv/dist/html5shiv-printshiv.js")
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("html5shiv-printshiv.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:jquery", ["clean:scripts"], function () {
    return gulp.src("./bower_components/jquery/dist/jquery.js")
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("jquery.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:bootstrap", ["clean:scripts"], function () {
    return gulp.src("./bower_components/bootstrap-sass/assets/javascripts/bootstrap.js")
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("bootstrap.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:skrollr", ["clean:scripts"], function () {
    return gulp.src("./bower_components/skrollr/dist/skrollr.min.js")
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("skrollr.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:loadCSS", ["clean:scripts"], function () {
    return gulp.src(["./Scripts/loadCSS.js", "./Scripts/onloadCSS.js"])
        .pipe(concat("loadCSS.js"))
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("loadCSS.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:modernizr", ["clean:scripts"], function () {
    return gulp.src("./Scripts/Modernizr.js")
        .pipe(rename("modernizr.js"))
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("modernizr.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:respond", ["clean:scripts"], function () {
    return gulp.src("./bower_components/respond/dest/respond.src.js")
        .pipe(rename("respond.js"))
        .pipe(gulp.dest(paths.scripts))
        .pipe(uglify())
        .pipe(rename("respond.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts:application", ["clean:scripts"], function () {
    var javascripts = gulp.src([
        "./Scripts/**/*.js",
        "!./Scripts/Modernizr.js"
    ]);

    var typescripts = gulp.src("./Scripts/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(typescript({
            sortOutput: true
        }));

    return merge(javascripts, typescripts)
        .pipe(concat("application.js"))
        .pipe(gulp.dest(paths.scripts))
        .pipe(jshint())
        .pipe(uglify())
        .pipe(rename("application.min.js"))
        .pipe(gulp.dest(paths.scripts));
});

gulp.task("scripts", [
    "scripts:html5shiv-printshiv",
    "scripts:jquery",
    "scripts:bootstrap",
    "scripts:skrollr",
    "scripts:loadCSS",
    "scripts:modernizr",
    "scripts:respond",
    "scripts:application"
]);

// Styles
gulp.task("clean:styles", function () {
    return del(paths.styles);
});

gulp.task("styles:font-awesome", ["clean:styles"], function () {
    return gulp.src("./bower_components/font-awesome/css/font-awesome.css")
        .pipe(gulp.dest(paths.styles))
        .pipe(minifyCss())
        .pipe(rename("font-awesome.min.css"))
        .pipe(gulp.dest(paths.styles));
});

gulp.task("styles:application", ["clean:styles"], function () {
    return gulp.src("./Styles/Application.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("application.css"))
        .pipe(gulp.dest(paths.styles))
        .pipe(minifyCss())
        .pipe(rename("application.min.css"))
        .pipe(gulp.dest(paths.styles));
});

gulp.task("styles", [
    "images",
    "styles:font-awesome",
    "styles:application"
]);

// Robots
gulp.task("clean:robots", function () {
    return del(paths.robots + "robots.txt");
});

gulp.task("robots", ["clean:robots"], function () {
    return gulp.src("./Robots.txt")
        .pipe(rename("robots.txt"))
        .pipe(gulp.dest(paths.robots));
});

// Sitemap
gulp.task("clean:sitemap", function () {
    return del(paths.sitemap + "sitemap.xml");
});

gulp.task("sitemap", ["clean:sitemap"], function () {
    return gulp.src("./Sitemap.xml")
        .pipe(rename("sitemap.xml"))
        .pipe(gulp.dest(paths.sitemap));
});

// Web Config
gulp.task("clean:webConfig", function () {
    return del(paths.webConfig + "web.config");
});

gulp.task("webConfig", ["clean:webConfig"], function () {
    return gulp.src("./Web.config")
        .pipe(rename("web.config"))
        .pipe(gulp.dest(paths.webConfig));
});

gulp.task("default", [
    "icons",
    "images",
    "fonts",
    "scripts",
    "styles",
    "robots",
    "sitemap",
    "webConfig"
]);