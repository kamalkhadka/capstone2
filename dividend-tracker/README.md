# Dividend Tracker
It is an web application that will allow you to create a list of stocks and view their dividend payment so you know the income your investments bring in. 

## Tech Stack
- Front End: React, Bootstrap
- Back End: Node, Express/Fastify
- Database: PostgreSQL

## Audience
This app will be used by dividend investor who primarily use spreadsheet / Google sheet to track their dividends.

## Data Utilized 
This app will use unofficial yahoo finance api to collect the historical data about the stock. Based on historical data and when the user inputs their dividend will be calculated. 

## Functionality
This app will let user:
- Create a list.
- Add stock to a list along with their buy date and quantities bought.
- Modify the quantity of a shares.
- Visually display their monthly, yearly dividend.

## Database Tables
- User
- List
- Stock

## API 
[https://www.npmjs.com/package/yahoo-finance2]