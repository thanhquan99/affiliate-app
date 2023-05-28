import BaseModel from './BaseModel';

export default class Role extends BaseModel {
  name: string;

  static get tableName() {
    return 'role';
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}
