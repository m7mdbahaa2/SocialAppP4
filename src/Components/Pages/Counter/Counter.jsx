import React, { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import AppButton from '../../Shared/AppButton/AppButton'
import Tests from '../../Tests/Tests'

export default function Counter() {

    const { counter } = useContext(CounterContext)

    return (
        <div className='flex flex-col '>
            <h1 className='pt-8 text-center font-bold text-3xl text-blue-700'>Just a testing page</h1>
            <h2 className="font-bold text-3xl text-center pt-8 mb-8">{counter}</h2>
            <Tests></Tests>
        </div>
    )
}
