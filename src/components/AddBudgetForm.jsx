import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import { useFetcher } from 'react-router-dom'

const AddBudgetForm = () => {
	const fetcher = useFetcher()
	const isSubmitting = fetcher.state === 'submitting'

	const formRef = useRef()
	const inputRef = useRef()

	useEffect(() => {
		if (!isSubmitting) {
			formRef.current.reset()
			inputRef.current.focus()
		}
	}, [isSubmitting])

	return (
		<div className='form-wrapper'>
			<h2 className='h3'>Create Budget</h2>

			<fetcher.Form method='post' className='grid-sm' ref={formRef}>
				<div className='grid-xs'>
					<label htmlFor='newBudget'>Budget Name</label>
					<input 
						type='text' 
						id='newBudget' 
						name='newBudget'
						placeholder='e.g. Groceries'
						required
						ref={inputRef}
					/>
				</div>
				<div className='grid-xs'>
					<label htmlFor='newBudgetAmount'>Budget Amount</label>
					<input 
						type='number' 
						step={0.01}
						inputMode='decimal'
						id='newBudgetAmount'
						name='newBudgetAmount'
						placeholder='e.g. 480'
						required
					/>
				</div>
				<input type='hidden' name='_action' value='createBudget' />
				<button className='btn btn--dark' disabled={isSubmitting}>
					{isSubmitting ? (
						<span>Submitting...</span>
					) : (
						<>
							<span>Create Budget</span>
							<CurrencyDollarIcon width={20} />
						</>
					)}
				</button>
			</fetcher.Form>
		</div>
	)
}

export default AddBudgetForm