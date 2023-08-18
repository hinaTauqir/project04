#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

import {cc} from "./currencyConverterMethod.cjs"
let agan=false;
function wait(){
   
    return new Promise((resolve,rejects)=>{
        setTimeout(()=>{
         resolve(1);
          },4000);
    })
}
 
async function welcome(){
     console.log(`         ${chalk.yellow(`HELLO`)} `);
     let title=chalkAnimation.karaoke(`      "WELCOME IN CURRENCY CONVERSATION APP"\n`);
     await wait();
     title.stop();
}

let askQuestion=async ()=>
{
   await 
   inquirer.prompt([
        {
            name:"currencyfrom",
            type:"list",
            message:"currency conversation FROM \n",
            choices:["PKR","EUR","USD","QAR","CNY","CAD","AFN"]
        },
        {
            name:"currencyto",
            type:"list",
            message:"currency conversation TO \n",
            choices:["PKR","EUR","USD","QAR","CNY","CAD","AFN"]
        },
        {
            name:"amount",
            type:"number",
            message:"how much amount u want to convert"
        }
    ]) 
    .then((answers)=>{
       {
        let currencyConverter = new cc({
            from:answers.currencyfrom,
            to:answers.currencyto,
            amount:answers.amount
        });
    
        currencyConverter.convert().then((response:number) => {
            console.log(`${chalk.green("amount:")} ${answers.amount}  ${chalk.green(answers.currencyfrom)} is equall to ${chalk.yellow(response)} ${chalk.green(answers.currencyto)}  `) 
              agan=true; })
       }
    })

}


async function again(){
    let response = await inquirer.prompt([
        {
            name:"Again",
            type:"input",
            message:"Do you want to do conversion again y or n"
        }
    ]) ;  
     if((response.Again).toLowerCase()=="y"||(response.Again).toLowerCase()=="yes"){ 
        agan=true 
       await askQuestion();}
     else if (response.Again.toLowerCase()=="n" || response.Again.toLowerCase()=="no"){ 
                   console.log(`       ${chalk.yellow('THANK YOU')} \n` );
                agan=false; }
       

 }
 function lastmessage(){
        console.log(`       ${chalk.green('GOOD BYE')} \n   ${chalk.blue('see you again')}`);
 }


async function steps(){
    await welcome();
    await askQuestion();  
    await wait();
    while(agan){
        await again()
        await wait()};
    await lastmessage();
}

steps();