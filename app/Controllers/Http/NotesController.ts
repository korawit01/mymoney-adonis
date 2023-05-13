import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Note from 'App/Models/Note'
import CreateNoteValidator from 'App/Validators/CreateNoteValidator'

export default class NotesController {
  // public async index({session, view}: HttpContextContract) {
  //   const user = session.get('user')

  //       const notes = await Note.query()
  //                               .where('user_id', user.id)                                
  //       const noteGetM = await Note.query().sum('amount','amount')
  //                               .where('user_id', user.id)
  //                               .where('status', "รายรับ")
  //       const noteOutM = await Note.query().sum('amount','amount')
  //                               .where('user_id', user.id)
  //                               .where('status', "รายจ่าย")
                                             

  //       return view.render('note',{notes: notes, noteGetM: noteGetM, noteOutM:noteOutM})
  //   }
  
  // public async create({session, view}: HttpContextContract) {
  //       const user = session.get('user')
  //       const create = 1
  //       const notes = await Note.query()
  //                               .where('user_id', user.id)

  //       return view.render('note',{notes:notes, create:create})
  //   }
  

  public async store({session, request, response, params}: HttpContextContract) {
      const user = session.get('user')
      const payload = await request.validate(CreateNoteValidator)
      const aid = params.aid
      console.log(aid)
        const note = new Note()
        note.status = payload.status
        note.amount = payload.amount
        note.detail = payload.detail
        note.noteName = payload.noteName
        note.userId = user.id
        note.acId = aid
        

        await note.save() 

        response.redirect().toRoute('notes.show',{id:aid})
  }

  public async show({session, params, view}: HttpContextContract) {
    const user = session.get('user')
    const id = params.id
    const account = await Account.find(id)
    const notes = await Note.query()
                                .where('user_id', user.id)
                                .where('ac_id', id)
    const noteGetM = await Note.query().sum('amount','amount')
                                .where('user_id', user.id)
                                .where('ac_id', id)
                                .where('status', "รายรับ")
    const noteOutM = await Note.query().sum('amount','amount')
                                .where('user_id', user.id)
                                .where('ac_id', id)
                                .where('status', "รายจ่าย")
        

    return view.render('note', {account:account, notes: notes, noteGetM: noteGetM, noteOutM:noteOutM})
  }

  public async edit({session, params, view}: HttpContextContract) {
    const user = session.get('user')
        const id = params.id 
        const aid = params.aid
        const account = await Account.find(aid)
        const note = await Note.query()
                                .where('user_id',user.id)
                                .where('id', id)
                                .firstOrFail()
        const notes = await Note.query()
                                .where('user_id', user.id)
                                .where('ac_id', aid)
        const noteGetM = await Note.query().sum('amount','amount')
                                .where('user_id', user.id)
                                .where('ac_id', aid)
                                .where('status', "รายรับ")
        const noteOutM = await Note.query().sum('amount','amount')
                                .where('user_id', user.id)
                                .where('ac_id', aid)
                                .where('status', "รายจ่าย")
      
        return view.render('note', {account:account, note: note, notes:notes, noteGetM: noteGetM, noteOutM:noteOutM})
    }
  

  public async update({session,params,request,response}: HttpContextContract) {
    const user = session.get('user')
        const payload =  await request.validate(CreateNoteValidator)
        const id = params.id 
        const aid = params.aid
        const note = await Note.query()
                                .where('user_id',user.id)
                                .where('id', id)
                                .firstOrFail()

        note!.status = payload.status
        note!.amount = payload.amount
        note!.detail = payload.detail

        await note?.save()

        response.redirect().toRoute('notes.show',{id:aid})
    }
  

  public async destroy({session, params, response}: HttpContextContract) {
    const user = session.get('user')
        const id = params.id
        const aid = params.aid
        const note = await Note.query()
                                .where('user_id',user.id)
                                .where('id', id)
                                .firstOrFail()

        await note?.delete()

        response.redirect().toRoute('notes.show',{id:aid})
  }

}
