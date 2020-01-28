import fs from 'fs';
import csv from 'csvtojson';
import through2 from 'through2';

const writeToTxtStream = fs.createWriteStream('./data/books.txt');
const readBooksStream = fs.createReadStream('./data/books.csv');

readBooksStream
  .on('error', error => console.log('readBookStream\n', error))
  .pipe(csv())
  .on('error', error => console.log('csv to json\n', error))
  .pipe(through2.obj(function (chunk, enc, callback) {
    const book = JSON.parse(chunk);
    const transformedBook = Object.keys(book).reduce((acc, key) => {
      if (key === 'Amount') return acc;
      return {...acc, [key.toLowerCase()]: book[key]}
    }, {});
    callback(null, JSON.stringify(transformedBook)+'\n');
  }))
  .on('error', error => console.log('through2\n', error))
  .pipe(writeToTxtStream)
  .on('error', error => console.log('writeToTxtStream\n', error));

