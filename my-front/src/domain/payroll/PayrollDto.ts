// payroll.dto.ts
export type PayrollDto = {
  id: number;
  folio: string;
  department: string;
  fortnight: string;
  payment_date: string;
  start_date: string;
  end_date: string;
  paid_days: number;
};
