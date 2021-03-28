import path from 'path'

import dox from 'dox'
import fs from 'fs-extra'
import glob from 'glob'
import markdownMagic from 'markdown-magic'
import { append, assoc, filter, find, forEach, isEmpty, map, prop, reduce } from 'ramda'

import pack from '../../package.json'

import { reduceObjIndexed } from './utils'

const GIT_URL = pack.repository.url
const API_README_PATH = path.resolve(__dirname, '..', '..', 'docs', 'API.md')
const SRC_PATH = path.resolve(__dirname, '..', '..', 'src')
const CURRENT_VERSION = pack.version
const GITHUB_TAG_URL = `${GIT_URL}/tree/v${CURRENT_VERSION}`
const REGEX_RETURN_TYPE = /\{.*\}/s
const REGEX_PARAM = /(\{.*\})\s*([a-zA-Z0-9$_]*)/s

const escape = (input) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\*/g, '&ast;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const toHtml = (value) => escape(value).replace(/(\r\n|\r|\n)/g, '<br />\n')

const parseReturnsString = (string) => {
  const result = string.match(REGEX_RETURN_TYPE)
  if (result) {
    const typesDescription = result[0]
    return {
      description: string.slice(result.index + typesDescription.length).trim(),
      typesDescription: typesDescription.slice(1, typesDescription.length - 1).trim()
    }
  }
  return {}
}

const parseParamString = (string) => {
  const result = string.match(REGEX_PARAM)
  if (result) {
    const typesDescription = result[1].slice(1, result[1].length - 1).trim()
    const name = result[2].trim()
    const description = string.slice(result.index + result[0].length).trim()
    return {
      description,
      name,
      typesDescription
    }
  }
  return {}
}

const parseSrcFiles = async (srcFiles) =>
  Promise.all(
    map(async (srcFile) => {
      const fullPath = path.join(SRC_PATH, srcFile)
      const contents = await fs.readFile(fullPath, 'utf8')
      return {
        meta: dox.parseComments(contents),
        srcFile
      }
    }, srcFiles)
  )

const findSrcFiles = () =>
  new Promise((resolve, reject) => {
    const options = {
      cwd: SRC_PATH,
      ignore: [
        '**/*.test.js',
        '**/tests/*',
        '**/index.js',
        'index.js',
        'data/freeGlobal.js',
        'data/nodeTypes.js',
        'data/root.js'
      ]
    }
    glob('**/*.js', options, (error, files) => {
      if (error) {
        return reject(error)
      }
      resolve(files)
    })
  })

const findCategory = (tags) => {
  const categoryTag = find((tag) => tag.type === 'category', tags)
  return prop('string', categoryTag)
}

const findExample = (tags) => {
  const returnTag = find((tag) => tag.type === 'example', tags)
  return returnTag
}

const findParams = (tags) => {
  const paramTags = filter((tag) => tag.type === 'param', tags)
  return paramTags
}

const findReturns = (tags) => {
  const returnsTag = find((tag) => tag.type === 'return' || tag.type === 'returns', tags)
  return returnsTag
}

const findSince = (tags) => {
  const sinceTag = find((tag) => tag.type === 'since', tags)
  return prop('string', sinceTag)
}

const findFunction = (tags) => find((tag) => tag.type === 'function', tags)

const findClass = (tags) => find((tag) => tag.type === 'class', tags)

const findPrivate = (tags) => {
  const privateTag = find((tag) => tag.type === 'private', tags)
  return privateTag
}

const findType = (tags) => {
  const typeTag = find((tag) => tag.type === 'type', tags)
  return typeTag
}

const renderParamsMarkdown = (params) => {
  let markdown = `**Params**\n`
  if (!isEmpty(params)) {
    forEach((param) => {
      markdown += `<p><code>${param.name}</code>: <code>${toHtml(
        param.typesDescription
      )}</code> - ${toHtml(param.description)}</p>\n`
    }, params)
    markdown += `\n`
  } else {
    markdown += `None\n\n`
  }
  return markdown
}

