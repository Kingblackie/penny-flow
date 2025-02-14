import { Outlet, useLoaderData } from 'react-router-dom'
import wave from '../assets/wave.svg'
import { fetchData } from '../utils/helpers'
import Nav from '../components/Nav'

// Loader
export const mainLoader = async () => {
	const username = fetchData('username')

	return { username }
}

const MainLayout = () => {
	const { username } = useLoaderData()

	return (
		<div className='layout'>
			<Nav username={username} />
			<main>
				<Outlet />
			</main>
			<img src={wave} alt="" />
		</div>
	)
}

export default MainLayout