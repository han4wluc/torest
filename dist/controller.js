'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (params) {
  new Rest(params);
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dao = require('./dao');

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rest = function () {
  function Rest(params) {
    _classCallCheck(this, Rest);

    var model = params.model,
        app = params.app,
        routeName = params.routeName;


    this.model = model;

    var router = _express2.default.Router();

    router.get('/', this._findAll.bind(this));
    router.get('/:id', this._findOne.bind(this));
    router.post('/', this._create.bind(this));
    router.put('/', this._upsertOne.bind(this));
    router.put('/:id', this._update.bind(this));
    router.delete('/:id', this._remove.bind(this));

    app.use(routeName, router);
  }

  _createClass(Rest, [{
    key: '_findAll',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
        var query, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = req.query;
                _context.prev = 1;
                _context.next = 4;
                return _dao2.default.findAll({
                  model: this.model,
                  query: query
                });

              case 4:
                result = _context.sent;

                res.status(200).send(result);
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);

                console.log({ error: _context.t0 });
                res.status(500).send(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function _findAll(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return _findAll;
    }()
  }, {
    key: '_findOne',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
        var query, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = req.query;
                _context2.prev = 1;
                _context2.next = 4;
                return _dao2.default.findOne({
                  model: this.model,
                  id: req.params.id,
                  query: query
                });

              case 4:
                result = _context2.sent;

                if (result) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', res.status(404).send());

              case 7:
                res.status(200).send(result);
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);

                res.status(500).send(_context2.t0);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      function _findOne(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return _findOne;
    }()
  }, {
    key: '_create',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _dao2.default.create({
                  model: this.model,
                  body: req.body
                });

              case 3:
                result = _context3.sent;

                res.status(201).send(result);
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                res.status(500).send(_context3.t0);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function _create(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return _create;
    }()
  }, {
    key: '_upsertOne',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _dao2.default.updateOne({
                  model: this.model,
                  body: req.body.body,
                  where: req.body.where
                });

              case 3:
                result = _context4.sent;

                res.status(200).send(result);
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);

                res.status(500).send(_context4.t0);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function _upsertOne(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return _upsertOne;
    }()
  }, {
    key: '_update',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _dao2.default.update({
                  model: this.model,
                  id: req.params.id,
                  body: req.body
                });

              case 3:
                result = _context5.sent;

                res.status(200).send(result);
                _context5.next = 12;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5['catch'](0);

                if (!(_context5.t0.message === '404')) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt('return', res.status(404).send(_context5.t0));

              case 11:
                res.status(500).send(_context5.t0);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function _update(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: '_remove',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _dao2.default.remove({
                  model: this.model,
                  id: req.params.id
                });

              case 3:
                result = _context6.sent;

                res.status(204).send(result);
                _context6.next = 12;
                break;

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6['catch'](0);

                if (!(_context6.t0.message === '404')) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt('return', res.status(404).send(_context6.t0));

              case 11:
                res.status(500).send(_context6.t0);

              case 12:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 7]]);
      }));

      function _remove(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return _remove;
    }()
  }]);

  return Rest;
}();