const renderReturnsMarkdown = (returns) => {
  let markdown = `**Returns**\n<br />`
  if (returns != null && returns.typesDescription) {
    markdown += `<p><code>${toHtml(returns.typesDescription)}</code> - ${toHtml(
      returns.description
    )}</p>\n\n`
  } else {
    markdown += '<code>undefined</code>\n\n'
  }
  return markdown
}

const renderExampleMarkdown = (example) => {
  let markdown = ''
  if (example) {
    markdown += `**Example**\n`
    markdown += '```js\n'
    markdown += `${example.string.trim()}\n`
    markdown += '```\n'
  }
  return markdown
}

const renderFunctionMarkdown = ({
  description,
  example,
  line,
  name,
  params,
  private: _private,
  returns,
  since,
  srcFile
}) => {
  let markdown = `### ${_private ? '**private** ' : ''}function ${name}()\n\n`
  // console.log('meta:', JSON.stringify(data, null, 2))
  markdown += `[source](${GITHUB_TAG_URL}/src/${srcFile}#L${line})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since ${since}\n`
  markdown += `${description}\n\n`

  markdown += renderParamsMarkdown(params)
  markdown += renderReturnsMarkdown(returns)
  markdown += renderExampleMarkdown(example)
  markdown += '<br /><br />\n\n'
  return markdown
}

const renderClassMarkdown = ({
  description,
  example,
  line,
  name,
  private: _private,
  since,
  srcFile
}) => {
  let markdown = `### ${_private ? '**private** ' : ''}class ${name}\n\n`
  markdown += `[source](${GITHUB_TAG_URL}/src/${srcFile}#L${line})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since ${since}\n`
  markdown += `${description}\n\n`

  markdown += `**Class**: \`${name}\`\n\n`
  markdown += renderExampleMarkdown(example)
  markdown += '<br /><br />\n\n'
  return markdown
}

const renderValueMarkdown = ({
  description,
  example,
  line,
  name,
  private: _private,
  since,
  srcFile,
  type
}) => {
  let markdown = `### ${_private ? '**private** ' : ''}${name}\n\n`
  markdown += `[source](${GITHUB_TAG_URL}/src/${srcFile}#L${line})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since ${since}\n`
  markdown += `${description}\n\n`

  markdown += `**Type**: \`${type}\`\n\n`
  markdown += renderExampleMarkdown(example)
  markdown += '<br /><br />\n\n'
  return markdown
}

const renderCategoryMarkdown = (category) => {
  let markdown = `## ${category.name}\n\n`
  markdown = reduce(
    (accMarkdown, fn) => {
      return accMarkdown + renderFunctionMarkdown(fn)
    },
    markdown,
    category.functions
  )
  markdown = reduce(
    (accMarkdown, _class) => {
      return accMarkdown + renderClassMarkdown(_class)
    },
    markdown,
    category.classes
  )
  return reduce(
    (accMarkdown, value) => {
      return accMarkdown + renderValueMarkdown(value)
    },
    markdown,
    category.values
  )
}

const generateParams = (tags) => {
  const paramTags = findParams(tags)
  return map((paramTag) => {
    const parsed = parseParamString(paramTag.string)
    return {
      type: 'param',
      ...parsed
    }
  }, paramTags)
}

const generateReturns = (tags) => {
  const returnsTag = findReturns(tags)
  if (returnsTag) {
    const parsed = parseReturnsString(returnsTag.string)
    return {
      type: 'returns',
      ...parsed
    }
  }
  return null
}

const generateFunctionDocs = (meta, srcFile) => {
  const _private = findPrivate(meta.tags)
  const category = findCategory(meta.tags)
  if (!category) {
    throw new Error(`Source file ${srcFile} did not declare a @category tag`)
  }
  const since = findSince(meta.tags)
  if (!since) {
    throw new Error(`Source file ${srcFile} did not declare a @since tag`)
  }
  return {
    category,
    description: meta.description.full,
    example: findExample(meta.tags),
    line: meta.line,
    name: meta.ctx.name,
    params: generateParams(meta.tags),
    private: _private,
    returns: generateReturns(meta.tags),
    since,
    srcFile
  }
}

