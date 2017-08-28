/**
 * @file porousCalculation.js
 * @author Minh Phuong, James Feracor,Charles W. Schwartz
 * @copyright Michael Mathews 2017
              © Pavia Systems 2016. All rights reserved.
 * Algorithm to
 */

var calculationAASHTO = function(structuralNum){
return  (-0.674*0.45)+9.36*(Math.log10(structuralNum+1)) - 0.2 + Math.log10(2.5/2.7)/(0.4+(1094/Math.pow((structuralNum+1),5.19))) + 2.32*Math.log10(20000) - 8.07 - Math.log10(3000000);
}

var numGuesses = 0;
// starting guess number
var structuralNumFound = calculationAASHTO(Math.log10(3000000));

var derivativeAASHTO = function(structuralNum){
  return (234/25)*Math.log10(1+structuralNum)+(283893/50)*(1+structuralNum)^(-619/100)*(1094*(1+structuralNum)^(-519/100)+2/5)^(-2)*Math.log10(25/27);
}

// TODO: Verify if epsilon is okay
while (Math.abs(calculationAASHTO(structuralNumFound)) >= 0.001){
  numGuesses +=1;
  // structuralNumFound -= 0.000001;
  //Newton-Raphson method
  structuralNumFound = structuralNumFound - calculationAASHTO(structuralNumFound)/(derivativeAASHTO(structuralNumFound));
}
// TODO: Verify if difference is okay
console.log("number of guesses is: "+ numGuesses);
console.log("SN is: "+ structuralNumFound);
