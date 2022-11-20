export class GroupDetailsModel {
  id: string;
  name: string;
  competitorModels: Array<GroupDetailscompetitorModels>;
}
export class GroupDetailscompetitorModels {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  degree: string;
  is_Paid: boolean;
  medicalExaminationExpiryDate: string;
}