const generateClassDocs = (meta, srcFile) => {
  // console.log('meta:', meta)
  const category = findCategory(meta.tags)
  if (!category) {
    throw new Error(`Source file ${srcFile} did not declare a @category tag`)
  }
  const since = findSince(meta.tags)
  if (!since) {
    throw new Error(`Source file ${srcFile} did not declare a @since tag`)
  }
  return {
    category,
    class: true,
    description: meta.description.full,
    example: findExample(meta.tags),
    extends: meta.ctx.extends,
    line: meta.line,
    name: meta.ctx.name,
    since,
    srcFile
  }
}

const generateValueDocs = (meta, srcFile) => {
  const category = findCategory(meta.tags)
  if (!category) {
    throw new Error(`Source file ${srcFile} did not declare a @category tag`)
  }
  const since = findSince(meta.tags)
  if (!since) {
    throw new Error(`Source file ${srcFile} did not declare a @since tag`)
  }
  const typeTag = findType(meta.tags)
  return {
    category,
    description: meta.description.full,
    example: findExample(meta.tags),
    line: meta.line,
    name: meta.ctx.name,
    since,
    srcFile,
    type: typeTag.string
  }
}

const getType = (tags) => {
  const functionTag = findFunction(tags)
  if (functionTag) {
    return 'function'
  }
  const classTag = findClass(tags)
  if (classTag) {
    return 'class'
  }
  const typeTag = findType(tags)
  if (typeTag) {
    return typeTag.string
  }
  return undefined
}

const getCategory = (name, categories) => {
  let category = prop(name, categories)
  if (!category) {
    category = {
      classes: [],
      functions: [],
      name,
      values: []
    }
  }
  return category
}

const generateCategoryDocs = (srcData) =>
  reduce(
    (categories, data) => {
      forEach((meta) => {
        if (meta.ctx && !isEmpty(meta.tags)) {
          const type = getType(meta.tags)
          if (!type) {
            throw new Error(
              `Source file ${data.srcFile} did not declare a @function, @class tag or a @type tag`
            )
          }

          if (type === 'function') {
            const fnDocs = generateFunctionDocs(meta, data.srcFile)
            let category = getCategory(fnDocs.category, categories)
            category = assoc('functions', append(fnDocs, category.functions), category)
            categories = assoc(fnDocs.category, category, categories)
          } else if (type === 'class') {
            const classDocs = generateClassDocs(meta, data.srcFile)
            let category = getCategory(classDocs.category, categories)
            category = assoc('classes', append(classDocs, category.classes), category)
            categories = assoc(classDocs.category, category, categories)
          } else {
            const valueDocs = generateValueDocs(meta, data.srcFile)
            let category = getCategory(valueDocs.category, categories)
            category = assoc('values', append(valueDocs, category.values), category)
            categories = assoc(valueDocs.category, category, categories)
          }
        }
      }, data.meta)
      return categories
    },
    {},
    srcData
  )
const generateAPIDocs = (srcData) =>
  new Promise((resolve, reject) => {
    const magicConfig = {
      transforms: {
        METHODS() {
          const categories = generateCategoryDocs(srcData)
          return reduceObjIndexed(
            (markdown, category) => {
              return markdown + renderCategoryMarkdown(category)
            },
            '',
            categories
          )
        }
      }
    }

    markdownMagic([API_README_PATH], magicConfig, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log('Error while generating docs')
        return reject(error)
      }
      // eslint-disable-next-line no-console
      console.log('🎉 Docs updated!')
      resolve()
    })
  })

const exec = async () => {
  const srcFiles = await findSrcFiles()
  const srcData = await parseSrcFiles(srcFiles)
  await generateAPIDocs(srcData)
}

exec().catch((error) => {
  // eslint-disable-next-line no-console
  console.log('error:', error)
  process.exit(1)
})
