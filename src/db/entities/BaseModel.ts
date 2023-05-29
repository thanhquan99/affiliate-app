import { QueryBuilder } from 'objection';
import { buildFilter } from 'objection-filter';
import { Model } from './config';

export default class BaseModel extends Model {
  count?: string;
  sum?: string;
  min?: number;
  max?: number;
  avg?: number;

  id: string;
  created_at: number;
  updated_at: number;

  static queryBuilder<T extends BaseModel>(
    query,
    trx = undefined,
  ): QueryBuilder<T, T[]> {
    const options = {
      operators: {
        $ilike: (property, operand, builder) =>
          builder.whereRaw(`?? ILIKE $$%${operand}%$$`, [property]),
      },
    };

    const builder = buildFilter(this, trx, options).build({
      where: query.filter || {},
    });
    return builder as any as QueryBuilder<T, T[]>;
  }

  $beforeInsert() {
    this.created_at = Math.round(new Date().getTime() / 1000);
    this.updated_at = Math.round(new Date().getTime() / 1000);
  }

  $beforeUpdate() {
    this.updated_at = Math.round(new Date().getTime() / 1000);
  }
}

export type ModelFields<T extends Model, K extends Model = Model> = Partial<
  Omit<Partial<T>, keyof Required<K>>
>;
