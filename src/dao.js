
import _ from 'lodash';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import Parse from './parse';

const { isValid } =  mongoose.Types.ObjectId;


const findAll = async function({model, query: originalQuery}){
  // const {
  //   model, query: originalQuery
  // } = params;
  // console.log({originalQuery})

  const query = Parse.parseQuery(originalQuery);
  // console.log({query})
  const { find, limit, select, sort, skip, populate } = query;
  // console.log('select', select);
  try {

    var m = model
        .find(find)
        .limit(limit)
        .select(select)
        .sort(sort)
        .skip(skip);
    for (var i in populate) {
      m = m.populate(populate[i]);
    }

    const rows = await m.exec();

    // const rows =
    //   await model
    //     .find(find)
    //     .limit(limit)
    //     .select(select)
    //     .sort(sort)
    //     .skip(skip)
    //     .exec();
    // return {
    //   query, rows
    // };
    return rows;
  } catch (error){
    throw new Error(error);
    // return {
    //   query, error
    // };
    // return error;
  }
};

const findOne = async function({model, id, query: originalQuery}){
  // const {
  //   model, id, query: originalQuery
  // } = params;

  const query = Parse.parseQuery(originalQuery);
  const { select } = query;

  return model
        .findOne({_id:id})
        .select(select)
        .exec();

  // try {

  //   throw new Error('Error 44')

  //   const row =
  //     await model
  //       .findOne({_id:id})
  //       .select(select)
  //       .exec();
  //   // return {
  //   //   id, select, row
  //   // };
  //   return row;
  // } catch (error){
  //   // return {
  //   //   id, select, error
  //   // };
  //   return error;
  // }
};

const create = async function({model, body}){
  // todo limit parameters
  return model.create(body);
  // try {
  //   const created = await model.create(body);
  //   // return { created };
  //   return created;
  // } catch (error){
  //   return error;
  //   // return {
  //   //   error,
  //   // };
  // }
};

const updateOne = async function({query, body, model}){
  if(Object.keys(query).length === 0 || Object.keys(body).length === 0){
    throw new Error(404);
  }
  return model.findOneAndUpdate(query, {
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
    // deleted: false,
  }, {
    '$set': body,
  }, {
    new: true,
  });

  // try {
  //   // check for deleted
  //   const updated =
  //     await model.findOneAndUpdate({
  //       _id: id,
  //       // deleted: false,
  //     }, {
  //       '$set': body,
  //     }, {
  //       new: true,
  //     });
  //   // return { updated };
  //   return updated;
  // } catch (error){
  //   return error;
  //   // return { error };
  // }
};

const remove = async function({model, id}){
  // const {
  //   model,
  //   id,
  // } = params;

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

  // try {
  //   const updated =
  //     await model.remove({_id: id,}).exec();
  //     // await model.findOneAndUpdate({
  //     //   _id: id,
  //     //   deleted: false,
  //     // }, {
  //     //   '$set': {
  //     //     deleted: true,
  //     //   },
  //     // });
  //   // return { deleted: true };
  //   return {};
  // } catch (error){
  //   return error;
  //   // return { error };
  // }
};

export default {
  findAll,
  findOne,
  create,
  updateOne,
  update,
  remove,
};
