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

![image](https://github.com/user-attachments/assets/1b1b0b54-4a7c-4086-a091-6985a0899783)
![image](https://github.com/user-attachments/assets/76eddb9a-9c0d-454e-acef-31f2d1c4e4d4)
![image](https://github.com/user-attachments/assets/349de63a-563d-4293-832e-2f53a2b4ea63)
![image](https://github.com/user-attachments/assets/6043e500-ea28-4078-8bdf-0b0ed9096c7f)
![image](https://github.com/user-attachments/assets/d0759b58-a9ba-445b-b9d5-aa1cadab7c93)
![image](https://github.com/user-attachments/assets/5020d6ec-fd4d-46cf-b622-91ed42d06774)
![image](https://github.com/user-attachments/assets/e6cf481d-a293-468b-9430-908d76cd1b38)



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
