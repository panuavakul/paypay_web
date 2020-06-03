abstract class DataModelBase {
  constructor({
    id,
    updatedAt,
    createdAt,
  }: {
    id: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    this.id = id;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  id: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export default DataModelBase;
