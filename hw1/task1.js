import through2 from 'through2';

process.stdin.pipe(through2(function (chunk, enc, callback) {
  this.push(chunk.toString().split("").reverse().join(""));
  callback();
})).pipe(process.stdout);

