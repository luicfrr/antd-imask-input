import React, {
  useRef,
  useState,
  useEffect,
  type ReactNode
} from 'react'
import { Input } from 'antd'
import IMask, {
  FactoryOpts,
  InputMask
} from 'imask'

// types
import {
  OnChangeEvent,
  MaskedInputProps
} from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  value,
  defaultValue,
  searchInput,
  onChange,
  ref,
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

  const [
    inputRef,
    setInputRef
  ] = useState<HTMLInputElement | null | undefined>( null )
  const [
    innerValue,
    setInnerValue
  ] = useState( innerDefaultValue )

  useEffect( () => {
    if ( isEmpty( inputRef, true ) ) return

    const mask = maskOptions.mask
    // check if mask is a string regex
    if (
      typeof mask === 'string' &&
      mask[ 0 ] === '/' &&
      mask[ mask.length - 1 ] === '/'
    ) {
      maskOptions.mask = new RegExp( mask.slice( 1, -1 ) )
    }

    imask.current = IMask( inputRef, maskOptions )
    imask.current.on( 'accept', () => {
      const {
        value,
        unmaskedValue
      } = imask.current!

      setInnerValue( () => value )
      onChange?.( {
        maskedValue: value,
        unmaskedValue
      } as OnChangeEvent )
    } )

    return () => imask.current?.destroy()
  }, [
    inputRef,
    maskOptions
  ] )

  useEffect( () => {
    const masked = imask.current
    if (
      isEmpty( value, true ) ||
      isEmpty( masked, true )
    ) return

    masked.value = value
  }, [ value ] )

  function handleClear() {
    const masked = imask.current
    if ( isEmpty( masked, true ) ) return

    masked.value = ''
    onChange?.( {
      maskedValue: '',
      unmaskedValue: ''
    } as OnChangeEvent )
  }

  return (
    <FinalInput
      { ...props }
      ref={ ( currentRef ) => {
        const input = currentRef?.input
        setInputRef( () => input )

        if ( isEmpty( ref ) ) return
        if ( typeof ref === 'function' ) {
          ref( currentRef )
        } else {
          ref.current = currentRef
        }
      } }
      defaultValue={ innerDefaultValue }
      value={ innerValue }
      onClear={ handleClear }
    />
  )
}

export default MaskedInput
export { IMask }
