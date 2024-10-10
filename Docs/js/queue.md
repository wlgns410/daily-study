# 큐 자료구조

배열을 이용한 큐의 기본 동작은 shift와 push를 활용한다.
간단하게 선입선출의 구조로 구현하면 된다.

```
class Queue {
    constructor(){
        this.items = []
    }

    enqueue(elem) {
        this.items.push(elem)
    }

    deque() {
        if (this.isEmpty()){
            return
        }
        return this.items[0]
    }

    isEmpty() {
        return this.items.length === 0
    }
}
```

```
const q = new Queue()

q.enqueue(1)
q.enqueue(2)
q.enqueue(3)

num = q.dequeue()
console.log(num) // 1

```
