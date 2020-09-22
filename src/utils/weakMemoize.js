import cacheChain from './cacheChain'
import weakMemoizeWith from './weakMemoizeWith'

const weakMemoize = weakMemoizeWith(cacheChain)

export default weakMemoize
