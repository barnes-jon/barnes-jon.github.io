function scoreSorter(array, topScore) {
  // Write your code here
  let swapping = true;
  while(swapping){
    swapping=false;
    for(let i=0;i<array.length-1;i++){
      if(array[i]< array[i+1]){
        temp=array[i+1];
        array[i+1]=array[i];
        array[i] = temp;
        swapping=true;
      }
    }
  }
  return array
}

console.log(scoreSorter([1, 2, 3, 9999, 13], 10000))
// Leave this so we can test your code:
module.exports = scoreSorter;
