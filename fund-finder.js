

document.querySelectorAll('.BudgetItemRow-content').forEach(node => {
	const columns = node.getElementsByClassName('BudgetItemRow-column');

	// get the category Name
	const labelNode = columns[0];
	const isFund = labelNode.children.length === 2;
	const categoryName = labelNode.children[isFund ? 1 : 0].getAttribute('data-text');
	//console.log(categoryName);

	// get the remaining amount
	const remainingNode = columns[columns.length-1];
	let remainingAmount = remainingNode.children[0].getAttribute('data-text');
	let moneyIn = true; 
	if (!remainingAmount) {
		remainingAmount = remainingNode.children[0].children[0].getAttribute('data-text');
		moneyIn = false;
	}
	// console.log(remainingAmount);

	// get the planned amount
	const plannedNode = columns[columns.length - 2];
	const plannedAmount = plannedNode.children[0].children[0].getAttribute('value');

	// print results
	const receivedOrRemaining = moneyIn ? 'Received' : 'Remaining';
	console.log(`${categoryName} Planned: ${plannedAmount} ${receivedOrRemaining}: ${remainingAmount}`)
});
