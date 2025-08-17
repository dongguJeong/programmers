function solution(numbers) {
    
    numbers = numbers.map(v => v.toString());
    numbers.sort((a,b) => (b+a) - (a+b))
    console.log(numbers)
    
    const answers = numbers.join('')
    return answers[0] === "0" ? "0" : answers;
    
  
}



