import { EntityManager } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RefreshMaterializedViewService {
  constructor(
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {}

  async refresh(viewName: string) {
    await this.entityManager.query(`REFRESH MATERIALIZED VIEW ${viewName}`);
  }
}

export function RefreshMaterializedView(viewName: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Dependency Injection을 사용하여 RefreshMaterializedViewService 인스턴스 가져오기
      const refreshService =
        target.refreshService as RefreshMaterializedViewService;
      if (!refreshService) {
        throw new Error('RefreshMaterializedViewService not found');
      }

      // 원래 메서드를 실행하여 결과를 얻음
      const result = await originalMethod.apply(this, args);

      // Materialized View 리프레시
      await refreshService.refresh(viewName);

      // 메서드의 결과를 반환
      return result;
    };

    return descriptor;
  };
}
