import { Link, useFetcher } from 'react-router-dom'
import { formatCorrency, formatDate, getAllMatchingItems } from '../utils/helpers'
import { TrashIcon } from '@heroicons/react/24/solid'

const ExpenseItem = ({ expense, showBudget }) => {
	const fetcher = useFetcher()

	const budget = getAllMatchingItems({
		category: 'budgets',
		key: 'id',
		value: expense.budgetId
	})[0]

	return (
		<>
			<td>{expense.name}</td>
			<td>{formatCorrency(expense.amount)}</td>
			<td>{formatDate(expense.createdAt)}</td>
			{showBudget && (
				<td>
						<Link 
							to={`/budgets/${budget?.id}`} 
							style={{ '--accent': budget?.color }}
						>
							{budget?.name.split(' ').length > 1 ? 
								`${budget?.name.split(' ')[0][0]}. ${budget?.name.split(' ').pop()}` 
							: 
								budget?.name
							}
						</Link>
				</td>
			)}
			<td>
				<fetcher.Form method='post'>
					<input type="hidden" name="_action" value='deleteExpense' />
					<input type="hidden" name="expenseId" value={expense.id} />
					<button 
						className='btn btn--warning' 
						aria-label={`Delete ${expense.name} expense`}
					>
						<TrashIcon width={20} />
					</button>
				</fetcher.Form>
			</td>
		</>
	)
}

export default ExpenseItem