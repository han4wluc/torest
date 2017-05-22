
import chai from'chai';
const should = chai.should();

import Parse from '../src/parse';

describe('Parse.parseFind', function(){
  it('should handle undefined', function(){
    const input = undefined;
    const expected = { };
    Parse.parseFind(input).should.deep.equal(expected);
  });
  it('should handle non object', function(){
    const input = 'hello';
    const expected = { };
    Parse.parseFind(input).should.deep.equal(expected);
  });
  it('should return find', function(){
    const input = {
      something: 'hello',
    };
    const expected = {
      something: 'hello',
    };
    Parse.parseFind(input).should.deep.equal(expected);
  });
});

describe('Parse.parseLimit', function(){
  it('should default to 100', function(){
    const input = undefined;
    const expected = 100;
    Parse.parseLimit(input).should.deep.equal(expected);
  });
  it('should handle non numbers', function(){
    const input = 'asdf';
    const expected = 100;
    Parse.parseLimit(input).should.deep.equal(expected);
  });
  it('should handle 0 to 100', function(){
    const input = 0;
    const expected = 100;
    Parse.parseLimit(input).should.deep.equal(expected);
  });
  it('should handle allow maximum limit of 1000', function(){
    const input = 1002;
    const expected = 1000;
    Parse.parseLimit(input).should.deep.equal(expected);
  });
  it('should handle set limit', function(){
    const input = 200;
    const expected = 200;
    Parse.parseLimit(input).should.deep.equal(expected);
  });
});

describe('Parse.parseSelect', function(){
  it('should default to {}', function(){
    const input = undefined;
    const expected = { };
    Parse.parseSelect(input).should.deep.equal(expected);
  });
});

describe('Parse.parseSort', function(){
  it('should default to {}', function(){
    const input = undefined;
    const expected = {};
    Parse.parseSort(input).should.deep.equal(expected);
  });
});

describe('Parse.parseQuery', function(){
  it('should parse query', function(){
    const input = undefined;
    const expected = {
      find: { },
      limit: 100,
      select: { },
      sort: { },
    };
    Parse.parseQuery(input).should.deep.equal(expected);
  });
});
