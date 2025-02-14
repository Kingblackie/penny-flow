import { Link, useLoaderData } from 'react-router-dom'
import { createExpense, createBudget, fetchData, wait, deleteItem } from '../utils/helpers'
import Intro from '../components/Intro'
import { toast } from 'react-toastify'
import AddBudgetForm from '../components/AddBudgetForm'
import AddExpenseForm from '../components/AddExpenseForm'
import BudgetItem from '../components/BudgetItem'
import Table from '../components/Table'


// Loader
export const dashboardLoader = async () => {
	const username = fetchData('username')
	const budgets = fetchData('budgets')
	const expenses = fetchData('expenses')

	return { username, budgets, expenses }
}

// Action
export const dashboardAction = async ({ request }) => {
	await wait()

	const data = await request.formData()
	const { _action, ...values } = Object.fromEntries(data)
	
	// Submit new user
	if (_action === 'newUser') {
		try {
	
			localStorage.setItem('username', JSON.stringify(values.username))
			return toast.success(`Welcome, ${values.username}`, {
				autoClose: 2500
			})
		} catch (err) {
			throw new Error('There was a problem creating your account.')
		}
	}

	// Create budget 
	if (_action === 'createBudget') {
		try {
			createBudget({ 
				name: values.newBudget, 
				amount: values.newBudgetAmount 
			})
			return toast.success('Budget created successfully', {
				autoClose: 2500
			})
		} catch (err) {
			throw new Error('There was a problem creating your budget.')
		}
	}

	// Create expense
	if (_action === 'createExpense') {
		try {
			createExpense({ 
					name: values.newExpense, 
					amount: values.newExpenseAmount, 
					budgetId: values.newExpenseBudget 
			})
			return toast.success(`Expense '${values.newExpense}' added successfully`, {
				autoClose: 2500
			})
		} catch (err) {
			throw new Error('There was a problem adding the expense.')
		}
	}

	// Delete Expense
	if (_action === 'deleteExpense') {
		try {
			deleteItem({ 
				key: 'expenses',
				id: values.expenseId
			})
			return toast.success(`Expense deleted successfully`, {
				autoClose: 2500
			})
		} catch (err) {
			throw new Error('There was a problem deleting the expense.')
		}
	}
}

const Dashboard = () => {
	const { username, budgets, expenses } = useLoaderData()

	return (
		<>
			{username ? (
				<div className='dashboard'>
					<h1>Welcome back, <span className='accent'>{username}</span></h1>
					<div className='grid-sm'>
						{budgets && budgets.length > 0 ? (
							<div className='grid-lg'>
								<div className='flex-lg'>
									<AddBudgetForm />
									<AddExpenseForm budgets={budgets} />
								</div>
								<h2>Existing Budgets</h2>
								<div className="budgets">
									{budgets.map((budget) => (
										<BudgetItem key={budget.id} budget={budget} />
									))}
								</div>

								{expenses && expenses.length > 0 && (
									<div className="grid-md">
										<h2>Recent Expenses</h2>
										<Table expenses={expenses
											.sort((a, b) => b.createdAt - a.createdAt)
											.slice(0,  8)
										}/>
										{expenses.length > 8 && (
											<Link to='expenses' className='btn btn--dark'>
												View all expenses
											</Link>
										)}
									</div>
								)}
							</div>	
						) : (
							<div className='grid-sm'>
								<p>Personal budgeting is the secret to financial freedom.</p>
								<p>Create a budget to get started!</p>
								<AddBudgetForm />
							</div>
						)}
					</div>
				</div>
			) : (
				<Intro />
			)}
		</>
	)
}

export default Dashboard