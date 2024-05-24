var fs = require('fs');

var data = { name: "John", age: 25 };

var json = JSON.stringify(data);

fs.writeFile('C:/Users/ASUS/Desktop/htmlStuff/personalWebsite/projects/snakeGame/data/data.json', json, (err) => {
    if (err) throw err;

    console.log('Data written to file');
});