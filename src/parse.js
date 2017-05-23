
import _ from 'lodash';

const parseWhere = function(where){
  // return where || {};

  var where2;
  try {
    where2 = JSON.parse(where);
  } catch (error) {
    where2 = {};
  }

  // console.log('type', typeof where)
  // if(!_.isObject(where)){
  //   return {};
  // }
  return where2;
  // return {
  //   ...where,
  //   deleted: false,
  // };
};

// array
const parsePopulate = function(populate){
  if(_.isArray(populate)){
    return populate.map((p)=>{
      try {
        return JSON.parse(p);
      } catch (error){
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

const parseLimit = function(limit){
  if(limit === undefined){
    return 100;
  }
  if(!_.isNumber(_.parseInt(limit)) || limit === 0){
    return 100;
  }
  return Math.min(1000, limit);
};

const parseSkip = function(skip){
  if(skip === undefined){
    return 0;
  }
  const actualSkip = _.parseInt(skip);
  if(isNaN(actualSkip)){
    return 0;
  }
  return actualSkip;
};

const parseSelect = function(select){
  var select2;
  if(!select){ return {}; }
  try {
    select2 = JSON.parse(select);
  } catch (error) {
    // select2;
    select2 = select;
  }
  return select2;
  // return select || {};
  // if(!_.isObject(select)){
    // return {};
  //   return { password: 0 };
  // }
  // return select;
  //   ...select,
  //   password: 0,
  // };
};

const parseSort = function(sort){
  var sort2;
  try {
    sort2 = JSON.parse(sort);
  } catch (error) {
    sort2 = {};
  }
  return sort2;
  // return sort || {};
  // if(!_.isObject(sort)){
  //   return {};
  // }
  // return sort;
  // return {
  //   ...sort,
  // };
};

const parseQuery = function(query = {}){
  const where    = parseWhere(query.where);
  const limit    = parseLimit(query.limit);
  const select   = parseSelect(query.select);
  const sort     = parseSort(query.sort);
  const skip     = parseSkip(query.skip);
  const populate = parsePopulate(query.populate);
  return {
    where, limit, select, sort, skip, populate
  };
};

export default {
  parseWhere,
  parseLimit,
  parseSelect,
  parseSort,
  parsePopulate,
  parseQuery,
};
