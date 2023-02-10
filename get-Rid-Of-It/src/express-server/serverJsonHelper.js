const fs = require('fs');

const pathToJson = "../data/data.json"
const readJsonFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToJson, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      jsonData = JSON.parse(data)
      resolve(jsonData);
    });
  });
};

const writeJsonFile = (jsonData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathToJson, JSON.stringify(jsonData), 'utf-8', (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  readJsonFile,
  writeJsonFile,
};
