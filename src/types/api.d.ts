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
