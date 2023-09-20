const csv = require("csv-parser");
const fs = require("fs");
const json2csv = require("json2csv");
const jwt = require("jsonwebtoken");

module.exports = {
  checkAuth: function checkAuth(req) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if(token && token !== "undefined" && token != null && token !== ""){
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        console.log("token ", token)
        return decodedToken;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  isEmpty: function isEmpty(str) {
    try {
      str = str.trim();
    } catch (e) {
      // console.warn(e);
    }
    return (
      str === null ||
      str === "null" ||
      str === undefined ||
      str === "undefined" ||
      str === "" ||
      str === "" ||
      str === "''" ||
      str === '""' ||
      str.length === 0
    );
  },

  removeEmptyStringElements: function removeEmptyStringElements(obj) {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in obj) {
      if (typeof obj[prop] === "object" && !this.isEmpty(obj[prop])) {
        // dive deeper in
        this.removeEmptyStringElements(obj[prop]);
      } else if (typeof obj[prop] === "object" && this.isEmpty(obj[prop])) {
        // delete elements that are empty strings
        obj[prop] = "";
      }
    }
    return obj;
  },

  isValidJson: (jsonString) => {
    try {
      JSON.parse(JSON.stringify(jsonString));
      return true;
    } catch (e) {
      return false;
    }
  },

  validateString: (req, field, name) => {
    if (
      req[field] &&
      typeof req[field][name] !== "undefined" &&
      req[field][name] != null &&
      req[field][name] !== ""
    ) {
      return true;
    }
    return false;
  },
  validateInt: (req, field, name) => {
    if (
      req[field] &&
      typeof req[field][name] !== "undefined" &&
      req[field][name] != null &&
      req[field][name] !== "" &&
      typeof req[field][name] == "number"
    ) {
      return true;
    }
    return false;
  },

  fileRead: (filePath) =>
    new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    }),

  csvFileRead: (filePath) =>
    new Promise((resolve, reject) => {
      const csvData = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          csvData.push(data);
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve(csvData);
        })
        .on("error", (err) => {
          reject(err);
        });
    }),

  convertJSONToCSV: async (jsonData) => {
    const parser = new json2csv.Parser();
    const csvData = parser.parse(jsonData);
    // console.log(csvData);
    return csvData;
  },
};
