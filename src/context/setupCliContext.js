import pino from 'pino'

const setupCliContext = () => {
  return {
    logger: pino({ prettyPrint: { colorize: true } })
  }
}

export default setupCliContext
