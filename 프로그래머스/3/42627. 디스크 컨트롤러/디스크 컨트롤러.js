function solution(jobs) {
  let answer = 0;
  let currentTime = 0;
  const pq = new PriorityQueue();

  jobs.sort((a, b) => a[0] - b[0]); // 선착순으로 정렬
  const totalJobs = jobs.length; // 원래 작업 개수 저장

  while (jobs.length > 0 || pq.length() > 0) {
    while (jobs.length && jobs[0][0] <= currentTime) {
      pq.push(jobs.shift());
    }

    if (pq.length() === 0) {
      currentTime = jobs[0][0];
      continue;
    }

    const target = pq.pop();
    answer += (currentTime - target[0] + target[1]);
    currentTime += target[1];
  }

  return Math.floor(answer / totalJobs);
}

class PriorityQueue {
  arr = [];

  push(value) {
    this.arr.push(value);
    let idx = this.arr.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.arr[parent][1] > this.arr[idx][1]) {
        [this.arr[parent], this.arr[idx]] = [this.arr[idx], this.arr[parent]];
        idx = parent;
      } else break;
    }
  }

  pop() {
    if (this.arr.length === 0) return null;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length === 0) return top;
    this.arr[0] = last;
    let idx = 0;
    while (true) {
      let left = 2 * idx + 1;
      let right = 2 * idx + 2;
      let smallest = idx;
      if (left < this.arr.length && this.arr[left][1] < this.arr[smallest][1]) smallest = left;
      if (right < this.arr.length && this.arr[right][1] < this.arr[smallest][1]) smallest = right;
      if (smallest === idx) break;
      [this.arr[smallest], this.arr[idx]] = [this.arr[idx], this.arr[smallest]];
      idx = smallest;
    }
    return top;
  }

  top() {
    return this.arr[0];
  }

  length() {
    return this.arr.length;
  }
}