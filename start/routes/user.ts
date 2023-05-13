import Route from '@ioc:Adonis/Core/Route'

Route.on('/login').render('login').as('login')
Route.on('/register').render('register').as('register')
Route.post('/login','UsersController.login2').as('users.login')
Route.post('/users/verify', 'UsersController.verifyUsername').as('users.verifyUsername')
Route.post('/register','UsersController.register').as('users.register')
Route.get('/logout','UsersController.logout2').as('users.logout')



