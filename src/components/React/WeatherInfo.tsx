import { useStore } from '@nanostores/react'
import { imperialUnit, weather } from '../../store/weatherStore'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'

export const WeatherMain = () => {
    const [temp, setTemp] = useState<number>(0)
    const $weather = useStore(weather)
    const $imperialUnit = useStore(imperialUnit)

    const fahrenheitTemp = useMemo(() => {
        if ($weather) {
            return $imperialUnit ? ($weather?.main?.temp * 9 / 5) + 32 : $weather?.main?.temp;
        }
        return 0; // default temp
    }, [$imperialUnit, $weather]);

    useEffect(() => {
        setTemp(fahrenheitTemp);
    }, [fahrenheitTemp]);

    if ($weather) {
        return (
            <div className="flex flex-col self-end w-[190px]">
                <div className="flex leading-none">
                    <span className='text-[6em]'>
                        {parseInt(temp?.toString())}
                    </span>
                    <span className='text-[4em]'>°{$imperialUnit ? "F" : "C"}</span>
                </div>
                <span className='text-[1.5em]'>
                    {$weather?.name + ", " + $weather?.sys?.country}
                </span>
            </div>
        )
    }
}

export const TimeInfo = () => {
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const TimeLoop = setInterval(() => {
            let newTime = moment().format("LTS")
            setTime(newTime)
            console.log(newTime)
        }, 1000)
        console.log(TimeLoop)

        return () => clearInterval(TimeLoop)
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center text-center">
            <span className='text-[1.5em]'>{moment().format("Do MMMM YYYY")}</span>
            <span className='text-[3em] tracking-wider relative'>{time}</span>
        </div>
    )
}