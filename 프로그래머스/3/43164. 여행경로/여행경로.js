function solution(tickets) {
    const MAX = tickets.length;
    let answer = []
    
    tickets.sort((a,b) => {
        if(a[0] === b[0]){
            return a[1].localeCompare(b[1])
        }
        return a[0].localeCompare(b[0])
    })
 
    const path = [];
    const visited = Array(MAX).fill(false)
 
    function dfs(path, depth , curr){
        if(depth === MAX){
            answer.push([...path]);
            return true;
        }
        
        for(let i = 0 ; i < tickets.length ; i++){
            const [from,  to] = tickets[i];
            if(!visited[i] &&  from === curr){
                path.push(to);
                visited[i] = true;
                if(dfs(path, depth+1, to)) return true;
                visited[i] = false;
                path.pop()
            }
        }
        return false
    }
    
    
    dfs(['ICN'] , 0, 'ICN')
    return answer[0] 
  
}