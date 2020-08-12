import express from 'express'
import BaseController from "../utils/BaseController"
import auth0Provider from "@bcwdev/auth0provider"
import { notesService } from '../services/NotesService'



export class NotesController extends BaseController {
  constructor() {
    super("api/notes")
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)


  }
  async delete(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await notesService.delete(req.params.id, req.userInfo.email)
      return res.send("balorted!")
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await notesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await notesService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

}