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
  definitions,
  enableLogs,
  ...props
}: MaskedInputProps ) {
  const initialValue = useRef( ( () => {
    const {
      value,
      initialValue
    } = props

    if ( !isEmpty( initialValue ) ) {
      return initialValue
    }

    return value ?? ''
  } )() )
  const [ value, setValue ] = useState( initialValue.current )
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
    }, props.maskOptions ?? {} )
  ), [ mask ] )

  const onEvent = useCallback( (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const masked = imask.current
    const target = event.target
    if (
      !masked ||
      !target
    ) {
      log.warn( 'neither masked nor target is defined' )
      return
    }

    masked.value = target.value
    event.target.value = masked.value
    Object.assign( event, {
      maskedValue: masked.value,
      unmaskedValue: masked.unmaskedValue
    } )

    masked.updateValue()
    masked.alignCursor()
    setValue( () => masked.value )

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
    if ( isEmpty( masked, true ) ) {
      log.warn( 'imask ref not set' )
      return
    }

    const { value } = props
    if ( isEmpty( value, true ) ) {
      log.warn( 'value is not controlled' )
      return
    }

    masked.value = value ?? ''
    setValue( () => masked.value )
  }, [ props ] )

  const log = Object.assign(
    ( ...data: any[] ) => {
      if ( !enableLogs ) return
      console.log( ...data )
    }, {
    warn: ( ...data: any[] ) => {
      if ( !enableLogs ) return
      console.warn( ...data )
    }
  } )

  function updateMaskRef() {
    const input = innerRef.current
    const masked = imask.current

    if ( isEmpty( masked ) ) {
      if ( !input ) {
        log.warn( 'neither imask not component refs are defined' )
        return
      }

      log( 'imask ref created' )
      imask.current = IMask( input, maskOptions )
    } else {
      log( 'imask ref updated' )
      masked.updateOptions( maskOptions as any )
    }
  }

  function handleRef(
    currentRef: InputRef | null
  ) {
    if ( !currentRef?.input ) {
      log.warn( 'current input ref not defined', currentRef )
      return
    }

    innerRef.current = currentRef.input
    updateMaskRef()

    if ( isEmpty( ref, true ) ) return
    switch ( typeof ref ) {
      case 'function': {
        ref( currentRef )
        break
      }
      default: {
        ref.current = currentRef
      }
    }
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
