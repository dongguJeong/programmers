function solution(k, dungeons) {
    const visited = Array.from({length : dungeons.length}, () => false);
    dfs(dungeons, k, 0, visited)
    return MAX;
}

let MAX = 0;

function dfs(dungeons,current, depth, visited ){
    MAX =Math.max(depth, MAX);
    if(depth === dungeons.length){
        return ;
    }
    
    for(let i  = 0 ; i < dungeons.length ; i ++){
        if(!visited[i] && current >= dungeons[i][0] && current >= dungeons[i][1]){
            visited[i] = true;
            dfs( dungeons, current - dungeons[i][1], depth+1 , visited);
            visited[i] = false;
        }
    }
}