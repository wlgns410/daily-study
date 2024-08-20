import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT
        u.id AS user_id,
        u.name,
        u.created_at AS user_created_at,
        u.updated_at AS user_updated_at,
        uq.id AS queue_id,
        uq.created_at AS queue_created_at
    FROM
        users u
    LEFT JOIN
        user_queues uq ON u.id = uq.user_id
    `,
})
export class UserQueueViewEntity {
  @ViewColumn()
  user_id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  user_created_at: Date;

  @ViewColumn()
  user_updated_at: Date;

  @ViewColumn()
  queue_id: number;

  @ViewColumn()
  queue_created_at: Date;
}
