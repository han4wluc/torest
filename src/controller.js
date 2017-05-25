
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

  async _findAll(req, res) {
    const query = req.query;

    try {
      const result = await DAO.findAll({
        model: this.model,
        query: query,
      });
      res.status(200).send(result);
    } catch (error){
      console.log({error});
      res.status(500).send(error);
    }
  }

  async _findOne(req, res) {
    const query = req.query;
    try {
      const result = await DAO.findOne({
        model: this.model,
        id: req.params.id,
        query: query
      });
      if(!result){
        return res.status(404).send();
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
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
      if(error.message === '404'){
        return res.status(404).send(error);
      }
      res.status(500).send(error);
    }
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
  }

}

export default function(params){
  new Rest(params);
}

