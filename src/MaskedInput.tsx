import React, {
  useRef,
  useEffect,
  type ReactNode
} from 'react'
import {
  Input,
  InputRef
} from 'antd'
import { useIMask } from 'react-imask'
import IMask, {
  type FactoryOpts
} from 'imask'

// types
import { MaskedInputProps } from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  maskOptions,
  defaultValue,
  searchInput,
  onChange,
  value: forwardValue,
  ref: forwardRef,
  ...props
}: MaskedInputProps ): ReactNode {
  const {
    ref,
    value,
    setValue,
    unmaskedValue,
    setUnmaskedValue
  } = useIMask( handleMaskOptions(), {
    defaultValue,
    onAccept
  } )
  const FinalInput = useRef( searchInput ? Input.Search : Input ).current

  useEffect( () => {
    setValue( forwardValue ?? '' )
  }, [ forwardValue ] )

  function handleMaskOptions(): FactoryOpts {
    const mask = maskOptions.mask
    // check if mask is a string regex
    if (
      typeof mask === 'string' &&
      mask[ 0 ] === '/' &&
      mask[ mask.length - 1 ] === '/'
    ) {
      maskOptions.mask = new RegExp( mask.slice( 1, -1 ) )
    }

    return maskOptions
  }

  function handleClear() {
    setUnmaskedValue( '' )
    setValue( '' )
    onChange?.( {
      maskedValue: '',
      unmaskedValue: '',
      target: ref.current as HTMLInputElement
    } )
  }

  function handleRef(
    inputRef: InputRef | null
  ) {
    const input = inputRef?.input
    ref.current = input ?? null

    if ( isEmpty( forwardRef ) ) return
    if ( typeof forwardRef === 'function' ) {
      forwardRef( inputRef )
    } else {
      forwardRef.current = inputRef
    }
  }

  function onAccept(
    accept: string
  ) {
    onChange?.( {
      maskedValue: accept,
      unmaskedValue,
      target: ref.current as HTMLInputElement
    } )
  }

  return (
    <FinalInput
      { ...props }
      ref={ handleRef }
      value={ value }
      onChange={ undefined }
      onClear={ handleClear }
    />
  )
}

export default MaskedInput
export { IMask }
