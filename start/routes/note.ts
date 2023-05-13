import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  
  
  Route.get('/notes','NotesController.index').as('notes.index')
  Route.get('/notes/:id','NotesController.show').as('notes.show')
  Route.post('/notes/:aid/store','NotesController.store').as('notes.store')
  Route.get('/notes/:id/:aid/edit','NotesController.edit').as('notes.edit')
  Route.post('/notes/:id/:aid/update','NotesController.update').as('notes.update')
  Route.get('/notes/:id/:aid/delete','NotesController.destroy').as('notes.delete')
}).middleware('auth')


