
function toFloat(stringIn) {
	stringIn = stringIn.replace(',', '');	
	if (stringIn[0] === '-') {
		return -1 * parseFloat(stringIn.substring(2));
	}
	return parseFloat(stringIn.substring(1));
}

/* try to determine which category this line belongs to
 * returns: True if income, else False
 */
function isIncome(node) {
	// target parent class: 'Budget-budgetGroup Budget-budgetGroup--income'
	// others: 'Budget-budgetGroup--draggable'
	let currentNode = node;
	for (let i=10; i > 0; i--) {
		// check the class name, move up to parent if match is not found
		if (currentNode.className === 'Budget-budgetGroup Budget-budgetGroup--income') {
			return true;
		}
		currentNode = currentNode.parentNode;
	}
	return false;
}

function run() {

	let moneyAccountedFor = 0.0;
	let unreceivedIncome = 0.0;
	let incomeLinesFound = 0;
	const checking = parseFloat( prompt('checking account balance', '20126.78') );
	const creditCard = parseFloat( prompt('credit card balance', '6104.46') );

	document.querySelectorAll('.BudgetItemRow-content').forEach(node => {
		const columns = node.getElementsByClassName('BudgetItemRow-column');

		const lineIsIncome = isIncome(node);
		if (lineIsIncome) {
			incomeLinesFound++;
		}

		// get the category Name
		const labelNode = columns[0];
		const isFund = labelNode.children.length === 2;
		const categoryName = labelNode.children[isFund ? 1 : 0].getAttribute('data-text');

		// get the remaining amount
		const remainingNode = columns[columns.length-1];
		let remainingAmount = remainingNode.children[0].getAttribute('data-text');
		if (!remainingAmount) {
			// non-income lines are one child deeper
			remainingAmount = remainingNode.children[0].children[0].getAttribute('data-text');
		}
		remainingAmount = toFloat(remainingAmount);

		// get the planned amount
		const plannedNode = columns[columns.length - 2];
		let plannedAmount = plannedNode.children[0].children[0].getAttribute('value');
		plannedAmount = toFloat(plannedAmount);

		// keep total
		if (lineIsIncome) {
			// see if the income category is expecting to receive more money
			if (plannedAmount > remainingAmount) {
				unreceivedIncome += plannedAmount - remainingAmount;
				console.log(`(income) ${categoryName} still expecting ${plannedAmount - remainingAmount}`);
			}

		} else {
			// planned expenses
			if (remainingAmount > 0) {
				moneyAccountedFor += remainingAmount;
				console.log(`(expense) ${remainingAmount} from ${categoryName}. Total accounted for: ${moneyAccountedFor}`)
			}
		}
	});

	console.log(`\n\nchecking: ${checking}`);
	console.log(`credit card: ${creditCard}`);
	if (incomeLinesFound !== 3) {
		console.log(`WARNING: ${incomeLinesFound} income lines were found. 3 are expected.`);
	}
	console.log(`Money accounted for: ${moneyAccountedFor}`);
	console.log(`Income yet to be received: ${unreceivedIncome}`);
	console.log(`Unaccounted in checking account ${checking - creditCard - moneyAccountedFor}`);
}

run();
