/*var counter=function(arr){
  return `There are ${arr.length} elements in the array`;
}
var adder=function(a1, b1){
  return `The sum of the elements is ${a1+b1}`;
}
var pi=3.14;
module.exports.counter=counter;
module.exports.adder=adder;
module.exports.pi=pi;

//aliter
module.exports.counter=function(arr){
  return `There are ${arr.length} elements in the array`;
}
module.exports.adder=function(a1, b1){
  return `The sum of the elements is ${a1+b1}`;
}
module.exports.pi=3.14;
*/

var counter=function(arr){
  return `There are ${arr.length} elements in the array`;
}
var adder=function(a1, b1){
  return `The sum of the elements is ${a1+b1}`;
}
var pi=3.14;
module.exports={
  counter:counter,
  adder:adder,
  pi:pi
}
