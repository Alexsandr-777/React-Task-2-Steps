import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const current = steps[activeIndex];

	const next = () => setActiveIndex((i) => i + 1);
	const prev = () => setActiveIndex((i) => i - 1);
	const goTo = (i) => setActiveIndex(i);
	const restart = () => setActiveIndex(0);

	const firstStep = activeIndex === 0;
	const lastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{current?.content}</div>
					<ul className={styles['steps-list']}>
						{steps.map((el, i) => {
							const isActiv = i === activeIndex;
							const isDone = i < activeIndex;
							return (
								<li
									key={el.id}
									className={[
										styles['steps-item'],
										isActiv ? styles.active : '',
										isDone ? styles.done : '',
									]
										.filter(Boolean)
										.join(' ')
										.trim()}
								>
									<button
										onClick={() => goTo(i)}
										className={styles['steps-item-button']}
									>
										{i + 1}
									</button>
									{el.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							onClick={prev}
							disabled={firstStep}
							className={styles.button}
						>
							Назад
						</button>

						{lastStep ? (
							<button
								onClick={restart}
								className={styles.button}
								style={{
									'--accent-color-hue': '0',
									'--accent-color-saturation': '85%',
								}}
							>
								Начать сначала
							</button>
						) : (
							<button onClick={next} className={styles.button}>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
