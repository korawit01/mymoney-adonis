import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Note from './Note'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public acName: string

  @column()
  public userId: number

  @hasMany(()=>Note)
  public notes: HasMany<typeof Note>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
