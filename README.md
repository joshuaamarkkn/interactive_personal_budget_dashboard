Interactive Personal Budget Dashboard

A dynamic personal budget tracking application that helps users manage their monthly finances with real-time calculations, interactive charts, and comprehensive expense tracking. Built with vanilla JavaScript and Chart.js.

Features

Core Functionality
- 💰 Monthly budget setting and tracking
- 📊 Real-time expense and income monitoring
- 🎯 Budget progress visualization
- 📈 Interactive charts showing expense distribution and trends
- 💾 Local storage for data persistence
- 🚫 Over-budget alerts with color indicators

Data Visualization
- Pie chart showing expense distribution by category
- Line chart displaying income vs. expenses trends over time
- Visual budget progress bar
- Color-coded budget status indicators

Budget Management
- Set and adjust monthly budget
- Add and remove income/expense entries
- Categorize transactions
- Track remaining budget with visual alerts
- Monitor expense percentages

Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js for data visualization
- Local Storage API for data persistence

Screenshots

![image](https://github.com/user-attachments/assets/37c54b7c-8b6c-49d8-a887-a4422f8896b9)
![image](https://github.com/user-attachments/assets/6a39249b-042b-45ac-baf8-81292f63886f)
![image](https://github.com/user-attachments/assets/41627287-feb8-447d-96a4-922c30c10fe8)
![image](https://github.com/user-attachments/assets/3b35c27d-f3ea-4fc5-bd8d-94c86626d5be)
![image](https://github.com/user-attachments/assets/10638ee8-4674-450a-8e65-c8a96980aa33)
![image](https://github.com/user-attachments/assets/329542cd-7206-4299-acbb-91b23efa4344)
![image](https://github.com/user-attachments/assets/2ed87d31-105e-4564-8593-dd1ab3608fab)




Installation

1. Clone the repository:
```bash
git clone https://github.com/joshuaamarkkn/interactive_personal_budget_dashboard.git
```

2. Open `index.html` in your web browser or use a local server.

Usage

Setting Monthly Budget
1. Enter your monthly budget amount
2. Submit using the monthly budget form
3. View allocated budget at the top of the dashboard

Adding Transactions
1. Fill in the transaction form with:
   - Item name
   - Amount
   - Category (income/expense)
2. Submit to update dashboard and charts

Monitoring Budget
- View total income and expenses
- Check remaining budget (color-coded):
  - 🟢 Green: Healthy budget
  - 🟡 Orange: Near budget limit (20% remaining)
  - 🔴 Red: Over budget
- Track budget usage percentage with progress bar

Analyzing Expenses
- View expense distribution in pie chart
- Monitor income vs. expenses trends
- Remove transactions as needed

Local Storage

The application uses local storage to persist:
- Monthly budget amount
- Transaction history
- Category data

Code Structure

```javascript
// Core Functions
setMonthlyBudget()    // Handle monthly budget setting
addBudgetItem()       // Add new transactions
updateBudgetList()    // Refresh transaction list
updateBudgetSummary() // Update financial summaries
updateCharts()        // Refresh visualizations

// Data Management
getCurrentMonthData() // Filter current month transactions
updateLocalStorage()  // Save data to local storage
removeItem()         // Delete transactions
```

Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Future Enhancements

- [ ] Multiple currency support
- [ ] Export data functionality
- [ ] Custom categories management
- [ ] Monthly comparison reports
- [ ] Budget recommendations
- [ ] Expense statistics and analytics

Author

joshuaamarkkn
itsmejoshua10@gmail.com

Acknowledgments

- Chart.js for visualization capabilities
- Modern JavaScript features for data management
- Local Storage API for data persistence
