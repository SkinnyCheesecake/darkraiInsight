import { src, dest, watch, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import fs from 'fs';
import path from 'path'
import sharp from 'sharp';
import terser from 'gulp-terser';

const sass = gulpSass(dartSass);

export function renderCSS ( callback ) {
    src('src/scss/app.scss', {sourcemaps: true}).pipe(sass({outputStyle: "compact"}).on('error', sass.logError)).pipe(dest('build/css', {sourcemaps: true}));
    callback();
}

export function renderJS ( callback ) {
    src('src/js/script.js').pipe(terser()).pipe(dest('build/js', {sourcemaps: true}));
    callback();
}

export function renderFunction () {
    watch('src/scss/**/*.scss', renderCSS);
    watch('src/js/**/*.js', renderJS);
}

export default series (renderCSS, renderJS, renderFunction);