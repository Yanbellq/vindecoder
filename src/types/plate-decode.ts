export interface IPersonInfo {
	personType: string,
	registrationPlace: string,
	registrationPlaceId: string,
}

export interface ILastRecordInfo {
	operationName: string,
	departmentName: string,
	stateNumber: string,
	recordDate: string,
}

export interface IPlateDecode {
  number: string;
  yearIssued: string;
  bodyNumber: string;
  color: string;
  bodyType: string;
  ownWeight: string;
  totalWeight: string;
  fuelType: string;
  capacity: string;
  registrationDate: string;
  maker: string;
  model: string;
  logo?: string;
  categoryType?: string;
  region: string;

	personInfo: IPersonInfo;
	lastRecordInfo: ILastRecordInfo;
}
