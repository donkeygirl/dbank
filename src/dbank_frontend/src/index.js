import { FuncClass } from "@dfinity/candid/lib/cjs/idl";
import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async function(){
  //console.log("Finished loading");
  updateBalance();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  //console.log(inputAmount);
  //console.log(outputAmount);
  //console.log(!inputAmount);
  //console.log(!outputAmount);
  //disable button
  const button = e.target.querySelector("#submit-btn");        
  button.setAttribute("disabled", true);
  if(inputAmount && !outputAmount){ 
    await dbank_backend.topUp(inputAmount);
  }else if(outputAmount && !inputAmount){    
    await dbank_backend.withdrawl(outputAmount);    
  }else{
    alert("Please input topUp or withdrawl");
  }      
  document.getElementById("input-amount").value = "";    
  document.getElementById("withdrawal-amount").value = "";
  /*
  if(document.getElementById("input-amount").value.length != 0 && document.getElementById("withdrawal-amount").value.length === 0){ 
    await dbank_backend.topUp(inputAmount);
    document.getElementById("input-amount").value = "";
    await dbank_backend.compound();
  }else if(document.getElementById("withdrawal-amount").value.length != 0 && document.getElementById("input-amount").value.length === 0){    
    await dbank_backend.withdrawl(outputAmount);
    document.getElementById("withdrawal-amount").value = "";
    await dbank_backend.compound();
  }else{
    alert("Please input topUp or withdrawl");    
    document.getElementById("input-amount").value = "";    
    document.getElementById("withdrawal-amount").value = "";
  }
  */
  await dbank_backend.compound();
  //query balance
  updateBalance();  
  button.removeAttribute("disabled");

  return false;
});

async function updateBalance(){  
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
  //document.getElementById("value").innerText = Math.round(currentAmount*100)/100;
}