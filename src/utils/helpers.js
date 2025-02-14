// Simulating DB action
export const wait = () => new Promise((res) => setTimeout(res, Math.random() * 1000))

// Generate random color
const generateRandomColor = () => {
	const existingBudgetLength = fetchData('budgets')?.length ?? 0

	return `${existingBudgetLength * 34} 65% 50%`
}

// Fetch from local Storage
export const fetchData = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
	const data = fetchData(category) ?? []
	
	return data.filter((item) => item[key] === value)
}

// Delete item from local storage
export const  deleteItem = ({ key, id }) => {
	const existingData = fetchData(key)

	if (id) {
		const newData = existingData.filter((item) => item.id !== id)
		
		return localStorage.setItem(key, JSON.stringify(newData))
	}
	
	return localStorage.removeItem(key)
}

// Create Budget
export const createBudget = ({ name, amount }) => {
	const newItem = {
		id: self.crypto.randomUUID(),
		name,
		createdAt: Date.now(),
		amount: +amount,
		color: generateRandomColor()
	}
	const existingBudgets = fetchData('budgets') ?? []

	return localStorage.setItem('budgets', JSON.stringify([...existingBudgets, newItem]))
}

// Add Expense
export const createExpense = ({ name, amount, budgetId }) => {
	const newItem = {
		id: self.crypto.randomUUID(),
		name,
		createdAt: Date.now(),
		amount: +amount,
		budgetId
	}
	const existingExpenses = fetchData('expenses') ?? []

	return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]))
}

// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
	const expenses = fetchData('expenses') ?? []
	const budgetSpent = expenses.reduce((acc, expense) => {
		if (expense.budgetId !== budgetId) return acc

		return acc += expense.amount
	}, 0)

	return budgetSpent
}

// FORMATTING

// Format Date
export const formatDate = (epoch) => {
	return new Date(epoch).toLocaleDateString()
}

// Format percentages
export const formatPercentage = (amount) => {
	return amount.toLocaleString(undefined, {
		style: 'percent',
		minimumFractionDigits: 0
	})
}

// Format Currency
export const formatCorrency = (amount) => {
	return amount.toLocaleString(undefined, {
		style: 'currency',
		currency: 'NGN'
	})
}