import { Form, Link } from 'react-router-dom'
import { BanknotesIcon } from '@heroicons/react/24/outline'
import { calculateSpentByBudget, formatCurrency, formatPercentage } from '../utils/helpers'
import { TrashIcon } from '@heroicons/react/24/solid'

const BudgetItem = ({ budget, showDelete = false }) => {
	const { id, name, amount, color } = budget
	const spent = calculateSpentByBudget(id)

	const handleSubmit = (e) => {
		if(!confirm('Are you sure you want to permanently delete this budget?')) {
			e.preventDefault()
		}
	}

	return (
		<div className='budget' style={{ '--accent': color }}>
			<div className="progress-text">
				<h3>{name}</h3>
				<p>{formatCurrency(amount)} Budgeted</p>
			</div>
			<progress max={amount} value={spent}>
				{formatPercentage(spent / amount)}
			</progress>
			<div className="progress-text">
				<small>{formatCurrency(spent)} spent</small>
				<small>{formatCurrency(amount - spent)} remaining</small>
			</div>
			{showDelete ? (
				<div className="flex-sm">
					<Form method='post' action='delete' onSubmit={handleSubmit}>
						<button className='btn'>
							<span>Delete Budget</span>
							<TrashIcon width={20} />
						</button>
					</Form>
				</div>
			) : (
				<div className="flex-sm">
					<Link to={`/budgets/${id}`} className='btn'>
						<span>View Details</span>
						<BanknotesIcon width={20} />
					</Link>	
				</div>
			)}
		</div>
	)
}

export default BudgetItem