import React from 'react'
import { useNavigate } from "react-router-dom";


function Home() {
	const navigate = useNavigate();

	const startGame = () => {
		navigate('/game')
	}
	return (
		<div className='flex m-5 flex-row justify-evenly items-center'>
			<div>
				<img src="https://t3.ftcdn.net/jpg/05/71/99/86/360_F_571998686_7q0qDN2lvCn5wv90SHEepoffd0Pq8NRY.jpg" />
			</div>
			<div>
				<button className='px-8 p-4 bg-teal-400 rounded-sm' onClick={() => startGame()}> Play </button>
			</div>
		</div>
	)
}

export default Home