function solution(bridge_length, weight, truck_weights) {
    let time = 0;
    let bridge = Array(bridge_length).fill(0); // 다리 위 트럭 상태
    let totalWeight = 0; // 현재 다리 위 무게 합

    while (truck_weights.length > 0 || totalWeight > 0) {
        // 1초 경과
        time++;

        // 1. 다리에서 한 칸 이동
        totalWeight -= bridge.shift(); // 다리의 맨 앞에서 트럭 제거

        // 2. 새로운 트럭을 다리에 올릴 수 있는지 확인
        if (truck_weights.length > 0) {
            if (totalWeight + truck_weights[0] <= weight) {
                const truck = truck_weights.shift();
                bridge.push(truck);
                totalWeight += truck;
            } else {
                bridge.push(0); // 트럭 못 올라가면 빈 칸으로 유지
            }
        } else {
            bridge.push(0); // 대기 트럭이 없으면 빈 칸
        }
    }

    return time;
}
