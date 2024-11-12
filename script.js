// Initialize budget data and monthly budget
let budgetData = JSON.parse(localStorage.getItem('budgetData')) || [];
let monthlyBudgetAmount = parseFloat(localStorage.getItem('monthlyBudget')) || 0;

// DOM elements
const budgetForm = document.getElementById('budgetForm');
const monthlyBudgetForm = document.getElementById('monthlyBudgetForm');
const budgetItems = document.getElementById('budgetItems');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
const remainingBudget = document.getElementById('remainingBudget');
const allocatedBudget = document.getElementById('allocatedBudget');
const expenseChart = document.getElementById('expenseChart').getContext('2d');
const trendChart = document.getElementById('trendChart').getContext('2d');

// Event listeners
budgetForm.addEventListener('submit', addBudgetItem);
monthlyBudgetForm.addEventListener('submit', setMonthlyBudget);

// Initialize charts
let expensePieChart, trendLineChart;

// Load initial data
updateBudgetList();
updateBudgetSummary();
updateCharts();

// Set initial monthly budget display
allocatedBudget.textContent = `$${monthlyBudgetAmount.toFixed(2)}`;

function setMonthlyBudget(e) {
   e.preventDefault();
   const budgetInput = document.getElementById('monthlyBudget');
   monthlyBudgetAmount = parseFloat(budgetInput.value);
   
   localStorage.setItem('monthlyBudget', monthlyBudgetAmount);
   allocatedBudget.textContent = `$${monthlyBudgetAmount.toFixed(2)}`;
   updateBudgetSummary();
   
   monthlyBudgetForm.reset();
}

function addBudgetItem(e) {
   e.preventDefault();

   const name = document.getElementById('itemName').value;
   const amount = parseFloat(document.getElementById('itemAmount').value);
   const category = document.getElementById('itemCategory').value;

   if (name && amount && category) {
       const newItem = {
           name,
           amount,
           category,
           date: new Date().toISOString().split('T')[0]
       };

       budgetData.push(newItem);
       updateLocalStorage();
       updateBudgetList();
       updateBudgetSummary();
       updateCharts();

       budgetForm.reset();
   }
}

function updateBudgetList() {
   budgetItems.innerHTML = '';
   const currentMonthData = getCurrentMonthData();
   
   currentMonthData.forEach((item, index) => {
       const li = document.createElement('li');
       li.innerHTML = `
           <strong>${item.name}</strong> - $${item.amount.toFixed(2)} (${item.category})
           <button onclick="removeItem(${index})" class="delete-btn">Remove</button>
       `;
       budgetItems.appendChild(li);
   });
}

function updateBudgetSummary() {
   const currentMonthData = getCurrentMonthData();
   
   const income = currentMonthData
       .filter(item => item.category === 'income')
       .reduce((sum, item) => sum + item.amount, 0);
   
   const expenses = currentMonthData
       .filter(item => item.category !== 'income')
       .reduce((sum, item) => sum + item.amount, 0);
   
   const remaining = monthlyBudgetAmount - expenses;

   totalIncome.textContent = `$${income.toFixed(2)}`;
   totalExpenses.textContent = `$${expenses.toFixed(2)}`;
   remainingBudget.textContent = `$${remaining.toFixed(2)}`;

   // Update color based on remaining budget
   if (remaining <= 0) {
       remainingBudget.style.color = '#FF6B6B'; // Red for over budget
   } else if (remaining <= monthlyBudgetAmount * 0.2) {
       remainingBudget.style.color = '#F8961E'; // Orange for close to budget
   } else {
       remainingBudget.style.color = '#4ECDC4'; // Green for good
   }

   updateBudgetProgress(expenses, monthlyBudgetAmount);
}

function updateBudgetProgress(expenses, budget) {
   if (budget === 0) return; // Don't show progress if no budget is set
   
   const progressPercentage = (expenses / budget) * 100;
   const progressContainer = document.querySelector('.budget-progress-container');
   
   progressContainer.innerHTML = `
       <div class="budget-progress">
           <div class="progress-bar" style="width: ${Math.min(progressPercentage, 100)}%"></div>
           <span class="progress-text">${progressPercentage.toFixed(1)}% of budget used</span>
       </div>
   `;
}

function getCurrentMonthData() {
   const now = new Date();
   const currentMonth = now.getMonth();
   const currentYear = now.getFullYear();
   
   return budgetData.filter(item => {
       const itemDate = new Date(item.date);
       return itemDate.getMonth() === currentMonth && 
              itemDate.getFullYear() === currentYear;
   });
}

function updateCharts() {
   updateExpenseChart();
   updateTrendChart();
}

