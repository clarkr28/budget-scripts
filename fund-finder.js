

let moneyAccountedFor = 0.0

document.querySelectorAll('.BudgetItemRow-content').forEach(node => {
	const verbose = true;
	const columns = node.getElementsByClassName('BudgetItemRow-column');

	// get the category Name
	const labelNode = columns[0];
	const isFund = labelNode.children.length === 2;
	const categoryName = labelNode.children[isFund ? 1 : 0].getAttribute('data-text');

	// get the remaining amount
	const remainingNode = columns[columns.length-1];
	let remainingAmount = remainingNode.children[0].getAttribute('data-text');
	let moneyIn = true; 
	if (!remainingAmount) {
		remainingAmount = remainingNode.children[0].children[0].getAttribute('data-text');
		moneyIn = false;
	}

	// get the planned amount
	const plannedNode = columns[columns.length - 2];
	const plannedAmount = plannedNode.children[0].children[0].getAttribute('value');

	// print results
	if (false) {
		const receivedOrRemaining = moneyIn ? 'Received' : 'Remaining';
		console.log(`${categoryName} Planned: ${plannedAmount} ${receivedOrRemaining}: ${remainingAmount}`)
	}

	// keep total
	if (!moneyIn) {
		// planned expenses
		moneyAccountedFor += toFloat(remainingAmount);
		if (verbose) {
			console.log(`adding ${toFloat(remainingAmount)} from ${categoryName}. Total: ${moneyAccountedFor}`)
		}
	} else {
		// subtract for income still being expected becasue this shouldn't
		// be counted against the checking account balance
		moneyAccountedFor -= toFloat(plannedAmount) - toFloat(remainingAmount);
		if (verbose) {
			console.log(`subtracting ${toFloat(plannedAmount) - toFloat(remainingAmount)} from ${categoryName}. Total: ${moneyAccountedFor}`)
		}
	}
});

function toFloat(stringIn) {
	stringIn = stringIn.replace(',', '');	
	if (stringIn[0] === '-') {
		return -1 * parseFloat(stringIn.substring(2));
	}
	return parseFloat(stringIn.substring(1));
}

console.log(moneyAccountedFor);
const checking = prompt('checking account balance');
const creditCard = prompt('credit card balance');
console.log(`Unaccounted in checking account ${checking - creditCard - moneyAccountedFor}`);
