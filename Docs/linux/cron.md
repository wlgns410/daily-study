# cronjob과 connection pool error

코드에서 크론 잡을 여러 개 돌릴 때 각 작업이 동시에 실행되어, 동시에 여러 개의 데이터베이스 연결을 생성하려고 하게 되어서 커넥션 풀의 최대 연결 수를 초과해 커넥션 풀 에러가 발생했다.

데이터베이스 연결을 설정할 때 일반적으로 커넥션 풀 크기를 제한하는데, 이 숫자가 초과되면 연결이 차단되거나 **Connection pool error**가 발생하게 된다.

sequlize는 기본적으로 5개의 max connection pool을 가지고 있다고 한다.

## 기존

```
const job1 = new CronJob(
  '*/30 * * * * *', // 30초마다 실행
  async () => {
    await this.actions.purchaseOrderSync({});
  },
  null,
  true,
  'Asia/Seoul'
);

const job2 = new CronJob(
  '*/30 * * * * *',
  async () => {
    await this.actions.importOrderItemListSync({});
  },
  null,
  true,
  'Asia/Seoul'
);

// 동일한 방식으로 job3, job4, job5, job6 생성...

```

이런 식으로 6개의 크론잡이 동시에 실행되고 있었다.

여기서 job1부터 job6까지가 30초마다 독립적으로 실행되기 때문에, 데이터베이스에 동시에 여러 개의 연결 요청이 발생하게 된다.  
커넥션 풀에서 한 번에 사용할 수 있는 연결 수가 한정되어 있기 때문에, 많은 연결이 동시에 요청될 경우 커넥션 풀의 크기를 초과하면서 연결 에러가 발생해 connection pool error가 발생했습니다.

## 해결

```
started() {
    if (process.env.NAMESPACE === 'MIRAE') {
      purchaseOrderJob = new CronJob(
        '*/30 * * * * *', // 30초마다 실행
        async () => {
          await this.actions.purchaseOrderSync({});
          await this.actions.importOrderItemListSync({});
        },
        null,
        true,
        'Asia/Seoul'
      );

      erpLocalWorkOrderJob = new CronJob(
        '*/30 * * * * *',
        async () => {
          await this.actions.erpWorkOrder({});
          await this.actions.erpWorkReport({});
        },
        null,
        true,
        'Asia/Seoul'
      );

      erpOursourceWorkOrderJob = new CronJob(
        '*/30 * * * * *',
        async () => {
          await this.actions.erpOutsourcingWorkOrder({});
          await this.actions.erpOutsourcingReport({});
        },
        null,
        true,
        'Asia/Seoul'
      );
    }
  }

```

6개의 크론잡을 비슷한 액션으로 묶고, 각 크론잡을 동시에 실행하게 합니다.  
이렇게 하면, 내부 작업이 비슷한 액션은 내부에서 순차적으로 실행되고, 외부에서 동시에 실행되도 되는 액션은 동시에 실행되게 되므로 데이터베이스 락이 걸릴 상황이 줄어들게 됩니다.