function updateExpenseChart() {
   const expenseData = getCurrentMonthData().filter(item => item.category !== 'income');
   const categories = [...new Set(expenseData.map(item => item.category))];
   const amounts = categories.map(category => 
       expenseData.filter(item => item.category === category)
           .reduce((sum, item) => sum + item.amount, 0)
   );

   if (expensePieChart) {
       expensePieChart.destroy();
   }

   expensePieChart = new Chart(expenseChart, {
       type: 'pie',
       data: {
           labels: categories,
           datasets: [{
               data: amounts,
               backgroundColor: [
                   '#FF6B6B',  // Red
                   '#4ECDC4',  // Teal
                   '#45B7D1',  // Blue
                   '#96CEB4',  // Sage
                   '#FFEEAD',  // Yellow
                   '#D4A5A5'   // Pink
               ],
               borderWidth: 2,
               borderColor: '#ffffff'
           }]
       },
       options: {
           responsive: true,
           maintainAspectRatio: false,
           legend: {
               position: 'bottom',
               labels: {
                   padding: 20,
                   fontFamily: "'Courier New', monospace",
                   fontSize: 12
               }
           },
           layout: {
               padding: {
                   left: 10,
                   right: 10,
                   top: 10,
                   bottom: 50
               }
           },
           tooltips: {
               callbacks: {
                   label: function(tooltipItem, data) {
                       const dataset = data.datasets[0];
                       const total = dataset.data.reduce((sum, value) => sum + value, 0);
                       const value = dataset.data[tooltipItem.index];
                       const percentage = ((value / total) * 100).toFixed(1);
                       return `${data.labels[tooltipItem.index]}: $${value.toFixed(2)} (${percentage}%)`;
                   }
               }
           }
       }
   });
}

function updateTrendChart() {
   const dates = [...new Set(budgetData.map(item => item.date))].sort();
   
   const incomeData = dates.map(date => ({
       x: date,
       y: budgetData.filter(item => item.date === date && item.category === 'income')
           .reduce((sum, item) => sum + item.amount, 0)
   }));

   const expenseData = dates.map(date => ({
       x: date,
       y: budgetData.filter(item => item.date === date && item.category !== 'income')
           .reduce((sum, item) => sum + item.amount, 0)
   }));

   if (trendLineChart) {
       trendLineChart.destroy();
   }

   trendLineChart = new Chart(trendChart, {
       type: 'line',
       data: {
           datasets: [
               {
                   label: 'Income',
                   data: incomeData,
                   borderColor: '#4ECDC4',
                   backgroundColor: 'rgba(78, 205, 196, 0.1)',
                   borderWidth: 3,
                   pointRadius: 4,
                   pointBackgroundColor: '#4ECDC4',
                   fill: true
               },
               {
                   label: 'Expenses',
                   data: expenseData,
                   borderColor: '#FF6B6B',
                   backgroundColor: 'rgba(255, 107, 107, 0.1)',
                   borderWidth: 3,
                   pointRadius: 4,
                   pointBackgroundColor: '#FF6B6B',
                   fill: true
               }
           ]
       },
       options: {
           responsive: true,
           maintainAspectRatio: false,
           legend: {
               position: 'bottom',
               labels: {
                   padding: 20,
                   fontFamily: "'Courier New', monospace",
                   fontSize: 12
               }
           },
           layout: {
               padding: {
                   left: 10,
                   right: 10,
                   top: 10,
                   bottom: 50
               }
           },
           scales: {
               xAxes: [{
                   type: 'time',
                   distribution: 'linear',
                   time: {
                       parser: 'YYYY-MM-DD',
                       unit: 'day',
                       displayFormats: {
                           day: 'MMM D'
                       }
                   },
                   gridLines: {
                       drawBorder: true,
                       color: 'rgba(0, 0, 0, 0.1)'
                   }
               }],
               yAxes: [{
                   ticks: {
                       beginAtZero: true,
                       callback: function(value) {
                           return '$' + value;
                       }
                   },
                   gridLines: {
                       drawBorder: true,
                       color: 'rgba(0, 0, 0, 0.1)'
                   }
               }]
           },
           tooltips: {
               callbacks: {
                   label: function(tooltipItem, data) {
                       return data.datasets[tooltipItem.datasetIndex].label + ': $' + tooltipItem.yLabel.toFixed(2);
                   }
               }
           }
       }
   });
}

function removeItem(index) {
   const currentMonthData = getCurrentMonthData();
   const itemToRemove = currentMonthData[index];
   const globalIndex = budgetData.findIndex(item => 
       item.name === itemToRemove.name && 
       item.date === itemToRemove.date && 
       item.amount === itemToRemove.amount
   );
   
   if (globalIndex !== -1) {
       budgetData.splice(globalIndex, 1);
       updateLocalStorage();
       updateBudgetList();
       updateBudgetSummary();
       updateCharts();
   }
}

function updateLocalStorage() {
   localStorage.setItem('budgetData', JSON.stringify(budgetData));
}