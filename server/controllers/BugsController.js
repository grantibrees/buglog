import express from 'express'
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/notesService'



//PUBLIC
export class BugsController extends BaseController {
  constructor() {
    super("api/bugs")
    console.log("registering BugsController");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNote)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getNote(req, res, next) {
    try {
      let data = await notesService.getAll(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await bugsService.delete(req.params.id, req.userInfo.email)
      res.send("success deletion")
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      let data = await bugsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {

      let data = await bugsService.find()
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}


