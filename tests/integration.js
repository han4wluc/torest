
import chai from'chai';
const should = chai.should();

import startApp from './express';

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
import Rest from '../src/controller';

mongoose.Promise = require('bluebird');
let app;

var Note;
var Article;

before(function(done) {
  mockgoose.prepareStorage().then(function() {
    mongoose.connect('mongodb://example.com/TestingDB', function(err) {
      // app = require('./express');
      startApp().then((newApp)=>{
        app = newApp;

        var Schema = mongoose.Schema;
        var NoteSchema = new Schema({
          // _id: Schema.Types.ObjectId,
          // _id: Number,
          title: String,
          text: String,
        },
        // { _id: false }
        );
        Note = mongoose.model('Note', NoteSchema);

        var ArticleSchema = new Schema({
          note: {
            type: Schema.Types.ObjectId,
            ref: 'Note',
          },
          note2: {
            type: Schema.Types.ObjectId,
            ref: 'Note',
          }
        });
        Article = mongoose.model('Article', ArticleSchema);


        new Rest({
          model: Note,
          app,
          routeName: '/note',
        });

        new Rest({
          model: Article,
          app,
          routeName: '/article',
        });

        done(err);
      });
    });
  });
});


import axios from 'axios';
const axs = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

beforeEach(async function(){
  await mockgoose.helper.reset();
});


const genData = function(){
  return [{
    _id: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
    title: 'data1',
    text: 'text1'
  }, {
    _id: new mongoose.Types.ObjectId('56cb91bdc3464f14678934cb'),
    title: 'data2',
    text: 'text2'
  }];
};

const genData2 = function(){
  return [{
    _id: new mongoose.Types.ObjectId('58fc1f0313586c77fd73bea4'),
    note: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
    note2: new mongoose.Types.ObjectId('56cb91bdc3464f14678934cb'),
  }];
};


describe('GET /', function(){

  it('should should return with code 200', async function(){

    const expected = [{
      __v: 0,
      _id: '56cb91bdc3464f14678934ca',
      title: 'data1',
      text: 'text1',
    }, {
      __v: 0,
      _id: '56cb91bdc3464f14678934cb',
      title: 'data2',
      text: 'text2'
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.get('/note');
    status.should.equal(200);
    data.should.deep.equal(expected);

  });

  it('should test find', async function(){

    const expected = [{
      __v: 0,
      _id: '56cb91bdc3464f14678934ca',
      title: 'data1',
      text: 'text1',
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.get('/note', {
      params: {
        where: {
          title: 'data1'
        }
      }
    });
    status.should.equal(200);
    data.should.deep.equal(expected);

  });

  it('should test sort', async function(){

    await Note.insertMany(genData());
    const { status, data } = await axs.get('/note', {
      params: {
        sort: {
          title: 1
        }
      }
    });
    status.should.equal(200);

    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      __v: 0,
      title: 'data1',
      text: 'text1'
    }, {
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'data2',
      text: 'text2'
    }];

    data.should.deep.equal(expected);

  });


  it('should test select', async function(){

    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      text: 'text1',
    }, {
      _id: '56cb91bdc3464f14678934cb',
      text: 'text2'
    }];

    const expected2 = [{
      __v: 0,
      _id: '56cb91bdc3464f14678934ca',
      text: 'text1',
    }, {
      __v: 0,
      _id: '56cb91bdc3464f14678934cb',
      text: 'text2'
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.get('/note', {
      params: {
        select: 'text'
      }
    });
    data.should.deep.equal(expected);


    const { status: status2 , data: data2 } = await axs.get('/note', {
      params: {
        select: {
          text: 1,
        }
      }
    });
    data2.should.deep.equal(expected);

    const { status: status3, data: data3 } = await axs.get('/note', {
      params: {
        select: '-title'
      }
    });
    data3.should.deep.equal(expected2);

    const { status: status4, data: data4 } = await axs.get('/note', {
      params: {
        select: {
          title: 0
        }
      }
    });
    data4.should.deep.equal(expected2);

  });

  it('should test limit', async function(){

    await Note.insertMany(genData());
    const { status, data } = await axs.get('/note', {
      params: {
        limit: 1
      }
    });
    status.should.equal(200);

    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      __v: 0,
      title: 'data1',
      text: 'text1'
    }];

    data.should.deep.equal(expected);

  });

  it('should test skip', async function(){

    await Note.insertMany(genData());
    const { status, data } = await axs.get('/note', {
      params: {
        skip: 1
      }
    });
    status.should.equal(200);

    const expected = [{
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'data2',
      text: 'text2'
    }];

    data.should.deep.equal(expected);

  });

  it('should test populate', async function(){

    const expected = [{
      _id: '58fc1f0313586c77fd73bea4',
      __v: 0,
      note: {
        _id: '56cb91bdc3464f14678934ca',
        __v: 0,
        title: 'data1',
        text: 'text1'
      },
      note2: '56cb91bdc3464f14678934cb',
    }];

    await Note.insertMany(genData());
    await Article.insertMany(genData2());

    const { status, data } = await axs.get('/article', {
      params: {
        populate: ['note']
      }
    });

    status.should.equal(200);
    data.should.deep.equal(expected);

  });

  it('should test populate', async function(){

    const expected = [{
      _id: '58fc1f0313586c77fd73bea4',
      __v: 0,
      note: {
        _id: '56cb91bdc3464f14678934ca',
        __v: 0,
        title: 'data1',
        text: 'text1'
      },
      note2: '56cb91bdc3464f14678934cb',
    }];

    await Note.insertMany(genData());
    await Article.insertMany(genData2());

    const { status, data } = await axs.get('/article', {
      params: {
        populate: [{
          path: 'note'
        }]
      }
    });

    status.should.equal(200);
    data.should.deep.equal(expected);

  });

  it('should test populate multi', async function(){

    const expected = [{
      _id: '58fc1f0313586c77fd73bea4',
      __v: 0,
      note: {
        _id: '56cb91bdc3464f14678934ca',
        __v: 0,
        title: 'data1',
        text: 'text1'
      },
      note2: {
        _id: '56cb91bdc3464f14678934cb',
        __v: 0,
        title: 'data2',
        text: 'text2',
      }
    }];

    await Note.insertMany(genData());
    await Article.insertMany(genData2());

    const { status, data } = await axs.get('/article', {
      params: {
        populate: [{
          path: 'note'
        }, {
          path: 'note2'
        }]
      }
    });

    status.should.equal(200);
    data.should.deep.equal(expected);

  });

});


