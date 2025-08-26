export type NewBilling = {
  id: string;
  client: {
    id: string;
    name: string;
  }
  dos: string;
  clientDob: string;
  insurance: string;
  template: string;
  staff: string;
  staffNpi: string;
  site: string;
  serviceCode: string;
  units: number;
  rate: number;
  toBill: boolean;
  status: string;
}

export type BillingSubmission = {
  id: string;
  claims: number;
  lines: number;
  totalBilled: number;
  subDate: string;
  payer: string;
  site: string;
  status: string;
  res: string;
}

export type BillingRemittance = {
  controlNumber: string;
  batchId: string;
  payerName: string;
  processDate: string;
  paymentDate: string;
  amountBilled: number;
  diff: number;
  percentReceived: number;
  paymentMethod: string;
  adjAmount: number;
  adjCode: string;
  numberOfCodes: number;
  numberOfServiceLines: number;
}

export type BillingClaim = {
  claimControlNumber: string;
  controlNumber: string;
  memberName: string;
  paymentDate: string;
  serviceDate: string;
  payerControlNumber: string;
  payerName: string;
  policyNumber: string;
  amountBilled: number;
  amountPaid: number;
  patientResponsibility: number;
  diff: number;
  numberOfServiceLines: number;
  status: string;
  worked: boolean;
}