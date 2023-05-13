import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateNoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
            status: schema.string(),
            amount: schema.number(),
            detail: schema.string(),
            noteName: schema.string()
  })

  public messages: CustomMessages = {}
}
