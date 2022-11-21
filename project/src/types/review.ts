import { ReviewUser } from './user';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: ReviewUser;
}
