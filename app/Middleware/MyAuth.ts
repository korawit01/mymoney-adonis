import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MyAuth {
  public async handle({session, response, view}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = session.get('user')
    if(user){
      view.share({
        currentUser: user.username
      })

      await next()
    }
    else {
      response.redirect().toRoute('login')
    }
    
  }
}
