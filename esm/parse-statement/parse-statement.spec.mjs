import { createFloraAstParser, createParser } from './index.mjs'
import { parseSelect } from '../parse-select/parse-select.mjs'
import test from 'ava'

test.beforeEach(t => {
  t.context = {
    config: {}
  }
})

test('parses a query', t => {
  const query = 'select * from "user"'
  const parse = createParser(t.context.config)
  const floraParse = createFloraAstParser()

  t.deepEqual(parse(query), parseSelect(t.context.config)(floraParse(query)))
})

test('throws on unsupported query', t => {
  const parse = createParser(t.context.config)

  t.throws(() => parse(`replace into foo (id) values ('bar')`), 'Unsupported operation replace')
})
