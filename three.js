console.log("three");
const fs = require('fs') //file system module in nodejs
const path = require('path')

const btnCreate = document.getElementById('btnCreate');
const btnRead = document.getElementById('btnRead');
const btnDelete = document.getElementById('btnDelete');
const fileName = document.getElementById('fileName');
const fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');

btnCreate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was created");
    })
})

btnRead.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, function (err, data) {
        if (err) {
            return console.log(err);
        }
        fileContents.value = data
        console.log("The file was read");
    })
})

btnDelete.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function (err) {
        if (err) {
            return console.log(err);
        }
        fileName.value = '';
        fileContents.value = '';
        console.log("The file was deleted");
    })
})