describe('GET /id', function(){

  it('should return with code 200', async function(){

    const expected = {
      __v: 0,
      _id: '56cb91bdc3464f14678934ca',
      title: 'data1',
      text: 'text1',
    };

    await Note.insertMany(genData());

    const { status, data } = await axs.get('/note/56cb91bdc3464f14678934ca');
    status.should.equal(200);
    data.should.deep.equal(expected);

  });

  it('should return with code 404', async function(){
    var status, data;
    try {
      const result = await axs.get('/note/56cb91bdc3464f14678934ca');
      throw new Error('Error');
    } catch (error) {
      error.response.status.should.equal(404);
    }
  });
});

describe('POST /', function(){
  it('should return with code 201', async function(){

    const { status, data } = await axs.post('/note', {
      _id: '56cb91bdc3464f14678934ca',
      title: 'new_title'
    });
    status.should.equal(201);

    const data2 = await Note.find().exec();
    data2.length.should.equal(1);
    const data3 = data2.map(d=>JSON.parse(JSON.stringify(d)));
    data3[0]._id.should.equal('56cb91bdc3464f14678934ca');
    data3[0].title.should.equal('new_title');

  });
});

describe('PUT /', function(){

  it('should return with code 500', async function(){

    try {
      const { status, data } = await axs.put('/note', {
        where: {},
        body: { title: 'hello' },
      });
      throw new Error('Error');
    } catch (error){
      error.response.status.should.equal(500);
    }

  });

  it('should return with code 500', async function(){

    try {
      const { status, data } = await axs.put('/note', {
        where: { title: 'hello' },
        body: {},
      });
      throw new Error('Error');
    } catch (error){
      error.response.status.should.equal(500);
    }

  });

  it('should return with code 200', async function(){

    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      __v: 0,
      title: 'data1',
      text: 'text1'
    }, {
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'data2',
      text: 'text2'
    }, {
      _id: '56cb91bdc3464f14678934cc',
      __v: 0,
      title: 'wallo',
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.put('/note', {
      where: { title: 'nonexisting' },
      body: { _id:'56cb91bdc3464f14678934cc', title: 'wallo' },
    });

    status.should.equal(200);
    data.should.deep.equal(expected[2]);

    const data2 = await Note.find().exec();
    JSON.parse(JSON.stringify(data2)).should.deep.equal(expected);

  });

  it('should return with code 200', async function(){

    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      __v: 0,
      title: 'data1',
      text: 'text1'
    }, {
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'new_title',
      text: 'text2'
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.put('/note', {
      where: { title: 'data2' },
      body: { title: 'new_title' },
    });

    status.should.equal(200);
    data.should.deep.equal(expected[1]);

    const data2 = await Note.find().exec();
    JSON.parse(JSON.stringify(data2)).should.deep.equal(expected);


  });

});

describe('PUT /id', function(){

  it('should return with code 204', async function(){
    const expected = [{
      _id: '56cb91bdc3464f14678934ca',
      __v: 0,
      title: 'new_title',
      text: 'text1'
    }, {
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'data2',
      text: 'text2'
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.put('/note/56cb91bdc3464f14678934ca', {
      title: 'new_title'
    });
    status.should.equal(200);
    const data2 = await Note.find().exec();
    data2.map(d=>JSON.parse(JSON.stringify(d))).should.deep.equal(expected);
  });

  it('should return with code 404', async function(){
    var status, data;
    try {
      const result = await axs.put('/note/56cb91bdc3464f14678934ca');
      throw new Error('Error');
    } catch (error) {
      error.response.status.should.equal(404);
    }
  });

});


describe('DELETE /id', function(){

  it('should return with code 200', async function(){
    const expected = [{
      _id: '56cb91bdc3464f14678934cb',
      __v: 0,
      title: 'data2',
      text: 'text2'
    }];

    await Note.insertMany(genData());

    const { status, data } = await axs.delete('/note/56cb91bdc3464f14678934ca');
    status.should.equal(204);
    const data2 = await Note.find().exec();
    data2.map(d=>JSON.parse(JSON.stringify(d))).should.deep.equal(expected);

  });

  it('should return with code 404', async function(){
    var status, data;
    try {
      const result = await axs.delete('/note/56cb91bdc3464f14678934ca');
      throw new Error('Error');
    } catch (error) {
      error.response.status.should.equal(404);
    }
  });

});
