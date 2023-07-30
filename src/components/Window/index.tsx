import { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/redux/store'
import styles from './Window.module.css'
import { motion, useAnimationControls } from "framer-motion"
import { setCloseApp, setToggleMinimizeApp } from '../../libs/redux/reducers/soReducer'
import { AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineCropSquare, MdOutlineClose } from 'react-icons/md'
import Calculator from '../Calculator'
import NotePad from '../Notepad'
import Browser from '../Browser'

type Props = {
    id: number;
}

export default ({ id, }: Props) => {
    const so = useSelector((state: RootState) => state.so)
    const [dataWindow, setDataWindow] = useState(so.installedApps.find((item) => item.id === id))

    const windowAnimation = useAnimationControls()

    const containerRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch()

    const handleCloseWindow = () => {
        dispatch(setCloseApp(dataWindow?.id as number))
    }

    const handleToggleMinimizeApp = () => dispatch(setToggleMinimizeApp(dataWindow?.id as number))
    const handleSetFullScreenWindow = () => {
        if (!containerRef.current) return;

        containerRef.current.style.width = '100%'
        containerRef.current.style.height = 'calc(100% - 54px)'
        containerRef.current.style.transform = 'translate(0px, 0px)'
    }

    useEffect(() => {
        setDataWindow(so.installedApps.find((item) => item.id === id))
    }, [id])

    useEffect(() => {
        if (so.minimizedApps.find(id_m => id_m == id)) {
            windowAnimation.start({ opacity: 0, display: 'none' })
        } else {
            windowAnimation.start({ opacity: 1, display: 'block' })
        }
    }, [so.minimizedApps])

    return (
        <motion.div
            style={{ opacity: 0 }}
            animate={windowAnimation}
            transition={{ duration: 0.15 }}
        >
            <Draggable
                handle={`#header`}
            >
                <div
                    className={styles.container}
                    ref={containerRef}
                    style={{
                        minWidth: dataWindow?.options?.minWidth ? dataWindow?.options?.minWidth : '550px',
                        minHeight: dataWindow?.options?.minHeight ? dataWindow?.options?.minHeight : '400px',
                        maxWidth: dataWindow?.options?.maxWidth ? dataWindow?.options?.maxWidth : '100%',
                        maxHeight: dataWindow?.options?.maxHeight ? dataWindow?.options?.maxHeight : 'calc(100% - 54px)',
                    }}
                >
                    <div
                        id={'header'}
                        className={styles.header}
                    >
                        <div className={styles.headerLabel}>{dataWindow?.name}</div>
                        <div className={styles.headerAction}>
                            <div className={styles.headerActionMinus} onClick={handleToggleMinimizeApp}>
                                <AiOutlineMinus className={styles.headerActionIcon} />
                            </div>
                            <div className={styles.headerActionFullscreen} onClick={handleSetFullScreenWindow}>
                                <MdOutlineCropSquare className={styles.headerActionIcon} style={{ fontSize: '16px' }} />
                            </div>
                            <div className={styles.headerActionClose} onClick={handleCloseWindow}>
                                <MdOutlineClose className={styles.headerActionIcon} style={{ fontSize: '18px' }} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.body}>
                        {dataWindow?.id == 1 ?
                            <Browser />
                            : dataWindow?.id == 2 ?
                                <Calculator />
                                : dataWindow?.id == 3 ?
                                    <NotePad />
                                    : ''}

                    </div>
                </div>
            </Draggable>
        </motion.div>
    )
}