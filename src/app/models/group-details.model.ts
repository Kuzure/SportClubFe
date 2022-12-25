import { CoachList } from './coach-list-model';
import { ExerciseListModel } from './exercise-list-model';
export class GroupDetailsModel {
  id: string;
  name: string;
  competitorModels: Array<GroupDetailscompetitorModels>;
  coachListModels: Array<CoachList>;
  exerciseListModels: Array<ExerciseListModel>;
}
export class GroupDetailscompetitorModels {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  degree: string;
  isPaid: boolean;
  medicalExaminationExpiryDate: string;
}
