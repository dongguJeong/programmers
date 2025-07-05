function solution(genres, plays) {
    const obj = {};
    for(let i = 0 ; i < genres.length ; i++){
        const genre = genres[i];
        const play = plays[i];
        
        if(!obj[genre]){
             obj[genre] = { list: [], total: play }
            obj[genre].list.push({play, index :  i});
            obj[genre].total = play
        }
        
        else{
            obj[genre].total += play;
            
            if(obj[genre].list.length < 2){
                obj[genre].list.push({play, index : i});
                obj[genre].list.sort((a,b) => {
                    return b.play - a.play
                })
            }
            else if (obj[genre].list[1].play <= play){
                obj[genre].list.pop();
                obj[genre].list.push({play, index : i});
                obj[genre].list.sort((a,b) => {
                    return b.play - a.play
                });
            }
        }
    }
    
    const temp  = Object.values(obj).sort((a,b) => {return b.total - a.total}).map(i => i.list.flat())
    const answer = [];
    for(let i = 0 ; i < temp.length ; i++){
        for(let j = 0 ; j < temp[i].length ; j++){
            answer.push(temp[i][j].index)
        }
    }
    console.log(answer)

    return answer
}