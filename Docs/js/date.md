# date와 dayjs

## new Date()

new Date()는 현재 날짜와 시간을 포함하는 Date 객체를 생성한다.  
new Date().toISOString()은 UTC 기준으로 ISO 8601 형식의 날짜 문자열을 반환한다.

new Date(): 현재 시스템 시간에 따른 날짜와 시간 출력 (예: Fri Nov 15 2024 19:13:25 GMT+0900)  
new Date().toISOString(): UTC 기준의 날짜와 시간 출력 (예: 2024-11-15T10:13:25.000Z)

그래서 -9 시간 된 utc 시간을 리턴한다. 이건 kst 시간이 아니라서 날짜 조건 조회시 문제를 일으킬 수 있다.  
new Date().toISOString()을 사용하면 날짜가 UTC 기준으로만 출력되며, 결과는 ISO 8601 형식의 문자열(YYYY-MM-DDTHH:mm:ss.sssZ)이다.  
toISOString()을 사용해 YYYYMMDD 형식으로 변환하려면, 추가적으로 -9를 수작업으로 빼줘야한다.

## dayjs().format('YYYYMMDD')

dayjs 라이브러리를 사용하여 현재 날짜를 특정 형식(예: YYYYMMDD)으로 변환한다.  
기본적으로 시스템의 로컬 시간을 기준으로 날짜를 출력하며, .utc()를 사용하면 UTC 기준으로 변환한다.

dayjs().format('YYYYMMDD'): 로컬 기준의 날짜 (예: 20241115)  
dayjs().utc().format('YYYYMMDD'): UTC 기준의 날짜 (예: 20241114)

로컬 시간대와 UTC 시간대가 다르기 때문에 **한국 시간(KST, UTC+9)**에서는 dayjs().utc()를 사용하면 하루 전 날짜가 나올 수 있다는 점을 알고 있어야한다.

### 코드 시간대 비교

| 코드                             | 시간대 | 예시                              |
| -------------------------------- | ------ | --------------------------------- |
| new Date()                       | 로컬   | Fri Nov 15 2024 19:13:25 GMT+0900 |
| new Date().toISOString()         | UTC    | 2024-11-15T10:13:25.000Z          |
| dayjs().format('YYYYMMDD')       | 로컬   | 20241115                          |
| dayjs().utc().format('YYYYMMDD') | UTC    | 20241114                          |
