function solution(prices) {
    
    const answer = new Array(prices.length).fill(0);
    const stack = [];
    for(let i = 0 ; i < prices.length ; i++){
        const now = prices[i];
       
            while(stack.length > 0 && stack[stack.length-1].price > now){
                const top = stack.pop();
                answer[top.index] = i - top.index;
            }
            stack.push({index : i, price : now});
        
    }
    while(stack.length > 0){
         const top = stack.pop();
        answer[top.index] = prices.length- 1- top.index;
        
    }
    
    return answer;
}