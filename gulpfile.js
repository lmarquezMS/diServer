var gulp = require("gulp"),
  ts = require("gulp-typescript"),
  child_process = require("child_process"),
  exec = child_process.exec,
  spawn = child_process.spawn,
  gulpWatch = require("gulp-watch"),
  livereload = require("gulp-livereload"),
  node;

function createServer() {
  return spawn('node', ['./dist/server.js'], {stdio: "inherit", cwd: process.cwd() });
}

gulp.task("server", function(){
  if (node) node.kill();
  node = createServer();
})

gulp.task("compile", function(){
  exec("tsc --project src/");
})

gulp.task("watch", function(){
  gulp.watch("./src/**/*.ts", ["compile-ts", "server"]);

  livereload.listen();
  gulp.watch("deploy/**").on("change", livereload.changed);
});

gulp.task("dev", ["compile-ts", "server", "watch"]);

gulp.task("build", ["compile-ts", "server"]);
