function solution(sizes) {
     let max1  = 0;
    let max2 = 0
    
    sizes.forEach( v => {
        
        let a = Math.max(v[0] , v[1]);
        let b = Math.min(v[0] , v[1]);
        
        max1 = Math.max(max1 , a);
        max2 = Math.max(max2 , b)
    })
    
   
    return max1 * max2;
}