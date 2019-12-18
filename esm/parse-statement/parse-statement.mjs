import { cond, propEq } from 'ramda'
import * as FloraSqlParser from 'flora-sql-parser'
import { parseDelete } from '../parse-delete/parse-delete.mjs'
import { parseInsert } from '../parse-insert/parse-insert.mjs'
import { parseSelect } from '../parse-select/parse-select.mjs'
import { parseUpdate } from '../parse-update/parse-update.mjs'

export const createParser = config => {
  const floraParse = createFloraAstParser()

  return statement => {
    const ast = floraParse(statement)
    const typeEq = propEq('type')

    console.log(ast)

    const result = cond([
      [typeEq('delete'), parseDelete(config)],
      [typeEq('insert'), parseInsert(config)],
      [typeEq('select'), parseSelect(config)],
      [typeEq('update'), parseUpdate(config)]
    ])(ast)

    if (result) {
      return result
    } else {
      throw new Error(`Unsupported operation ${ast.type}`)
    }
  }
}

export const createFloraAstParser = () => new FloraSqlParser.Parser().parse
