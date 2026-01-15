type PayrollProps = {
  id: number;
  folio: string;
  department: string;
  fortnight: string;
  paymentDate: Date;
  startDate: Date;
  endDate: Date;
  paidDays: number;
};

export class Payroll {
  private readonly props: PayrollProps;

  private constructor(props: PayrollProps) {
    this.props = props;
  }

  static create(props: PayrollProps): Payroll {
    if (props.paidDays <= 0) {
      throw new Error("paidDays must be greater than 0");
    }
    if (props.startDate > props.endDate) {
      throw new Error("startDate cannot be after endDate");
    }
    return new Payroll(props);
  }

  get id() {
    return this.props.id;
  }

  get folio() {
    return this.props.folio;
  }
  get department() {
    return this.props.department;
  }
  get fortnight() {
    return this.props.fortnight;
  }
  get paymentDate() {
    return this.props.paymentDate;
  }
  get startDate() {
    return this.props.startDate;
  }
  get endDate() {
    return this.props.endDate;
  }
  get paidDays() {
    return this.props.paidDays;
  }
}
