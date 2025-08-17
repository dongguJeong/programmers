function solution(array, commands) {
    var answer = [];
    
    commands.forEach(v => {
        const [i,j,k] = v;
        const temp = []
        for(let l = i-1 ; l <= j-1 ; l++){
            temp.push(array[l])
        }
        temp.sort((a,b) => a-b);
        answer.push(temp[k-1])
    })
    return answer;
}