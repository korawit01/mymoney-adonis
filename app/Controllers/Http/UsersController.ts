import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class UsersController {
    public async login({ auth, request, session, response}: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')

        try{
            await auth.attempt(username, password)
            response.redirect().toRoute('home')
        }
        catch(error){
            session.flash('error','The username or password was invalid!')
            response.redirect().toRoute('login')
        }
        
    }
    public async verifyUsername({request, response,}){
        const username = request.input('username')
        const user = await User.findBy('username', username)

        if(user){
        console.log('The username is already used!')
        return response.status(203).send('The username is already used!')
        }
    }

    public async register({request, response, session}){

        const payload = await request.validate(RegisterUserValidator)

        const user = await User.create({username: payload.username, password: payload.password})

        session.flash('message','The user is registered successfully. Please use username and password to login!')

        response.redirect().toRoute('login')
    }

    public async logout({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        response.redirect().toRoute('login')
    } 

    public async login2({request, session, response}: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')

        try{
            const user = await User.findByOrFail('username',username)

            if(user){
                if(await Hash.verify(user.password, password)){
                    session.put('user',{id: user.id, username: username})
                    response.redirect().toRoute('home')
                }else {
                    throw 'The user is not authorized!'
                }
            }
        }catch(error){
            session.flash('error','The user is not authorized')
            response.redirect().toRoute('login')
        }
    }

    public async logout2({session, response}){
        session.clear() 
        response.redirect().toRoute('login')
    }
      
}
