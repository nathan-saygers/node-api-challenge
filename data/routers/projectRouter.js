const express = require('express');

const router = express.Router();

const projectActions = require('../../data/helpers/projectModel');

router.get('/', (req, res) => {
  projectActions.get()
    .then(projects => {
      console.log(projects)
      res.status(200).json(projects)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "The server encountered an issue completing your request"})
    })
})

router.post('/', (req, res) => {
  const project = req.body;
  projectActions.insert(project)
    .then(proj => {
      console.log('this is proj from inside post.then', proj)
      res.status(201).json(proj)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "The server encountered an issue completing your request"})
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  projectActions.update(id, changes)
    .then(updatedProj => {
      console.log('this is updatedProj from put.then', updatedProj)
      res.status(202).json(updatedProj)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "The server encountered an issue completing your request"})
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  projectActions.remove(id)
    .then(bool => {
      console.log('bool from delete.then', bool)
      res.status(200).json(bool)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({error: "The server encountered an issue completing your request"})
    })
})

module.exports = router;