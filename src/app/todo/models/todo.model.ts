import { Category } from './category.model'
export interface Todo {
  id: string;
  title: string;
  body: string;
  state: number;
  category: Category;
}
