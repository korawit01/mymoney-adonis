import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Note extends BaseModel {

  
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public noteName: string

  @column()
  public status: string 

  @column()
  public amount: number 

  @column()
  public detail: string

  @column()
  public acId : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get postedOn(){
    return this.createdAt.toFormat('dd LLL yyyy')
  }
}
