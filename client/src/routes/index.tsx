import { component$, useComputed$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Form, routeAction$ } from '@builder.io/qwik-city';

export const useEmployAction = routeAction$(async (data) => {
	const resp = await fetch('http://localhost:3004/api/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const json = await resp.json();
	return {...json, status: resp.status};
});
export default component$(() => {
	const name = useSignal('');
	const salary = useSignal('');
	const position = useSignal('');
	const joinDate = useSignal('2024-01-01');
	const action = useEmployAction();
  const getAcknowledgementMessage = useComputed$(() => { 
    if(action.value?.isSuccess && action.value.status === 200) {
      return 'Employee added successfully';
    }
    if (!action.value?.isSuccess && action.value?.status === 400) { 
      return action.value?.message;
    }
    return 'This is a default message would be replaced by the above two messages and would never be shown';

  })
  const getAcknowledgementClasses = useComputed$(() => { 
    if(action.value?.isSuccess && action.value.status === 200) {
      return 'acknowledgement success';
    }
    if (!action.value?.isSuccess && action.value?.status === 400) { 
      return 'acknowledgement error';
    }
    return 'acknowledgement';
  })
	return (
		<div class='form-container'>
			<h1>Employee Information Hub</h1>
			<p>Provide and manage your information here.</p>
			<Form action={action}>
				<label>
					<span>Name:</span>
					<input type='text' name='name' bind:value={name} />
				</label>
				<label>
					<span>Salary</span>
					<input
						type='number'
						name='salary'
						id=''
						bind:value={salary}
						min={100000}
					/>
				</label>
				<label>
					<span>Position</span>
					<select name='position' id='' bind:value={position}>
						<option value='Manager'>Manager</option>
						<option value='SDE'> Software Developer Engineer </option>
						<option value='Sales Analyst'> Sales Analyst</option>
					</select>
				</label>
				<label>
					<span>Join Date</span>
					<input type='date' name='date' id='' bind:value={joinDate} />
				</label>
				<button type='submit'>Submit</button>
			</Form>
			<p class={getAcknowledgementClasses.value}>
				{getAcknowledgementMessage.value}
			</p>
			{/* { && <p>Employee added successfully</p>} */}
		</div>
	);
});

export const head: DocumentHead = {
	title: 'Employee Information Hub',
	meta: [
		{
			name: 'description',
			content: 'Provide and manage your information here.',
		},
	],
};
