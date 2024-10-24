# --runInBand과 --maxWorkers

## --runInBand 옵션

이 옵션은 Jest가 모든 테스트를 하나의 워커에서 순차적으로 실행한다.  
병렬로 테스트를 실행하지 않고, 테스트를 하나씩 실행하기 때문에 테스트 간에 동시 실행 문제가 발생하지 않게 된다.  
예를 들어, CPU 코어 수가 적거나 테스트 간 경합 문제(예: 데이터베이스 잠금 문제)를 해결하고 싶을 때 사용한다.

```
jest --runInBand  # Jest가 테스트를 순차적으로 실행
npm test -- --runInBand  # npm을 통해 Jest 테스트를 순차적으로 실행
```

## --maxWorkers=2 옵션:

이 옵션은 **최대 몇 개의 워커(worker)**를 사용해 병렬로 테스트를 실행할지를 설정한다.  
maxWorkers=2로 설정하면 최대 2개의 워커에서 병렬로 테스트를 실행하게 된다.  
기본적으로 Jest는 시스템의 논리적 CPU 코어 수에 따라 가능한 많은 워커를 사용하지만, 이 옵션을 사용해 병렬 실행 수를 제한할 수 있다.

```
jest --maxWorkers=2  # Jest가 최대 2개의 워커로 병렬로 테스트를 실행
npm test -- --maxWorkers=2  # npm을 통해 Jest 테스트를 최대 2개의 워커에서 병렬로 실행
```

참고로 깃헙 액션은 cpu = '2.00' 까지만 지원하니까 병렬로 실행되는 작업(worker)의 수는 2개로 제한된다.  
따라서 로컬환경에서는 사용할 수 있는 worker를 최대한 사용하므로 깃헙 액션과 테스트 속도가 다를 수 있다.
