/*
PROBLEM SOLVING
user will enter the expense details
we should display them on screen
you should store this data in local storage
we should do all the sum part for the application(update details)
delete functionality 
*/

// const dummyTransaction = [
// { id: 1, transaction: 'books', amount: -100},
// { id: 2, transaction: 'breakfast', amount: 200},
// { id: 3, transaction: 'recharge', amount: -300},
// { id: 4, transaction: 'travel', amount: 400},
// ];


// creating a function saying add transaction to DOM

// function addTransactionDOM(transaction){
// 	// get sign
// 	const sign = transaction.amount<0 ? '-' : '+';

// 	// item
// 	const type = transaction.amount < 0 ? 'minus' : 'plus';
// }

// function init(){
// 	list.innerHTML = '';
// 	dummyTransaction.forEach(addTransactionDOM)
// }



'use strict';

const balance = document.getElementById('balance');

const moneyPlus = document.getElementById('money-plus');

const moneyMinus = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const transaction = document.getElementById('transaction');

const amount = document.getElementById('amount');


// let transactions = [];


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions :[];

// random id generator

const generateRandomID = function () {
	return Math.floor(Math.random() * 10000);
}

// addTransactionDOM

const addTransactionDOM = function (transaction) {

	// getting sign of the amount
	const sign = transaction.amount < 0 ? '-' : '+';

	// create an li element
	const item = document.createElement('li');

	// add a class list respective of sign in amount
	item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

	item.innerHTML =`
	${transaction.transaction}<span>${sign}${Math.abs(
		transaction.amount
		)}</span><button class="delete-btn" onclick = "removeTransaction(${transaction.id})">X</button>
	`;

	list.appendChild(item)

	updateLocalStorage();
};


const removeTransaction = function(id) {
	transactions = transactions.filter((transaction) => transaction.id !== id);
	updateLocalStorage();
	updateValues();
	init();

};



const updateLocalStorage = function(){
	localStorage.setItem('transactions', JSON.stringify(transactions));
}



const updateValues = function(){
	const amounts = transactions.map((transaction) => transaction.amount);

	const income = amounts.filter(item => item>0).reduce((acc,item)=> acc += item,0).toFixed(2);

	const expense = amounts.filter(item => item<0).reduce((acc,item)=> acc += item,0).toFixed(2);
	
	const total = amounts.reduce((acc,item)=> acc += item,0).toFixed(2);

	moneyPlus.innerHTML = `₹${income}`;
	moneyMinus.innerHTML = `₹${expense}`;

	balance.innerHTML = `₹${total}`;

}


// event Listeners
// form event listeners
form.addEventListener('submit', (e) =>{
	e.preventDefault();

if(transaction.value.trim() === '' || amount.value.trim === ''){
	alert('Enter correct Transaction Details')
}	
else{const newTransaction = {
		id: generateRandomID(), transaction: transaction.value, amount: +amount.value,
	};

	transactions.push(newTransaction);

	addTransactionDOM(newTransaction);

	updateValues();
}
});

// initial settings to clear all when re-opened

const init = function() {
	list.innerHTML = '';
	transactions.forEach(addTransactionDOM);
	updateValues();
};

init();






