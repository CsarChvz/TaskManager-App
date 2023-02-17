const FormData = require("form-data");
const formData = new FormData();
const config = {
  headers: {
    "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
  },
};

module.exports = {
  data: formData,
  config,
};
