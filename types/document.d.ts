export type Document = {
  id: string;
  dos: string;
  template: string;
  client: {
    id: string;
    name: string;
  }
  dob: string;
  service: string;
  duration: string;
  placeOfService: string;
  staff: string;
  dx: string;
  status: string;
  payer: string;
  unit: string;
  serviceRate: string;
  totalBill: string;
  datePaid: string;
  lastBill: string;
  payStatus: string;
}