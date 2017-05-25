
import _ from 'lodash';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import Parse from './parse';

const { isValid } =  mongoose.Types.ObjectId;

const findAll = async function({model, query: originalQuery}){
  const query = Parse.parseQuery(originalQuery);
  const { where, limit, select, sort, skip, populate } = query;
  try {

    var m = model
        .find(where)
        .limit(limit)
        .select(select)
        .sort(sort)
        .skip(skip);
    for (var i in populate) {
      m = m.populate(populate[i]);
    }

    const rows = await m.exec();
    return rows;
  } catch (error){
    throw error;
  }
};

const findOne = async function({model, id, query: originalQuery}){
  const query = Parse.parseQuery(originalQuery);
  const { select } = query;

  return model
        .findOne({_id:id})
        .select(select)
        .exec();
};

const create = async function({model, body}){
  return model.create(body);
};

const updateOne = async function({where, body, model}){
  if(Object.keys(where).length === 0 || Object.keys(body).length === 0){
    throw new Error(404);
  }
  return model.findOneAndUpdate(where, {
    '$set': body,
  }, {
    new: true,
    upsert: true,
  });
};

const update = async function({id, body, model}){
  if(!isValid(id)){
    return { };
  }

  const count = await model
        .findOne({_id:id})
        .count();
  if(count === 0){
    throw new Error(404);
  }

  return model.findOneAndUpdate({
    _id: id,
  }, {
    '$set': body,
  }, {
    new: true,
  });
};

const remove = async function({model, id}){

  if(!isValid(id)){
    return { deleted: false };
  }

  const count = await model
        .findOne({_id:id})
        .count();
  if(count === 0){
    throw new Error(404);
  }

  return model.remove({_id: id}).exec();
};

export default {
  findAll,
  findOne,
  create,
  updateOne,
  update,
  remove,
};
