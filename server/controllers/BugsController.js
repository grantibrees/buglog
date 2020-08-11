import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/notesService'



//PUBLIC
export class BugsController extends BaseController {
  constructor() {
    super("api/bugs")
    console.log("registering BugsController");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/notes', this.getNotesByBugId)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:bugId/notes/:noteId', this.deleteNoteByBugId)
  }


  async getAll(req, res, next) {
    try {
      //only gets bugs by user who is logged in
      let data = await bugsService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugsService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      await bugsService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }

  async deleteNoteByBugId(req, res, next) {
    try {
      let data = await notesService.deleteNotesByBugId(req.params.bugId, req.params.noteId, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) }
  }
}

