import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SaveOptions,
} from 'typeorm';

export class AbstractService<T> {
  protected _model: Repository<T>;

  constructor(model: Repository<T>) {
    this._model = model;
  }

  public async find(filter: FindManyOptions<T> = {}): Promise<T[]> {
    return this._model.find(filter);
  }

  public async findById(id: number): Promise<T> {
    return this._model.findOne({ where: { id } } as FindOneOptions);
  }

  public async findOne(options: FindOneOptions<T> = {}): Promise<T> {
    return this._model.findOne(options);
  }

  public async create(
    doc: DeepPartial<T>,
    options: SaveOptions = {},
  ): Promise<T> {
    return this._model.save(doc, options);
  }
}
