// this script allows you to export your data from the EveryDollar budgeting app (everydollar.com)
// just paste it in the console after you login and it capture the categories/sub categories, and total spent for the selected month
// then it will output a CSV file to the browser
// it has only been tested in Chrome on full, non-mobile layout
// it's not perfect, but it's good enough. Feel free to tweak it to fit your needs.

var lines = [];

document.querySelectorAll('.Budget-budgetGroup').forEach(node => {
	const headerCol =  node.getElementsByClassName('BudgetGroupHeader-column')[0];
	const spans = headerCol.getElementsByTagName('span');
	const groupHeader = spans[1];
	const groupText =  groupHeader ? groupHeader.innerText : '';
	const rows = node.getElementsByClassName('BudgetItemRow');

	if (!groupText || groupText.toLowerCase().indexOf('favorites') > -1) {
		return;
	}

	if (!rows) {
		return;
    }
    
	for(let i = 0, len = rows.length; i < len; ++i) {
		const rowNode = rows[i];
		const cols = rowNode.getElementsByClassName('BudgetItemRow-column');
		var line = [];

		for (let j = 0, jLen = cols.length; j < jLen; ++j) {
			const col = cols[j];

			// category - look for label
			const label = col.getElementsByClassName('BudgetItem-label');

			if (label && label.length) {
				const labelInput = label[0].getElementsByTagName('input');

				if (labelInput && labelInput.length) {
					const labelText = labelInput[0].getAttribute('value');

					if (line) line.push(`${groupText} - ${labelText}`);
				}
			}

			// spent - look for .money
			const spent = col.getElementsByClassName('money');

			if (spent && spent.length) {
				const dollas = spent[0].getAttribute('data-text');

				if (line) line.push(dollas.replace('$', '').replace(',', ''));
		    }

		    if (line && line.length) lines.push(line);
        } // loop cols
    } // loop rows
});

// export file
var fileData = [];

lines.forEach(line => { 
	fileData.push(line.join(','));
});

var file = new Blob([fileData.join('\n')], { type: 'text/html'});
var a = document.createElement("a");
var url = URL.createObjectURL(file);

a.href = url;
var dateAndYear = document.querySelectorAll('.BudgetNavigation-date');
var dateStr = '';

if (dateAndYear) {
	dateStr = `-${dateAndYear[0].textContent.toLowerCase().replace(' ', '-')}`;
}

a.download = `budget-summary${dateStr}.csv`;
document.body.appendChild(a);
a.click();

setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
}, 0);