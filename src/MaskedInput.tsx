import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ChangeEvent
} from 'react'
import {
  Input,
  type InputRef
} from 'antd'
import IMask, {
  FactoryArg,
  InputMask
} from 'imask'

// types
import {
  MaskedInputProps,
  OnChangeEvent
} from './types'

// helpers
import { isEmpty } from './helpers'

export function MaskedInput( {
  ref,
  mask,
  maskOptions: propsMaskOptions,
  value: propsValue,
  defaultValue,
  definitions,
  ...props
}: MaskedInputProps ) {
  const initialValue = ( () => {
    if ( !isEmpty( defaultValue ) ) {
      return defaultValue
    }

    return propsValue ?? ''
  } )()
  const [ value, setValue ] = useState( initialValue )
  const lastValue = useRef( initialValue )
  const innerRef = useRef<HTMLInputElement | null>( null )
  const imask = useRef<InputMask<FactoryArg>>( null )
  const maskOptions = useMemo<FactoryArg>( () => (
    Object.assign( {
      mask,
      definitions: {
        '0': /[0-9]/,
        ...definitions
      },
      lazy: false // make placeholder always visible
    }, propsMaskOptions ?? {} )
  ), [ mask ] )

  const onEvent = useCallback( (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const masked = imask.current
    const target = event.target
    if (
      !masked ||
      !target
    ) return

    if ( target.value !== masked.value ) {
      masked.value = target.value
      lastValue.current = masked.value
      event.target.value = masked.value
    }

    Object.assign( event, {
      maskedValue: masked.value,
      unmaskedValue: masked.unmaskedValue
    } )

    masked.updateValue()
    masked.alignCursor()
    setValue( () => lastValue.current )

    props.onChange?.( event as OnChangeEvent )
  }, [] )

  useEffect( () => {
    updateMaskRef()

    return () => {
      imask.current?.destroy()
      imask.current = null
    }
  }, [ mask ] )

  useEffect( () => {
    const masked = imask.current
    if ( !masked ) return

    masked.value = propsValue ?? ''
    lastValue.current = masked.value
    setValue( () => masked.value )
  }, [ propsValue ] )

  function updateMaskRef() {
    const input = innerRef.current

    if ( !imask.current ) {
      if ( !input ) return

      imask.current = IMask( input, maskOptions )
    } else {
      imask.current.updateOptions( maskOptions as any )
    }
  }

  function handleRef(
    currentRef: InputRef | null
  ) {
    if ( !currentRef?.input ) {
      return
    }

    switch ( typeof ref ) {
      case 'function': {
        ref( currentRef )
        break
      }
      default: {
        if ( !ref ) return
        ref.current = currentRef
      }
    }

    innerRef.current = currentRef.input
    updateMaskRef()
  }

  return (
    <Input
      { ...props }
      onChange={ onEvent }
      value={ value }
      ref={ handleRef }
    />
  )
}

export default MaskedInput
export { IMask }
