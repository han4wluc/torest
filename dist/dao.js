'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_mongoose2.default.Promise = require('bluebird');

var isValid = _mongoose2.default.Types.ObjectId.isValid;


var findAll = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var model = _ref2.model,
        originalQuery = _ref2.query;
    var query, where, limit, select, sort, skip, populate, m, i, rows;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = _parse2.default.parseQuery(originalQuery);
            where = query.where, limit = query.limit, select = query.select, sort = query.sort, skip = query.skip, populate = query.populate;
            _context.prev = 2;
            m = model.find(where).limit(limit).select(select).sort(sort).skip(skip);

            for (i in populate) {
              m = m.populate(populate[i]);
            }

            _context.next = 7;
            return m.exec();

          case 7:
            rows = _context.sent;
            return _context.abrupt('return', rows);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](2);
            throw _context.t0;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 11]]);
  }));

  return function findAll(_x) {
    return _ref.apply(this, arguments);
  };
}();

var findOne = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref4) {
    var model = _ref4.model,
        id = _ref4.id,
        originalQuery = _ref4.query;
    var query, select;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _parse2.default.parseQuery(originalQuery);
            select = query.select;
            return _context2.abrupt('return', model.findOne({ _id: id }).select(select).exec());

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function findOne(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var create = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_ref6) {
    var model = _ref6.model,
        body = _ref6.body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', model.create(body));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function create(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var updateOne = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref8) {
    var where = _ref8.where,
        body = _ref8.body,
        model = _ref8.model;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(Object.keys(where).length === 0 || Object.keys(body).length === 0)) {
              _context4.next = 2;
              break;
            }

            throw new Error(404);

          case 2:
            return _context4.abrupt('return', model.findOneAndUpdate(where, {
              '$set': body
            }, {
              new: true,
              upsert: true
            }));

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function updateOne(_x4) {
    return _ref7.apply(this, arguments);
  };
}();

var update = function () {
  var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(_ref10) {
    var id = _ref10.id,
        body = _ref10.body,
        model = _ref10.model;
    var count;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (isValid(id)) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt('return', {});

          case 2:
            _context5.next = 4;
            return model.findOne({ _id: id }).count();

          case 4:
            count = _context5.sent;

            if (!(count === 0)) {
              _context5.next = 7;
              break;
            }

            throw new Error(404);

          case 7:
            return _context5.abrupt('return', model.findOneAndUpdate({
              _id: id
            }, {
              '$set': body
            }, {
              new: true
            }));

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function update(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

var remove = function () {
  var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(_ref12) {
    var model = _ref12.model,
        id = _ref12.id;
    var count;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (isValid(id)) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt('return', { deleted: false });

          case 2:
            _context6.next = 4;
            return model.findOne({ _id: id }).count();

          case 4:
            count = _context6.sent;

            if (!(count === 0)) {
              _context6.next = 7;
              break;
            }

            throw new Error(404);

          case 7:
            return _context6.abrupt('return', model.remove({ _id: id }).exec());

          case 8:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function remove(_x6) {
    return _ref11.apply(this, arguments);
  };
}();

exports.default = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  updateOne: updateOne,
  update: update,
  remove: remove
};