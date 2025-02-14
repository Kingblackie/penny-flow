import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteItem, getAllMatchingItems } from '../utils/helpers'

export const deleteBudget = ({ params }) => {
	try {
		deleteItem({
			key: 'budgets',
			id: params.id
		})

		const associatedExpenses = getAllMatchingItems({
			category: 'expenses',
			key: 'budgetId',
			value: params.id
		})

		associatedExpenses.forEach((expenses) => {
			deleteItem({
				key: 'expenses',
				id: expenses.id
			})
		})

		toast.success('Budget deleted successfully!', {
			autoClose: 1500
		})
	} catch (err) {
		throw new Error('There was a problem deleting the budget.')
	}

	return redirect('/')
}