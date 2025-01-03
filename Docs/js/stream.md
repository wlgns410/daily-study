# stream 처리

스트림 방식은 데이터를 한 번에 전부 메모리에 올리지 않고, 작은 청크(chunk) 단위로 처리합니다.  
즉, 데이터를 읽고 처리하는 작업이 동시에 진행되며, 처리된 데이터는 즉시 내려놓아 메모리 사용량을 줄인다.  
그래서 대용량 파일을 처리할 때 유용하고, 네트워크 통신이 불안정한 상황에서도 유용하다.

## 장점

- 데이터가 도착하면 바로 처리하고 다음 작업으로 넘어감.
- 메모리에 모든 데이터를 올리지 않아도 됨.
- 데이터를 처리하는 속도가 네트워크 I/O 또는 CPU 처리 속도에 의존.

## 성능이 떨어지는 상황(cpu나 메모리가 작은경우나 네트워크가 불안정한 경우)

```
	1.메모리 사용 최소화
	•	스트림 방식은 한 번에 작은 단위의 데이터만 메모리에 적재하므로, 메모리 부족으로 인해 작업이 중단되거나 느려지는 위험을 최소화함
	•	특히, 대량의 데이터를 처리할 때 메모리가 부족하지 않으므로 안정적으로 작동함
	2.	처리 속도와 병렬 작업 분리
	•	스트림은 데이터를 읽는 작업과 처리하는 작업을 분리하여, 처리 속도가 느려도 데이터를 계속 읽어올 수 있음
	•	네트워크 속도와 데이터 처리 속도가 일치하지 않아도 작업이 쌓이지 않고 안정적으로 진행함
	3.	I/O 성능 병목 최소화
	•	데이터를 한꺼번에 가져오지 않고, 필요한 만큼만 가져오는 특성 덕분에 디스크나 네트워크 I/O에 부하를 적게 줌
	•	이는 CPU 성능이 낮더라도 I/O 병목을 줄이는 데 효과적임
	4.	Backpressure 처리
	•	스트림 방식은 Backpressure 메커니즘을 활용해 데이터를 처리 속도에 맞춰 조정함
	•	처리 속도가 느려지면 데이터 전송량이 자동으로 줄어드는 등 부하를 조정할 수 있음
```

## 결론

스트림 방식은 메모리 사용량을 최소화하고, 작업 부하를 효율적으로 분산하며, I/O 성능 병목을 완화하기 때문에 성능이 낮은 상황에서도 안정적으로 작동할 수 있기 때문에 스트림 방식을 추천한다고 합니다.
