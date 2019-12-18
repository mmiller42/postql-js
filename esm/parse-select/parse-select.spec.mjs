import { parseSelect } from './parse-select.mjs'
import test from 'ava'

test.beforeEach(t => {
  t.context = {
    config: {}
  }
})

test('parses a simple select query', t => {
  t.deepEqual(parseSelect(t.context.config)('select * from "user"'), [
    {
      type: 'select',
      namespace: null,
      model: 'user',
      filter: null,
      groupBy: null,
      orderBy: null,
      limit: null
    }
  ])
})

test('parses a select query with a where clause', t => {
  t.deepEqual(parseSelect(t.context.config)(`select * from "user" where "id" = 'foo'`), [
    {
      type: 'select',
      namespace: null,
      model: 'user',
      filter: {
        type: 'comparison',
        operator: 'eq',
        left: {
          type: 'field',
          name: 'id'
        },
        right: {
          type: 'string',
          value: 'foo'
        }
      },
      groupBy: null,
      orderBy: null,
      limit: null
    }
  ])
})

test('parses a select query with a compound where clause', t => {
  t.deepEqual(parseSelect(t.context.config)(`select * from "user" where (id = 'foo' and (name = 'bar' or name = 'baz'))`), [
    {
      type: 'select',
      namespace: null,
      model: 'user',
      filter: {
        type: 'binary',
        operator: 'and',
        left: {
          type: 'comparison',
          operator: 'eq',
          left: {
            type: 'field',
            name: 'foo'
          },
          right: {
            type: 'string',
            value: 'foo'
          }
        },
        right: {
          type: 'binary',
          operator: 'or',
          left: {
            type: 'comparison',
            operator: 'eq',
            left: {
              type: 'field',
              name: 'name'
            },
            right: {
              type: 'string',
              value: 'bar'
            }
          },
          right: {
            type: 'comparison',
            operator: 'eq',
            left: {
              type: 'field',
              name: 'name'
            },
            right: {
              type: 'string',
              value: 'baz'
            }
          }
        }
      },
      groupBy: null,
      orderBy: null,
      limit: null
    }
  ])
})
