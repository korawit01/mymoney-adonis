import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  Route.get('/', async ({ response }) => {
    response.redirect().toRoute('home')
  })
  
  Route.get('/accounts','AccountsController.index').as('home')
  // Route.get('/posts/create','PostsController.create').as('posts.create')
  // Route.post('/posts/delete','PostsController.deleteAll').as('posts.deletAll')
//   Route.get('/notes/:id','NotesController.show').as('notes.show')
  Route.get('/accounts/store','AccountsController.store').as('accounts.store')
  Route.get('/accounts/:id/edit','AccountsController.edit').as('accounts.edit')
  Route.post('/accounts/:id/update','AccountsController.update').as('accounts.update')
  Route.get('/accounts/:id/delete','AccountsController.destroy').as('accounts.delete')
}).middleware('auth')