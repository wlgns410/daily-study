# Swap Usage

**Swap 사용량(Swap usage)**는 로컬 환경, macOS, AWS RDS를 포함한 모든 운영 체제에서 발생할 수 있는 현상이다.  
Swap은 운영 체제의 기능이기 때문에, 특정 환경에만 국한된 것이 아니다.  
메모리 부족 상황에서 운영 체제는 **물리적 메모리(RAM)**가 부족할 때 디스크를 가상 메모리처럼 사용해서 발생하는데 이를 `swap usage`라고 한다.

## macos 경우

macOS에서는 메모리 상태를 활성 메모리와 가상 메모리로 구분하여 관리한다.  
메모리가 부족할 경우, macOS는 일부 데이터를 디스크로 이동시켜 메모리를 확보하게 된다.

## 원인

- 메모리 부족: 시스템에서 실행 중인 애플리케이션들이 사용 가능한 RAM보다 더 많은 메모리를 요구할 때 발생
- 메모리 집중 애플리케이션 실행: 메모리를 많이 사용하는 애플리케이션(예: 대형 데이터베이스, 가상 머신 등)을 로컬 환경이나 클라우드 환경에서 실행할 때 발생
- 잘못된 메모리 관리: 메모리 누수가 있거나 비효율적인 메모리 사용으로 인해 시스템이 Swap을 자주 사용하게 되는 경우에도 발생

## 해결방법

- 메모리 업그레이드: 물리적 메모리(RAM)를 늘리거나, 더 많은 메모리를 가진 인스턴스로 스케일 업 한다.
- 메모리 최적화: 메모리 사용량이 많은 애플리케이션을 최적화하거나, 불필요한 프로세스를 종료한다.
- 쿼리 최적화: 특히 데이터베이스 환경에서는 쿼리를 최적화하면 메모리 사용을 줄일 수 있게 된다.

## swap usage 확인 명령어

```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:           15Gi       11Gi       2.0Gi       500Mi       2.0Gi       3.0Gi
Swap:          2.0Gi       1.5Gi       500Mi


```

free -h는 시스템의 전체 메모리 상태를 보여주며, Swap 사용량은 그 중 일부로 표시된다.

```
$ swapon -s
Filename				Type		Size	Used	Priority
/dev/sda5                               partition	2097148	524288	-2
```

현재 활성화된 Swap 영역을 확인할 수 있는 명령어이며, swap된 size, 공간, swap의 우선 순위도 알려준다.

```
$ vmstat
procs -----------memory---------- ---swap-- -----io---- -system-- ----cpu----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa
 1  0      0 1210000   3000  51000    0    0    50    30   20   60  3  1 95  1

```

swpd: 현재 사용 중인 Swap 공간(단위: KB)
si: Swap에서 디스크로 읽는 양
so: Swap으로 쓰는 양

vmstat는 Swap 입출력(IO)까지 포함한 더 세부적인 정보를 제공한다.

## psql에서 swap이 중요한 이유

1. 성능 저하

PostgreSQL은 복잡한 쿼리와 인덱스 작업을 많이 수행하는데, 이런 작업이 메모리를 많이 사용하게 되면 Swap으로 인해 디스크 IO 성능에 큰 영향을 받게 된다.  
또한 데이터베이스 트랜잭션에서 메모리 대역폭이 중요하므로, Swap이 빈번하게 사용되는 경우 쿼리 성능이 매우 나빠질 수 있다.