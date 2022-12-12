export class CoachList {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: number;
  degree: number;
  coachClass: string;
  coachGroups: Array<CoachGroupList>;
}
export class CoachGroupList {
  groupId: string;
  groupName: string;
}
export class CoachUpdate {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  coachClass: number;
}
