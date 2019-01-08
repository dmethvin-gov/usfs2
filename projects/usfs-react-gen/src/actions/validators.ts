import { FieldAction, FieldContext, FieldPropertyName } from '../types'

export interface ValidatorFunction {
  (value: string, options: any): boolean
}

export const makeValidator = function(criteria: ValidatorFunction, defaultMessage?: string) {
  return <FieldAction>function(context, options, message) {
    const value = context.getProperty(FieldPropertyName.value)
    const valid = criteria(value, options)
    if (!valid) {
      context.addError(options.message || defaultMessage, options)
    }
    return valid
  }
}

/**
 * Add an error if field value is not an integer (negative or positive)
 */
export const isInteger = makeValidator(value => {
  // Support: IE11 (no Math.isInteger)
  const num = Number(value)
  return isFinite(num) && num === Math.floor(num)
}, 'Number must be an integer')

export const isPositiveInteger = makeValidator(value => {
  const num = Number(value)
  return isFinite(num) && num === Math.floor(num) && num > 0
}, 'Number must be an integer greater than zero')

export const isNumberInRange = makeValidator((value, options) => {
  const num = Number(value)
  return isFinite(num) && num >= options.min && num <= options.max
}, 'Number must be between ${options.min} and ${options.max} inclusive')

export const isMaxLength = makeValidator(
  (value, options) => value.length <= options,
  'Number must be less than ${options}'
)

export const isLengthInRange = makeValidator(
  (value, options) => value.length >= options.min && value.length <= options.max,
  'Length must be between ${options.min} and ${options.max} characters'
)
