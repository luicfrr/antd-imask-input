import React, {
  useRef,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { Input, InputRef } from 'antd'
import IMask, {
  FactoryOpts,
  InputMask
} from 'imask'

// types
import { MaskedInputProps } from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  value,
  defaultValue,
  searchInput,
  onChange,
  ref: forwardRef,
  ...props
}: MaskedInputProps ): ReactNode {
  const imask = useRef<InputMask<FactoryOpts>>( null )
  const innerDefaultValue = useRef( ( () => {
    if ( !isEmpty( defaultValue ) ) {
      return defaultValue
    }

    return value ?? ''
  } )() ).current
  const FinalInput = useRef( searchInput ? Input.Search : Input ).current

  const innerRef = useRef<HTMLInputElement | null | undefined>( null )
  const [
    innerValue,
    setInnerValue
  ] = useState( innerDefaultValue )

  useEffect( () => {
    if ( isEmpty( innerRef.current, true ) ) return

    const mask = maskOptions.mask
    // check if mask is a string regex
    if (
      typeof mask === 'string' &&
      mask[ 0 ] === '/' &&
      mask[ mask.length - 1 ] === '/'
    ) {
      maskOptions.mask = new RegExp( mask.slice( 1, -1 ) )
    }

    imask.current?.destroy()
    imask.current = IMask( innerRef.current, maskOptions )
    imask.current.value = innerValue
    setInnerValue( () => imask.current!.value ?? '' )

    imask.current.on( 'accept', () => {
      const {
        value,
        unmaskedValue
      } = imask.current!

      setInnerValue( () => value )
      onChange?.( {
        maskedValue: value,
        unmaskedValue
      } )
    } )

    return () => imask.current?.destroy()
  }, [ maskOptions ] )

  useEffect( () => {
    const masked = imask.current
    if (
      isEmpty( value, true ) ||
      isEmpty( masked, true ) ||
      masked.value === value
    ) return

    masked.value = value
    setInnerValue( () => masked.value )
  }, [ value ] )

  function handleRef(
    ref: InputRef | null
  ) {
    const input = ref?.input
    innerRef.current = input

    if ( isEmpty( forwardRef ) ) return
    if ( typeof forwardRef === 'function' ) {
      forwardRef( ref )
    } else {
      forwardRef.current = ref
    }
  }

  function handleClear() {
    const masked = imask.current
    if ( isEmpty( masked, true ) ) return

    masked.value = ''
    onChange?.( {
      maskedValue: '',
      unmaskedValue: ''
    } )
  }

  return (
    <FinalInput
      { ...props }
      ref={ handleRef }
      value={ innerValue }
      onChange={ undefined }
      onClear={ handleClear }
    />
  )
}

export default MaskedInput
export { IMask }
