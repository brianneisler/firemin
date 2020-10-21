import { setupContext } from '../context'
import { tokenize } from '../parser'
import { parseIdentifier } from '../parser/pipes'

import assocNodePath from './assocNodePath'

describe('assocNodePath', () => {
  test('should return child if path is empty', async () => {
    const path = []
    const context = setupContext({
      logger: console
    })
    const node = await parseIdentifier({
      children: [],
      context,
      tokenList: await tokenize(context, { string: 'foo' })
    })
    const child = await parseIdentifier({
      children: [],
      context,
      tokenList: await tokenize(context, { string: 'bar' })
    })

    expect(
      assocNodePath(context, path, child.identifier, node.identifier)
    ).toBe(child.identifier)
  })
})
