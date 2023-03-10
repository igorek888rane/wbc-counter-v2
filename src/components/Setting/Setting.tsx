import { ChangeEvent, FC, useState } from 'react'
import styles from './Setting.module.scss'
import MyInput from '../UI/MyInput/MyInput'
import { useAppDispatch, useAppSelector } from '../../hook/useApp'
import {
	setCellsMode,
	setDefault,
	setMaxCount,
	setMode,
	setWbc,
} from '../../store/slice/cellsSlice'
import MyButton from '../UI/MyButton/MyButton'
import MyToggle from '../UI/MyToggle/MyToggle'
import { ITypesOfCells, typesOfCells } from '../../data/data'

const Setting: FC = () => {
	const { wbc, maxCount, mode, cellsMode } = useAppSelector(
		state => state.cells
	)
	const dispatch = useAppDispatch()
	const { language } = useAppSelector(state => state.lang)
	const [hidden, setHidden] = useState(false)
	return (
		<div className={`${styles.setting_block} ${hidden ? styles.hidden : ''}`}>
			<div className={styles.close} onClick={() => setHidden(!hidden)}>
				↑
			</div>
			<div className={styles.item}>
				<MyInput
					type={'text'}
					value={wbc}
					label={'WBC 10⁹/L'}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						!isNaN(+e.target.value) && dispatch(setWbc(e.target.value))
					}
				/>
				<MyInput
					type={'tel'}
					value={maxCount}
					label={language.maxCount}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						dispatch(setMaxCount(+e.target.value))
					}
				/>

				<MyButton fn={() => dispatch(setDefault())}>{language.reset}</MyButton>
			</div>
			<div className={styles.item}>
				<MyToggle
					fn={(mode: string) => dispatch(setMode(mode))}
					toggleActive={mode}
					toggles={[
						{ id: '0', name: '-' },
						{ id: '1', name: '+' },
					]}
				/>
			</div>
			<div className={styles.item}>
				<MyToggle
					fn={(cellsMode: keyof ITypesOfCells) =>
						dispatch(setCellsMode(cellsMode))
					}
					toggleActive={cellsMode}
					toggles={Object.keys(typesOfCells).map(el => ({
						id: el,
					}))}
				/>
			</div>
		</div>
	)
}

export default Setting
