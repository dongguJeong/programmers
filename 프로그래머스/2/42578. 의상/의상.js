function solution(clothes) {
    let ans = 1 ;
    const obj = {};
    clothes.forEach(i => {
        obj[i[1]] = (obj[i[1]] || 0)  + 1;
    });
    
    for(const category in obj){
        ans *= (obj[category] + 1)
    }
    
  
    return ans -1;
}

