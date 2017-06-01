'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseWhere = function parseWhere(where) {
  var where2;
  try {
    where2 = JSON.parse(where);
  } catch (error) {
    where2 = {};
  }
  return where2;
};

var parsePopulate = function parsePopulate(populate) {
  if (_lodash2.default.isArray(populate)) {
    return populate.map(function (p) {
      try {
        return JSON.parse(p);
      } catch (error) {
        return p;
      }
    });
  }
  var populate2;
  try {
    populate2 = JSON.parse(populate);
  } catch (error) {
    populate2 = [];
  }
  return populate2;
};

var parseLimit = function parseLimit(limit) {
  if (limit === undefined) {
    return 100;
  }
  if (!_lodash2.default.isNumber(_lodash2.default.parseInt(limit)) || limit === 0) {
    return 100;
  }
  return Math.min(1000, limit);
};

var parseSkip = function parseSkip(skip) {
  if (skip === undefined) {
    return 0;
  }
  var actualSkip = _lodash2.default.parseInt(skip);
  if (isNaN(actualSkip)) {
    return 0;
  }
  return actualSkip;
};

var parseSelect = function parseSelect(select) {
  var select2;
  if (!select) {
    return {};
  }
  try {
    select2 = JSON.parse(select);
  } catch (error) {
    select2 = select;
  }
  return select2;
};

var parseSort = function parseSort(sort) {
  var sort2;
  try {
    sort2 = JSON.parse(sort);
  } catch (error) {
    sort2 = {};
  }
  return sort2;
};

var parseQuery = function parseQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var where = parseWhere(query.where);
  var limit = parseLimit(query.limit);
  var select = parseSelect(query.select);
  var sort = parseSort(query.sort);
  var skip = parseSkip(query.skip);
  var populate = parsePopulate(query.populate);
  return {
    where: where, limit: limit, select: select, sort: sort, skip: skip, populate: populate
  };
};

exports.default = {
  parseWhere: parseWhere,
  parseLimit: parseLimit,
  parseSelect: parseSelect,
  parseSort: parseSort,
  parsePopulate: parsePopulate,
  parseQuery: parseQuery
};