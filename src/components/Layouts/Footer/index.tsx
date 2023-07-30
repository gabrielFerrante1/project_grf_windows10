import { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import { BsWifi, BsWifiOff, BsVolumeUp } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../libs/redux/store'
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { setOpenApp, setToggleMinimizeApp } from '../../../libs/redux/reducers/soReducer'

type WeatherType = {
    temperature: number,
    weathercode: number
}

const App =  () => {
    const so = useSelector((state: RootState) => state.so)

    const dispatch = useDispatch()
    const date = new Date()

    const [time, setTime] = useState(`${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`)
    const [clientIsOnline, setClientIsOnline] = useState(true)
    const [weather, setWeather] = useState<WeatherType>()

    const handleGetWeather = async (position: GeolocationPosition) => {
        const getWeather: { data: { current_weather: WeatherType } } = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true&hourly=weathercode`)

        setWeather({ temperature: Math.round(getWeather.data.current_weather.temperature), weathercode: getWeather.data.current_weather.weathercode })
    }

    const handleOpenApp = (id: number) => {
        if (so.minimizedApps.find(id_m => id_m === id)) {
            dispatch(setToggleMinimizeApp(id)) 
        } else {
            dispatch(setOpenApp(id))
        }
    }

    useEffect(() => {
        setInterval(() => {
            const currentDate = new Date()
            setTime(`${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}`)
        }, 1000)

        setInterval(() => {
            if (!navigator.onLine) {
                setClientIsOnline(false)
            } else {
                setClientIsOnline(true)
            }
        }, 6000)

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleGetWeather)
        }
    }, [])

    return (
        <footer className={styles.footer}> 
            <div className={styles.footerOpenApps}>
                {so.installedApps.map((item, key) => (
                    <Tooltip key={key} label={item.name} openDelay={350}>
                        <div className={styles.footerOpenAppsItem} onClick={() => handleOpenApp(item.id)}>
                            <img
                                src={
                                    item.icon_code === 'calculator' ?
                                        '/imgs/calculator.png'
                                        : item.icon_code === 'notepad' ?
                                            '/imgs/notepad.png'
                                            : item.icon_code === 'browser' ?
                                                '/imgs/browser.png'
                                                : ''
                                }
                                alt={item.name}
                                width={item.icon_code === 'notepad' ? '28px' : '31px'} 
                                height={item.icon_code === 'notepad' ? '28px' : '31px'} 
                                style={{marginTop: item.icon_code === 'notepad' ? '2px ' : ''}}
                            />
                            {so.openApps.find((id) => id === item.id) && <div className={styles.footerOpenedApp} />}
                        </div>
                    </Tooltip>
                ))}
            </div>

            <div className={styles.footerInfo}>
                <div className={styles.footerInfoWeather} hidden={!weather ? true : false}>
                    <img
                        src={weather?.weathercode !== 0 ? '/imgs/cloud.png' : '/imgs/sunny.png'}
                        alt={"Clima"}
                        className={styles.footerInfoWeatherIcon}
                    />
                    <span className={styles.footerInfoWeatherLabel}> {weather?.temperature}°C</span>
                </div>

                <div className={styles.footerInfoComputer}>
                    {clientIsOnline ?
                        <BsWifi className={styles.footerInfoComputerNetworkIcon} />
                        :
                        <BsWifiOff className={styles.footerInfoComputerNetworkIcon} />
                    }
                    <BsVolumeUp className={styles.footerInfoComputerVolumeIcon} />
                </div>


                <div className={styles.footerInfoDay}>
                    <div className={styles.footerInfoDayHours}>
                        {time}
                    </div>
                    <div className={styles.footerInfoDayDate}>
                        {String(date.getDate()).padStart(2, '0')}/{String(date.getMonth() + 1).padStart(2, '0')}/{date.getFullYear()}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default App;