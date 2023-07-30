import styles from './Calculator.module.css'
import { useState } from 'react'
import { AiOutlineMenu, AiOutlineHistory, AiOutlineMinus } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { TbSquareRoot2, TbOmega, TbMathFunction, TbEqualNot, TbEqual } from 'react-icons/tb'
import { RiDivideFill, RiAddFill } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'

const Calculator = () => {
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState(0)

    const handleClear = () => {
        setExpression('')
        setResult(0)
    }

    const handleClearExpression = () => {
        setExpression(result.toString())
    }

    const handleAdd = (v: string) => {
        if (!isNaN(+v)) setResult(+v)

        setExpression(expression + v)
    }

    const handleEquals = () => {
        setResult(eval(expression))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <AiOutlineMenu className={styles.headerLeftIcon} />
                    <span className={styles.headerLeftLabel}>Padrão</span>
                </div>

                <div className={styles.headerRight}>
                    <AiOutlineHistory className={styles.headerRightIcon} />
                </div>
            </div>

            <div className={styles.display}>
                <span>{result}</span>
            </div>

            <div className={styles.resources}>
                <div className={styles.resourceLine}>
                    <div className={styles.operation} onClick={() => handleAdd('%')}>%</div>
                    <div className={styles.operation} onClick={handleClearExpression}>CE</div>
                    <div className={styles.operation} onClick={handleClear}>C</div>
                    <div className={styles.operation}>
                        <FiDelete className={styles.operationIcon} />
                    </div>
                </div>
                <div className={styles.resourceLine}>
                    <div className={styles.operation}>
                        <TbSquareRoot2 className={styles.operationIcon} />
                    </div>
                    <div className={styles.operation}>
                        <TbOmega className={styles.operationIcon} />
                    </div>
                    <div className={styles.operation}>
                        <TbMathFunction className={styles.operationIcon} />
                    </div>
                    <div className={styles.operation} onClick={() => handleAdd('/')}>
                        <RiDivideFill fontSize={24} />
                    </div>
                </div>
                <div className={styles.resourceLine}>
                    <div className={styles.digit} onClick={() => handleAdd('7')}>7</div>
                    <div className={styles.digit} onClick={() => handleAdd('8')}>8</div>
                    <div className={styles.digit} onClick={() => handleAdd('9')}>9</div>
                    <div className={styles.operation} onClick={() => handleAdd('*')}>
                        <CgClose className={styles.operationIcon} />
                    </div>
                </div>
                <div className={styles.resourceLine}>
                    <div className={styles.digit} onClick={() => handleAdd('4')}>4</div>
                    <div className={styles.digit} onClick={() => handleAdd('5')}>5</div>
                    <div className={styles.digit} onClick={() => handleAdd('6')}>6</div>
                    <div className={styles.operation} onClick={() => handleAdd('-')}>
                        <AiOutlineMinus className={styles.operationIcon} />
                    </div>
                </div>
                <div className={styles.resourceLine}>
                    <div className={styles.digit} onClick={() => handleAdd('1')}>1</div>
                    <div className={styles.digit} onClick={() => handleAdd('2')}>2</div>
                    <div className={styles.digit} onClick={() => handleAdd('3')}>3</div>
                    <div className={styles.operation} onClick={() => handleAdd('+')}>
                        <RiAddFill className={styles.operationIcon} />
                    </div>
                </div>
                <div className={styles.resourceLine}>
                    <div className={styles.digit}>
                        <TbEqualNot className={styles.operationIcon} />
                    </div>
                    <div className={styles.digit} onClick={() => handleAdd('0')}>0</div>
                    <div className={styles.digit} onClick={() => handleAdd('.')}>,</div>
                    <div
                        className={`${styles.operation} ${styles.operationEqual}`}
                        onClick={handleEquals}
                    >
                        <TbEqual className={styles.operationIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;