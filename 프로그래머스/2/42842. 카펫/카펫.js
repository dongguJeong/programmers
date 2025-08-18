function solution(brown, yellow) {
    var answer = [];
    
    const possibleYellow = [];
    
    for(let i = 1 ; i * i <= yellow ; i++){
        if(yellow%i === 0){
            possibleYellow.push({width : i , height : yellow/i })
        }
    }
    
    for(let i = 0 ; i < possibleYellow.length ; i++){
        if(4 + possibleYellow[i].width* 2 + possibleYellow[i].height * 2 === brown){
            answer.push(Math.max(possibleYellow[i].width,possibleYellow[i].height)+2 , Math.min(possibleYellow[i].width, possibleYellow[i].height)+2)
        }  
    }
    
    
    return answer;
}