// payroll.mapper.ts
import { Payroll } from "./Payroll";
import type { PayrollDto } from "./PayrollDto";

export class PayrollMapper {
  static fromDto(dto: PayrollDto): Payroll {
    return Payroll.create({
      id: dto.id,
      folio: dto.folio,
      department: dto.department,
      fortnight: dto.fortnight,
      paymentDate: new Date(dto.payment_date),
      startDate: new Date(dto.start_date),
      endDate: new Date(dto.end_date),
      paidDays: dto.paid_days,
    });
  }
}
