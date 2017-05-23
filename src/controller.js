
import express from 'express';
import DAO from './dao';

class Rest {
  constructor(params) {
    const {
      model,
      app,
      routeName,
    } = params;

    this.model = model;

    const router = express.Router();

    router.get('/', this._findAll.bind(this));
    router.get('/:id', this._findOne.bind(this));
    router.post('/', this._create.bind(this));
    router.put('/', this._upsertOne.bind(this));
    router.put('/:id', this._update.bind(this));
    router.delete('/:id', this._remove.bind(this));

    app.use(routeName, router);

  }

  // _handleError(params) {
  //   const { result,res } = params;
  //   // console.log('result', result);
  //   res.status(500).send(result);
  // }

  async _findAll(req, res) {
    // console.log('_findAll 111', req.query)
    const query = req.query;

    try {
      const result = await DAO.findAll({
        model: this.model,
        query: query,
      });
      res.status(200).send(result);
    } catch (error){
      // res.status(500).send({
      //   message: 'server error'
      // });
      console.log({error});
      res.status(500).send(error);
    }



    // const result = await DAO.findAll({
    //   model: this.model,
    //   query: req.query,
    // });

    // console.log('_findAll 222')
    // if(result.error){
    //   return res.status(500).send(result);
    // }
    // console.log({result})
    // res.status(200).send(result);


  }

  // find by id
  async _findOne(req, res) {
    const query = req.query;
    try {
      const result = await DAO.findOne({
        model: this.model,
        id: req.params.id,
        query: query
      });
      // console.log({result})
      if(!result){
        return res.status(404).send();
      }
      // console.log({result})
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }


    // if(result.error){
    //   return this._handleError({result, res});
    // }
    // if(!result.row){
    //   return res.status(404).send();
    // }
    // res.status(200).send(result);
  }

  async _create(req, res) {
    try {
      const result = await DAO.create({
        model: this.model,
        body: req.body,
      });
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send(error);
    }

    // if(result.error){
    //   return this._handleError({result, res});
    // }
    // res.status(201).send(result);
  }

  async _upsertOne(req, res) {
    try {
      const result = await DAO.updateOne({
        model: this.model,
        body: req.body.body,
        where: req.body.where,
      });
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async _update(req, res) {
    try {
      const result = await DAO.update({
        model: this.model,
        id: req.params.id,
        body: req.body,
      });
      res.status(200).send(result);
    } catch (error) {
      // console.log('aaaaaa', error);
      // console.log('aaaaaa', error.message);
      // console.log('aaaaaa', typeof error.message);
      if(error.message === '404'){
        return res.status(404).send(error);
      }
      res.status(500).send(error);
    }
    // if(result.error){
    //   return this._handleError({result, res});
    // }
    // if(!result.updated){
    //   return res.status(204).send();
    // }
    // res.status(200).send();
  }

  async _remove(req, res){
    try {
      const result = await DAO.remove({
        model: this.model,
        id: req.params.id,
      });
      res.status(204).send(result);
    } catch (error) {
      if(error.message === '404'){
        return res.status(404).send(error);
      }
      res.status(500).send(error);
    }

    // if(result.error){
    //   return this._handleError({result, res});
    // }
    // if(!result.deleted){
    //   return res.status(204).send();
    // }
    // res.status(200).send();
  }

}

export default function(params){
  new Rest(params);
}

