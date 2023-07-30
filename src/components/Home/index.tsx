import styles from './Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/redux/store'
import { InstalledApp } from '../../libs/types/App'
import { setOpenApp } from '../../libs/redux/reducers/soReducer'

type PropsInstalledApp = {
    data: InstalledApp,
}

const InstalledAppComponent = (props: PropsInstalledApp) => {
    const dispatch = useDispatch()

    const handleOpenApp = () => {
        dispatch(setOpenApp(props.data.id))
    }

    return (
        <div className={` ${styles.installedApp}`} onDoubleClick={handleOpenApp}>
            <img
                src={
                    props.data.icon_code === 'calculator' ?
                        '/imgs/calculator.png'
                        : props.data.icon_code ==='notepad' ?
                            '/imgs/notepad.png'
                            : props.data.icon_code == 'browser' ?
                                '/imgs/browser.png'
                                : ''
                }
                className={styles.installedAppIcon}
            />
            <span className={styles.installedAppLabel}>{props.data.name}</span>
        </div>
    )
}

export default () => {
    const so = useSelector((state: RootState) => state.so)

    return (
        <div className={styles.container}>

            <div>
                {so.installedApps.map((item, key) => (
                    <InstalledAppComponent
                        data={item}
                        key={key}
                    />
                ))}
            </div>
        </div>
    )
}