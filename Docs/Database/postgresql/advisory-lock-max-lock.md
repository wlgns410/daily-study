# 메모리 부족으로 인한 잠금 요청 거부

PostgreSQL은 **max_locks_per_transaction**와 **max_connections**라는 설정 변수를 통해 사용할 수 있는 잠금의 최대 수를 제한한다.  
따라서 잠금요청이 너무 많거나 max_connection을 적절하게 설정하지 않으면(왠만하면 기본값 쓰긴하지만) 메모리 풀의 공간이 부족해져서 새로운 Lock을 할 수 없다.  
메모리가 부족해져서 잠금 요청이 거부되는거라 두 트랜잭션이 race condition 상태가 되서 영원히 대기 상태가 되는 deadlock과는 다르다.

## psql의 데드락 처리

```
ERROR: deadlock detected
DETAIL: Process 12345 waits for ShareLock on transaction 9876; blocked by process 54321.
Process 54321 waits for ShareLock on transaction 12345; blocked by process 12345.
HINT: See server log for query details.
CONTEXT: SQL statement "UPDATE my_table SET ..."
```

1. PostgreSQL은 트랜잭션이 잠금을 대기하는 동안, 대기 시간이 지나면 해당 트랜잭션의 잠금 대기 상태를 조사한다.
2. 만약 두 개 이상의 트랜잭션이 서로의 자원에 대해 대기하고 있는 상태(데드락)라고 감지되면, PostgreSQL은 그 중 하나의 트랜잭션을 강제로 **중단(롤백)**시킨다.
3. 데드락 탐지기는 deadlock_timeout 설정 값에 의해 동작하며, 기본적으로 1초로 설정되어 있다. 이 시간 동안 잠금을 기다리다가 데드락이 감지되면 트랜잭션 중 하나를 중단한다.

- 참고로 aws rdbms psql은 데드락 설정이 안되어있어서 직접 추가해줘야함.

```
SET deadlock_timeout = '1s';
```

데드락 설정을 추가해준다.  
이 설정이 안되어있거나 너무 짧으면 데드락 감지가 제대로 이루어지지 않고 중단시키지도 못한다.  
또 다중 테이블 업데이트나 여러 테이블에 조인되어있다거나 무한 회귀문을 돌리고 있다거나 하면 자동으로 중단시키지 못한다.  
이럴 때는 cpu, memory 사용량을 보고 Noti 해줄 수 있는 파이프라인을 만들어놓고 deadlock timeout으로 중단되게 한다거나 수동으로 kill을 해줘야한다.

## 메모리 부족으로 인한 잠금 요청 거부

max_locks_per_transaction와 max_connections 설정 값을 늘려, 트랜잭션에서 더 많은 잠금을 사용할 수 있도록 메모리 풀 크기를 증가시키면 좋을 수도 있다.  
하지만 기본값으로 두는 것이 주니어 레벨에는 좋다.  
괜히 건들면 성능이 더 안좋아져서...

1. 트랜잭션 쪼개기
   트랜잭션에서 잠금을 최소화하는 방법으로 쿼리를 최적화하여, 잠금 충돌을 줄이는 방법이다.  
   한 트랜잭션이 너무 길어서 dead lock이 발생한다면, 트랜잭션을 잘게 쪼개는 방법이 있을 것이다.  
   즉, 단일 트랜잭션에 포함되는 작업을 최소화한다.  
   그리고 트랜잭션 안에서 해야하는 작업만 수행하고 트랜잭션이 필요없는 작업은 밖으로 빼내는 것이다.

2. 트랜잭션 순서 보장
   트랜잭션을 수행할 때, 항상 같은 순서로 잠그도록 설계하는 것이다.  
   테이블 a -> b -> c 이렇게 잠그게 설계하는 것이다.

---

요즘에는 msa가 대세이다보니 saga 패턴으로 분산 트랜잭션을 관리하는 것이 많이 보이는 듯하다.

### 참고

[msa saga pattern](https://microservices.io/patterns/data/saga.html)
[msa 분산 트랜잭션 관리](https://baebalja.tistory.com/622)
