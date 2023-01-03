import { CoachGroupList } from './coach-list-model';

export class ExerciseListModel {
  id: string;
  name: string;
  description: string;
  repetitions: number;
  groupExercises: Array<CoachGroupList>;
}
export class ExerciseModel {
  id: string;
  name: string;
  description: string;
  repetitions: number;
}
