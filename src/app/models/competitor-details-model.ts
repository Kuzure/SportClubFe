export class CompetitorDetailModel {
  identityData: IdentityData;
  competitorData: CompetitorData;
  groupData: GroupData;
}
export class IdentityData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  degree: string;
}
export class CompetitorData {
  isPaid: boolean;
  medicalExaminationExpiryDate: string;
  id: string;
}
export class GroupData {
  groupName: string;
  groupId: string;
}
