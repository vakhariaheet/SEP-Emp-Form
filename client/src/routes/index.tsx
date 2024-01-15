import { $, component$, useComputed$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Form, routeAction$ } from '@builder.io/qwik-city';

export const useEmployAction = routeAction$(async (data) => {
	const resp = await fetch(import.meta.env.PUBLIC_BACKEND_URL+'/api/add', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const json = await resp.json();
	return { ...json, status: resp.status };
});
function loadConfetti() {
	return new Promise<(opts: any) => void>((resolve, reject) => {
		if ((globalThis as any).confetti) {
			return resolve((globalThis as any).confetti as any);
		}
		const script = document.createElement('script');
		script.src =
			'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
		script.onload = () => resolve((globalThis as any).confetti as any);
		script.onerror = reject;
		document.head.appendChild(script);
		script.remove();
	});
}
const defaults = {
	spread: 360,
	ticks: 70,
	gravity: 0,
	decay: 0.95,
	startVelocity: 30,
	colors: ['006ce9', 'ac7ff4', '18b6f6', '713fc2', 'ffffff'],
	origin: {
		x: 0.5,
		y: 0.35,
	},
};
function shoot() {
	(globalThis as any).confetti({
		...defaults,
		particleCount: 80,
		scalar: 1.2,
	});
}

export default component$(() => {
	const name = useSignal('');
	const salary = useSignal('');
	const position = useSignal('');
	const joinDate = useSignal('2024-01-01');
  const action = useEmployAction();
  const resetForm = $(() => { 
    name.value = '';
    salary.value = '';
    position.value = '';
    joinDate.value = '2024-01-01';
  })
	const getAcknowledgementMessage = useComputed$(async () => {
		if (action.value?.isSuccess && action.value.status === 200) {
			const confetti = await loadConfetti();

			confetti({
				...defaults,
				particleCount: 60,
				scalar: 0.75,
			});

			setTimeout(shoot, 0);
			setTimeout(shoot, 100);
			setTimeout(shoot, 200);
			setTimeout(shoot, 300);
      setTimeout(shoot, 400);
      resetForm();
			return 'Employee added successfully';
		}
    if (!action.value?.isSuccess && action.value?.status === 400) {
      return action.value?.message;
      
		}
		return 'This is a default message would be replaced by the above two messages and would never be shown';
	});
	const getAcknowledgementClasses = useComputed$(() => {
		if (action.value?.isSuccess && action.value.status === 200) {
			return 'acknowledgement success';
		}
		if (!action.value?.isSuccess && action.value?.status === 400) {
			return 'acknowledgement error';
		}
		return 'acknowledgement';
	});

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
