export enum Order {
  DESC = 'DESC',
  ASC = 'ASC',
}

export type QueryType = {
  take: number;
  skip: number;
  keyword: string;
  order: Order.ASC;
};

export const defaultQuery = {
  take: 10,
  skip: 0,
  keyword: '',
};

export const initQuery = (query: QueryType): QueryType => {
  const take = query.take || defaultQuery.take;
  const skip = query.skip || defaultQuery.skip;
  const keyword = query.keyword || defaultQuery.keyword;
  const order = Order.ASC;

  return {
    take,
    skip,
    keyword,
    order,
  };
};
