const forEach = require("lodash").forEach;

exports.parseErrors = function(errors) {
  const results = {};
  forEach(errors, (val, key) => {
    results[key] = val.message;
  });
  return results;
};
