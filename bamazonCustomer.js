var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "nnay581bB!",
  database: "bamazon"
});

//currency formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Prints all Items for Sale
        for (var i = 0; i < results.length; i++) {
            console.log(`-------------------------------`);
            printItem(results[i]);
            console.log(`-------------------------------`);
        }
        askUser();

        function askUser(){
            inquirer
                .prompt([
                    {
                    name: "home",
                    type: "list",
                    message: "Shop or Exit",
                    choices: ["Shop", "Exit"]
                    }
                ])
                .then(function(answer) {
                    if(answer.home === "Exit"){
                        connection.end();
                    } else{
                        
                        let index;

                        inquirer
                            .prompt([
                                {
                                name: "product",
                                type: "input",
                                message: "What product would you like to buy?",
                                validate: function(value){
                                    for(var i=0; i<results.length; i++){
                                        if(parseInt(value)===results[i].item_id){
                                            index=i;
                                            return true;
                                        }
                                    }
                                    console.log(" is invalid. Please enter a valid ID");
                                    return false;
                                } 
                                },
                                {
                                name: "quantity",
                                type: "input",
                                message: "How many would you like to buy?"
                                }
                            ])
                        .then(function(answer) {

                            var chosenItem = results[index];
                            if (chosenItem.stock_quantity === 0){
                                console.log(`We are currently out of stock of ${chosenItem.product_name}. Please browse our other products`);
                                askUser(); 
                            }else{
                                let amount = parseInt(answer.quantity);

                                if (chosenItem.stock_quantity <  amount){
                                    console.log(`We do not have ${amount} of the selected item. Please choose another quantity.`);
                                    askUser();    
                                } else {
                                    let newQuantity = chosenItem.stock_quantity - amount;

                                    connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                        {
                                            stock_quantity: newQuantity
                                        },
                                        {
                                            item_id: chosenItem.item_id
                                        }
                                        ],
                                        function(error) {
                                        if (error) throw error;
                                        console.log("Order placed successfully!");
                                        askUser();
                                        }
                                    );
                                }
                            }
                        })
                    }
                })
        }
    })
}


// Prints the id, name, and price of a product
function printItem(res) {
    console.log(`ID: #${res.item_id}`);
    console.log(`Description: ${res.product_name}`);
    console.log(`Price: ${formatter.format(res.price)}`);
}


