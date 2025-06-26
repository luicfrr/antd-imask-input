/**
 * Check if item (array, object, string, etc..) have a valid value
 *
 * @param {any} item
 * @param {boolean | undefined} nonNullOnly Will check only if value is null or
 * undefined. If an empty string `""` or an empty object/array `{} | []` is
 * provided it will be considerated as non empty and function will return false.
 * @return {boolean} Is empty?
 */
export function isEmpty(
  item: any,
  nonNullOnly?: boolean
): item is null | undefined {
  // se o item for inválido já retorna que está vazio sim
  if (
    // undefined == null -> true
    // undefined === null -> false
    item == null ||
    item === 'null' ||
    item === 'undefined'
  ) return true
  if ( nonNullOnly ) return false

  switch ( typeof item ) {
    case 'string': {
      const empty = item.trim().length <= 0
      return nonNullOnly ? false : empty
    }

    case 'object': {
      if ( Array.isArray( item ) ) {
        return item.length <= 0
      }
      return Object.keys( item ).length <= 0
    }

    default:
      return false
  }
}
