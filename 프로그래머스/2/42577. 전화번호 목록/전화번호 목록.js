function solution(phone_book) {
  const root = {}
  for(const phone of phone_book){
      let cur = root;
      
      for(const number of phone){
          if(!cur[number]){
              cur[number] = {}
          }
        
          // 나보다 길이가 짧은 번호가 들어있었다면
          if(cur.end){
              return false;
          }
          cur = cur[number]
      }
      
        // 나는 끝났는데 나보다 긴 번호가 들어있었다
       if (Object.keys(cur).length > 0) return false;
     
      cur.end = true;
  }
    return true;
}