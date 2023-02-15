import { FC } from 'react'
import styles from './MyToggle.module.scss'

export type myToggle = {
	id: string
	name: string
}

interface selectorProps {
	fn: (select: any) => void
	selectActive: string
	selectors: myToggle[]
}

const Selector: FC<selectorProps> = ({ fn, selectActive, selectors }) => {
	return (
		<div className={styles.myToggle}>
			{selectors.map(select => (
				<div
					key={select.id}
					onClick={() => fn(select.id)}
					className={`${styles.myToggleEl} ${
						select.id === selectActive ? styles.active : ''
					}`}
				>
					{select.name}
				</div>
			))}
		</div>
	)
}

export default Selector
