import del from 'del'
import gulp from 'gulp'
import replace from 'gulp-replace'
import shell from 'gulp-shell'
import ts from 'gulp-typescript'
import { Gulpclass, MergedTask, SequenceTask, Task } from 'gulpclass'
// import tslint from "gulp-tslint";
// const stylish = require("tslint-stylish");
// const sourcemaps = require("gulp-sourcemaps");
// const mocha = require("gulp-mocha");
// const chai = require("chai");
// const istanbul = require("gulp-istanbul");
// const remapIstanbul = require("remap-istanbul/lib/gulpRemapIstanbul");

@Gulpclass()
export class Gulpfile {
  // -------------------------------------------------------------------------
  // General tasks
  // -------------------------------------------------------------------------

  /**
   * Creates a package that can be published to npm.
   */
  @SequenceTask()
  public build () {
    return [
      'clean',
      'packageCompile',
      'packageMoveCompiledFiles',
      'packageClearCompileDirectory',
      ['packagePreparePackageFile', 'packageReadmeFile']
    ]
  }

  /**
   * Cleans dist folder.
   */
  @Task()
  public clean (cb: del.Options) {
    return del(['dist/**'], cb)
  }

  // -------------------------------------------------------------------------
  // Packaging tasks
  // -------------------------------------------------------------------------

  /**
   * Runs typescript files compilation.
   */
  @Task()
  public compile () {
    return gulp.src('*.ts', { read: false }).pipe(shell(['tsc']))
  }

  /**
   * Removes unnecessary files from final package directory.
   */
  @Task()
  public packageClearCompileDirectory (cb: del.Options) {
    return del(
      ['./dist/package/src/**', './dist/package/tests/**', './dist/package/examples/**'],
      cb
    )
  }

  /**
   * Complies all sources to the package directory.
   */
  @MergedTask()
  public packageCompile () {
    const tsProject = ts.createProject('tsconfig.json')
    const tsResult = tsProject
      .src()
      // .pipe(sourcemaps.init())
      .pipe(tsProject())

    return [
      tsResult.dts.pipe(gulp.dest('./dist/package')),
      tsResult.js
      // .pipe(sourcemaps.write(".", { sourceRoot: "", includeContent: true }))
        .pipe(gulp.dest('./dist/package'))
    ]
  }

  /**
   * Moves all compiled files to the final package directory.
   */
  @Task()
  public packageMoveCompiledFiles () {
    return gulp.src('./dist/package/src/**/*').pipe(gulp.dest('./dist/package'))
  }

  /**
   * Change the "private" state of the packaged package.json file to public.
   */
  @Task()
  public packagePreparePackageFile () {
    return gulp
      .src('./package.json')
      .pipe(replace('"private": true', '"private": false'))
      .pipe(gulp.dest('./dist/package'))
  }

  /**
   * This task will replace all typescript code blocks in the README
   * (since npm does not support typescript syntax highlighting)
   * and copy this README file into the package folder.
   */
  @Task()
  public packageReadmeFile () {
    return gulp
      .src('./README.md')
      .pipe(replace(/```ts([\s\S]*?)```/g, '```js$1```'))
      .pipe(gulp.dest('./dist/package'))
  }
}
