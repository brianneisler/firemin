import pino from 'pino'

/**
 * Sets up the Context object for use by the parser and minimizer
 * @function
 * @since v0.1.0
 * @category context
 * @returns {Context}
 * @example
 * const contxt = setupContext()
 */
const setupContext = () => {
  return {
    logger: pino({ prettyPrint: { colorize: true } })
  }
}

export default setupContext
