import { QueryBuilder } from 'objection';
import { Injectable, NotFoundException } from '@nestjs/common';
import BaseModel from 'src/db/entities/BaseModel';
import { knex } from 'src/db/entities';

@Injectable()
export abstract class BaseServiceCRUD<T extends BaseModel> {
  private model;
  private modelName: string;

  constructor(model, modelName: string) {
    this.model = model;
    this.modelName = modelName;
  }

  async paginate(
    builder: QueryBuilder<BaseModel>,
    query,
  ): Promise<{ results: any[]; total: number }> {
    const { orderBy, perPage, page } = query;
    const resultsBuilder = builder.clone();
    const totalBuilder = knex.raw(
      `SELECT COUNT(*) 
      FROM (${builder.clone().clearSelect().toKnexQuery().toQuery()}) as temp
    `,
    );

    if (orderBy) {
      for (const field in orderBy) {
        resultsBuilder.orderBy(field, orderBy[field]);
      }
    }
    resultsBuilder.limit(perPage).offset((page - 1) * perPage);

    const [
      results,
      {
        rows: [{ count: total }],
      },
    ] = await Promise.all([resultsBuilder, totalBuilder]);
    return { results, total: Number(total) };
  }

  async getMany(query): Promise<{ results: T[]; total }> {
    const builder = this.model.queryBuilder(query);
    return await this.paginate(builder, query);
  }

  async getOne(id: string): Promise<T> {
    const object = await this.model.query().findById(id);
    if (!object) {
      throw new NotFoundException(`${this.modelName} not found`);
    }

    return object;
  }

  async createOne(payload) {
    return await this.model.query().insertGraphAndFetch(payload);
  }

  async updateOne(id: string, payload): Promise<T> {
    const object = await this.model.query().updateAndFetchById(id, payload);
    if (!object) {
      throw new NotFoundException(`${this.modelName} not found`);
    }

    return object;
  }

  async deleteOne(id): Promise<{ message: string }> {
    await this.model.query().deleteById(id);
    return { message: 'Delete successfully' };
  }
}
