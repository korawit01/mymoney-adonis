import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import Note from 'App/Models/Note'

export default class AccountsController {
  public async index({session, view}: HttpContextContract) {
    const user = session.get('user')

    const accounts = await Account.query()
                                .where('user_id', user.id)                              
                                             
    return view.render('account',{accounts: accounts})
  }

  public async create({}: HttpContextContract) {
  }

  public async store({session,response}: HttpContextContract) {
    const user = session.get('user')
    console.log('account')
    const account = new Account()
    account.acName = "New Account"
    account.userId = user.id
    await account.save()
    
    response.redirect().toRoute('home')
  }

  public async show({}: HttpContextContract) {}

  public async edit({session, params, view}: HttpContextContract) {
      const user = session.get('user')
      const id = params.id
      console.log(id)
      const account = await Account.query()
                              .where('user_id', user.id)
                              .where('id', id)
      const accounts = await Account.query()
                              .where('user_id', user.id) 
    return view.render('account',{accountE: account,accounts: accounts})
  }

  public async update({session, params, response, request}: HttpContextContract) {
    const user = session.get('user')
    const id = params.id
    const account = await Account.query()
                              .where('user_id', user.id)
                              .where('id', id)
                              .firstOrFail()
                
    account!.acName = request.input('acName')
    await account?.save()

    const notes = await Note.query()
                            .where('user_id', user.id)
                            .where('ac_id', id)

    for (let index = 0; index < notes.length; index++) {
      notes![index].noteName = request.input('acName')
      await notes[index]?.save()
    }
    
    
    response.redirect().toRoute('home')
  }

  public async destroy({session,params,response}: HttpContextContract) {
      const user = session.get('user')
          const id = params.id
          const account = await Account.query()
                                  .where('user_id',user.id)
                                  .where('id', id)
                                  .firstOrFail()
  
          await account?.delete()
  
          response.redirect().toRoute('home')
  }
}
