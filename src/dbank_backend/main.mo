import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  //var currentValue:Nat = 300; //flexible variable
  stable var currentValue:Float = 300;//stable variable  
  //currentValue := 100;// But no matter flexible or stable varible, if we have this , it will be set to this value.
  //Debug.print(debug_show(currentValue));
  //let id : Nat = 34539723649649479247293;
  //Debug.print(debug_show(id));  
  //Debug.print(debug_show(currentValue));

  stable var startTime = Time.now();
  //Debug.print(debug_show(startTime));
  

  public func topUp(amount:Float){
    currentValue += amount;
    //Debug.print(debug_show(currentValue));
  };

  public func withdrawl(amount:Float){
    if(currentValue >= amount){
      currentValue -= amount;
      //Debug.print(debug_show(currentValue));
    }else{
      Debug.print("Amount too large, currentValue less than zero.");     
    }
    /*
    let tempValue: Int = currentValue - amount;
    if(tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }else{
      Debug.print("Amount too large, currentValue less than zero.");     
    }
    */    
  };

  public query func checkBalance():async Float{
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeDlapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.01 ** Float.fromInt(timeDlapsedS));
    startTime := currentTime;
  };
};
