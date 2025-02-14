import { redirect } from 'react-router-dom'
import { deleteItem } from '../utils/helpers'
import { toast } from 'react-toastify'

export const logoutAction = async () => {
	deleteItem({ key: 'username' })
	deleteItem({ key: 'budgets' })
	deleteItem({ key: 'expenses' })
	toast.success('Account deleted successfully', {
		autoClose: 2500
	})

	return redirect('/')
}