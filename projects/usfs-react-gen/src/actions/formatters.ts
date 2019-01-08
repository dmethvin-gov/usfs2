import { FieldAction, FieldContext, FieldPropertyName } from '../types'

export interface FormatterFunction {
  (value: string, options: any): string
}

export const makeFormatter = function(formatter: FormatterFunction) {
  return <FieldAction>function(context, options, message) {
    const value = context.getProperty(FieldPropertyName.value)
    context.setProperty(FieldPropertyName.value, formatter(value, options))
    return true
  }
}

export const trimSpaces = makeFormatter(value => value.replace(/^\s+/, '').replace(/\s+$/, ''))

export const removeNonDigits = makeFormatter(value => value.replace(/[^\d]+/g, ''))

export const collapseWhitespace = makeFormatter(value => value.replace(/\s+/g, ' '))

interface ReplacePatternOptions {
  pattern: string
  replacement: string
  ignoreCase?: boolean
  once?: boolean
}

export const replacePattern = makeFormatter((value, options: ReplacePatternOptions) => {
  const ignore = options.ignoreCase ? 'i' : ''
  const once = options.once ? '' : 'g'
  const pattern = new RegExp(options.pattern, once + ignore)
  const replacement = options.replacement
  return value.replace(pattern, replacement)
})
