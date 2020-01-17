const express = require('express')

const router = express.Router();

const actionActions = require('../helpers/actionModel')

router.get('/:actionid', (req, res) => {
  const id = req.params.id;
  console.log('req.params from actions.get', req.params)
  actionActions.get(id)
    .then(action => {
      console.log('action from inside get.then')
      res.status(200).json(action)
    })
    .catch(error => {
      console.log(error)
      res.status(500).status({message: 'the server encountered an error completing your request'})
    })
})

router.post('/:projectid', (req, res) => {
  const id = req.params.projectid;
  const body = req.body;
  const bodyWithID = {...body, project_id: id}
  console.log('bodyWithID from action.post', bodyWithID)

  actionActions.insert(bodyWithID)
    .then(newAction => {
      console.log('newAction from inside action.post', newAction)
      res.status(201).json(newAction)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'the server encountered an error completing your request'})
    })
})

router.put('/:actionid', (req, res) => {
  const id = req.params.actionid;
  const changes = req.body;

  actionActions.update(id, changes)
    .then(bool => {
      console.log('bool from action.put', bool)
      res.status(202).json(bool)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'the server encountered an error completing your request'})
    })
})

router.delete('/:actionid', (req, res) => {
  const id = req.params.actionid;
  
  actionActions.remove(id)
    .then(bool => {
      console.log(bool)
      res.status(202).json({message: `the action with id: ${id} was deleted`})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: 'the server encountered an error completing your request'})
    })
})

module.exports = router;