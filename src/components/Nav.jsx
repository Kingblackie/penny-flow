import { Form, NavLink } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/solid'
import logomark from '../assets/logomark.svg'

const Nav = ({ username }) => {
	const handleSubmit = (e) => {
		if (!confirm('Delete user and all data?')) {
			e.preventDefault()
		}
	}

	return (
		<nav>
			<NavLink to='/' aria-label='Go to home'>
				<img src={logomark} alt="" height={30} />
				<span>PennyFlow</span>
			</NavLink>
			{username && (
				<Form method='post' action='logout' onSubmit={handleSubmit}>
					<button type='submit' className='btn btn--warning'>
						<span>Delete User</span>
						<TrashIcon width={20} />
					</button>
				</Form>
			)}
		</nav>
	)
}

export default Nav	