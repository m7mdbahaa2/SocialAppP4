import React, { useContext } from 'react'
import AppButton from './../Shared/AppButton/AppButton';
import { CounterContext } from '../Context/CounterContext';

export default function Tests() {
    const { increament, decreament } = useContext(CounterContext)

    return (
        <>
            <div className='flex gap-4 justify-center'>
                <AppButton onClick={increament}>+</AppButton>
                <AppButton onClick={decreament}>-</AppButton>
            </div >
        </>
    )
}
