interface PayrollData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  employeeData?: EmployeeData[];
}

interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  email: string;
  payrollId: string;
  cycleId: string;
  createdAt: any;
  updatedAt: any;
  salaryType: string;
  salaryAmount: number;
  salaryHourly: any;
}

interface Payroll {
  id: string;
  payrollName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PayrollCycle {
  id: string;
  payrollFrequencyId: string;
  cutDays: number[];
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  email: string;
  payroll: Payroll;
  payrollCycle: PayrollCycle;
  salaryType: SalaryType;
  paymentMethod: PaymentMethod;
  salaryAmount: number | null;
  salaryHourly: number | null;
  createdAt: string;
  updatedAt: string;
}

interface EmployeeResponse {
  content: Employee[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

interface EmployeeRequest {
  firstName: string;
  lastName: string;
  birthDate: Date | null; // ISO 8601 format date
  email: string;
  payrollId: string;
  cycleId: string; // UUID format
  salaryType: SalaryType;
  paymentMethod: PaymentMethod;
  salaryAmount: number;
  address: string;
}

enum PaymentMethod {
  BANK,
  INTERNATIONAL_TRANSFER,
  INTERNATIONAL_PLATFORM,
}

enum SalaryType {
  MONTHLY,
  HOURLY,
}

interface Payroll {
  id: string;
  payrollName: string;
  employeesCount: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
interface PayrollResponse {
  content: Payroll[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
interface PayrollDetailResponse {
  id: string;
  payrollName: string;
  description: string;
  payrollCycles: PayrollCycle[];
  createdAt: string;
  updatedAt: string;
}
