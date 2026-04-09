type Permission = {
  name: string;
  codename: string;
};

type Group = {
  name: string;
  permissions?: Permission[];
};

type Reviewer = {
  id: number;
  name: string;
};

type ReviewerAssignment = {
  id?: number;
  user: string;
  application: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  requiredGroups?: Group[];
  items?: NavItem[];
};

type User = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  other_names?: string;
  username: string;
  profile_pic?: string;
  phone: string;
  alternative_phone_number?: string;
  is_active?: boolean;
  is_staff?: boolean;
  password: string;
  re_password: string;
  employee?: number;
  groups?: Group[];
};

type LoginUser = {
  username: string;
  password: string;
};
type UserEmail = {
  email: string;
};

interface Option {
  value: string;
  label: string;
}

interface MenuItem {
  name: string;
  href: string;
  current?: boolean;
}

interface MenuDropdownProps {
  item: {
    name: string;
    children: MenuItem[];
  };
}

type InstitutionForm = {
  email: string;
  alternative_email: string;
  username: string;
  phone: string;
  alternative_phone_number: string;
  password: string;
  re_password: string;
  name: string;
  district: string;
  institution_type: string;
  landline: string;
  contact_person: string;
  contact_person_phone: string;
  alternative_contact_person: string;
  alternative_contact_person_phone: string;
  logo: string | File;
};

type Institution = {
  id?: number;
  name: string;
  acroynm: string;
  postal_address: string;
  website: string;
  landline: string;
  region: string;
  district: string;
  alternative_email: string;
  institution_type: string;
  landline: string;
  phone?: string;
  contact_person: string;
  contact_person_phone: string;
  alternative_contact_person: string;
  alternative_contact_person_phone: string;
  logo: string | File;
  location?: string;
};
type InstitutionRegForm = {
  email: string;
  username: string;
  phone: string;
  alternative_phone_number: string;
  password: string;
  re_password: string;
  institution: institution;
};

interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
}

interface ListRespornse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
interface Region {
  id: number;
  name: string;
  code: string;
}

interface District {
  id: number;
  name: string;
  code: string;
}

interface IntrimAuthority {
  id?: number;
  application_code?: string;
  has_title_deed: boolean;
  title_deed?: string | File;
  names_of_promoters: string;
  vision: string;
  mission: string;
  objectives: string;
  philosophy: string;
  governance_structure: string;
  human_resources: string;
  source_of_finance: string;
  action_plan: string;
  infrastructure: string;
  programmes: string;
  status?:
    | "pending"
    | "approved"
    | "rejected"
    | "draft"
    | "submitted"
    | "pending";
  institution?: string;
  application_date?: string;
  promoters?: string | File;
  project_proposal?: string | File;
}

interface UniversityProvisionalLicense {
  id?: number;
  application_code?: string;
  institution: string;
  amount_of_land: number;
  land_title: string | File;
  land_in_use: number;
  land_for_future_use: number | null;
  year_obtained: string;
  leased_or_rented: string;
  lease_or_rent_agreement: string | File | null;
  classrooms: number | null;
  libraries: number | null;
  science_labs: number | null;
  computer_labs: number | null;
  staff_houses: number | null;
  administrative_staff_area: number | null;
  area_for_staff_use: number | null;
  administrative_block_area: number | null;
  student_welfare_offices: number | null;
  sick_bay_area: number | null;
  hostels_area: number | null;
  meeting_hall_area: number | null;
  master_plan: string | File | null;
  area_of_playground: number | null;
  available_playgrounds: string | null;

  area_of_empty_space: number | null;
  total_roads_mileage: number | null;
  water_source: string | null;
  power_source: string | null;
  has_cultivable_land: boolean | null;
  cultivable_land: number | null;

  library_books: number | null;
  text_books: number | null;
  publication_years: string[] | null;
  computers_in_use: number | null;
  computers_in_library: number | null;
  academic_staff_computers: number | null;
  administrative_staff_computers: number | null;
  library_computer_software: string;

  students_have_access: boolean | null;
  has_internet_access: boolean | null;
  library_seats: number | null;
  classroom_seats: number | null;
  laboratories_seats: number | null;
  administration_block_seats: number | null;
  student_facilities: string | null;
  intended_full_time_academic_staff: number | null;
  intended_part_time_academic_staff: number | null;

  intended_full_time_admin_staff: number | null;
  intended_support_staff: number | null;

  council_members: string | null;
  proposed_chancellor: string | null;
  proposed_vice_chancellor: string | null;
  proposed_university_secretary: string | null;
  proposed_academic_registrar: string | null;
  heads_of_faculties: string | null;

  institution_ownership: string | null;
  university_promoters: string | null;

  other_assets: string | null;
  annual_budget: number | null;
  fee_structure: File | null;
  fees_percent_budget: number | null;
  other_income_sources: string | null;

  infrastructure_development: number | null;
  research_development: number | null;
  computer_hardware_software: number | null;
  science_lab_equipment: number | null;
  library_equipment: number | null;
  staff_development: number | null;
  staff_salaries: number | null;
  current_bankers: string | null;

  vision: string | null;
  mission: string | null;
  specific_objectives: string | null;
  stractegic_plan: File | null;
  programmes: File | null;
  area_of_competence: string | null;
  feature_programmes: string | null;

  total_number_of_students: number | null;

  arts_percentage: number | null;
  social_sciences_percentage: number | null;
  basic_sciences_percentage: number | null;
  arts_education_percentage: number | null;
  science_education_percentage: number | null;
  agriculture_percentage: number | null;
  medicine_percentage: number | null;
  veterinary_percentage: number | null;
  engineering_percentage: number | null;
  technology_percentage: number | null;

  signatures: File | null;
  member_cvs: File | null;
  finance_control: File | null;
  detailed_programmes: File | null;
  physical_education_facilities: File | null;
  status: string | null;
  application_date?: Date;
  number_of_vehicles?: number | null;
  vehicle_registration?: string | null;
}

interface CharterApplication {
  id?: string;
  application_code?: string;
  has_provisional_license: boolean;
  land_title: File | null;
  provisional_license: string | File;
  lease_or_rent_agreement: File | null;
  provisional_license_issue_date?: string;
  amount_of_land_owned: string;
  land_in_use: string;
  land_for_future_use: string;
  year_obtained: string;
  leased_or_rented: boolean;
  classrooms: number;
  libraries: number;
  science_labs: number;
  computer_labs: number;
  staff_houses: number;
  areadministrative_staff_area: number;
  area_for_staff_use: number;
  administrative_block_area: number;
  student_Welfare_offices: number;
  sick_bay_area: number;
  hostels_area: number;
  meeting_hall_area: number;
  area_of_playground: number;
  available_playgrounds: string;
  area_of_empty_space: number;
  total_roads_mileage: string;
  water_source: string;
  power_source: string;
  has_cultivable_land: true;
  cultivable_land: number;
  library_books: number;
  text_books: number;
  computers_in_use: number;
  computers_in_library: number;
  academic_staff_computers: number;
  administrative_staff_computers: number;
  library_computer_software: number;
  students_have_access: true;
  has_internet_access: true;
  library_seats: number;
  classroom_seats: number;
  laboratories_seats: number;
  administration_block_seats: number;
  student_facilities: string;
  full_time_academic_staff: number;
  intended_full_time_academic_staff: number;
  intended_part_time_academic_staff: number;
  phd_holders: number;
  masters_holders: number;
  bachelor_holders: number;
  diploma_holders: number;
  average_staff_student_ratio: number;
  staff_overload: number;
  administrative_staff: number;
  support_staff: number;
  chancellor: string;
  vice_chancellor: string;
  university_secretary: string;
  academic_registrar: string;
  vice_registrar: string;
  ownership: string;
  other_assets: string;
  annual_budget: string;
  fees_percentage: string;
  other_income_source: string;
  infrastructure_budget: string;
  research_budget: string;
  computer_budget: string;
  science_labs_budget: string;
  staff_development_budget: string;
  library_budget: string;
  staff_salary_budget: string;
  current_bankers: string;
  vision: string;
  mission: string;
  specific_objectives: string;
  total_students: number;
  arts_students: number;
  social_science_students: number;
  basic_science_students: number;
  arts_education_students: number;
  agriculture_students: number;
  medicine_students: number;
  veterinary_students: number;
  engineering_students: number;
  other_students_numbers: string;
  eastern_region: number;
  central_region: number;
  northern_region: number;
  western_region: number;
  eastern_africans: number;
  other_regions: number;
  institution: string;
  publication_years: string[];
  status: string | null;
}

interface ProgrammeAccreditation {
  id?: number;
  application_number?: string;
  application_type: string;
  program_level: string;
  program_name: string;
  duration_semester: number;
  campus: string;
  date_submitted?: string;
  status?: string;
  program_structure: File | string;
  letter_of_submission: File | string;
  institution?: string;
  employee?: number;
  assessment?: ProgrammeAssessment;
  preliminary_review?: PreliminaryReview;
  pod_comment?: string;
  director_comment?: string;
}

interface PreliminaryReview {
  id?: number;
  reviewer?: string;
  application?: string;
  type_of_entry_summary?: string;
  type_of_entry_comments?: string;
  entry_requirements_summary?: string;
  entry_requirements_comments?: string;
  human_resource_summary?: string;
  human_resource_comments?: string;
  facilities_summary?: string;
  facilities_comments?: string;
  programme_duration_summary?: string;
  programme_duration_comments?: string;
  minimum_graduation_load_summary?: string;
  minimum_graduation_load_comments?: string;
  day_students?: number;
  evening_students?: number;
  weekend_students?: number;
  student_comment?: string;
  expert_progression?: string;
  reviewed_at?: string;
  reviewer_name?: string;
  application_number?: string;
  review_date?: string;
  programme?: string;
  institution?: string;
  student_total?: number;
}
interface ProgrammeAssessment {
  id?: number;
  assessor?: string;
  application?: string;
  programme_development_process: string;
  rationale: string;
  programme_objectives: string;
  competences: string;
  learning_outcomes: string;
  entry_requirements: string;
  duration: string;
  grading_system: string;
  curriculum_structure: string;
  staffing_levels: string;
  infrastructure: string;
  cbe_allignment: string;
  other_comments: string;
  course_name: string;
  course_code: string;
  course_level: string;
  contact_hours: string;
  credit_units: string;
  course_description: string;
  course_objectives: string;
  course_learning_outcomes: string;
  detailed_course_content: string;
  instructional_materials: string;
  delivery_modes: string;
  assessment_modes: string;
  reading_list: string;
  writing_styles_and_grammar: string;
  minimum_standards: string;
  institution_comments: string;
  nche_comments: string;
  conclusions: string;
  recommendation: string;
  assessment_date?: string;
  application_number?: string;
  programme?: string;
  institution?: string;
  assessor_name?: string;
  pod_comment?: string;
  status?: string;
}

interface Employee {
  id?: number;
  employee_number: string;
  date_of_birth: string;
  gender: "male" | "female";
  joining_date: string;
  distance_from_work: number;
  address: string;
  directorate: string;
  address_of_origin: string;
  marital_status: string;
  spouse_name: string;
  next_of_kin_name: string;
  next_of_kin_relationship: string;
  next_of_kin_date_of_birth: string;
  occupation: string;
  work_place: string;
  next_of_kin_phone_number: string;
  next_of_kin_address: string;
  next_of_kin_email: string;
  contact_person_name: string;
  contact_person_relationship: string;
  contact_person_telephone: string;
  contact_person_email: string;
  contact_person_address: string;
  blood_group: string;
  allergies: string;
  father_name: string;
  father_status: string;
  father_contact: string;
  mother_name: string;
  mother_status: string;
  mother_contact: string;
  nin: string;
  national_id_document: string;
  passport_photo: string;
  license_number: string | null;
  class_of_license: string | null;
  date_of_issue: string | null;
  date_of_expiry: string | null;
  license_document: string;
  passport_number: string;
  passport_type: string;
  issue_date: string;
  expiry_date: string;
  place_of_issue: string;
  nssf_number: string;
  tin_number: string;
  bank_name: string;
  branch: string;
  account_name: string;
  account_number: string;
  account_type: string | null;
  signature: string | null;
  system_account: string;
  department: string;
  designation: string;
  title: string;
  nationality: string;
  religion: string;
  tribe: string;
  supervisor: string;
  district: string;
  county: string;
  sub_county: string;
  parish: string;
  village: string;
  district_of_origin: string;
  county_of_origin: string;
  sub_county_of_origin: string;
  parish_of_origin: string;
  village_of_origin: string;
  education_histories: EducationHistory[];
  work_histories: WorkHistory[];
  referees: Referee[];
  dependents: Dependent[];
}

interface WorkHistory {
  id?: number;
  employer: string;
  position: string;
  from_date: string;
  to_date: string;
  responsibilities: string;
  employee?: number;
}
interface EducationHistory {
  id?: number;
  institution: string;
  qualification: string;
  from_year: number;
  to_year: number;
  award_date: string;
  employee?: number;
  certificate_document?: string;
}

interface Referee {
  id?: number;
  name: string;
  place_of_work: string;
  position: string;
  telephone: string;
  email: string;
  employee?: number;
}
interface Dependent {
  id?: number;
  name: string;
  relationship: string;
  date_of_birth: string;
  employee?: number;
  gender?: string;
}

interface LeaveType {
  id?: number;
  code: string;
  name: string;
  max_days: number;
  exclude_weekends: boolean;
  gender_restriction: "both" | "male" | "female";
  is_paid: boolean;
}

interface LeaveSchedule {
  id?: number;
  leave_type: string;
  leave_days: number;
  start_date: string;
  end_date: string;
}

interface LeaveApplication {
  id?: number;
  employee?: string;
  leave_type: string;
  leave_days: number;
  start_date: string;
  end_date: string;
  return_date?: string;
  reason?: string;
  delegated_to?: string;
  supervisor?: string;
  status?: string;
  delegation_accepted?: boolean;
  delegation_acceptance_date?: string;
  delegatee_remarks?: string;
  supervisor_approved?: boolean;
  supervisor_comments?: string;
  director_comments?: string;
  director_approved?: boolean;
  application_date?: string;
  hr_approved?: boolean;
  hr_comments?: string;
}

interface EmployeeDropdown {
  id: number;
  full_name: string;
}

type Role = "reviewer" | "applicant";

interface ChatMessage {
  id?: number | string;
  role: Role;
  text: string;
  application: number;
  reviewer?: number;
  reviewer_name?: string;
  applicant_name?: string;
  created_at?: string;
}

interface PaymentPRN {
  id: number;
  amount: number;
  assessmentDate: string;
  paymentType: string;
  referenceNo: string;
  tin: string;
  srcSystem: string;
  taxHead: string;
  taxSubHead: string;
  email: string;
  taxPayerName: string;
  plot: string;
  buildingName: string;
  street: string;
  tradeCentre: string;
  district: string;
  county: string;
  subCounty: string;
  parish: string;
  village: string;
  localCouncil: string;
  contactNo: string;
  paymentPeriod: string;
  expiryDays: string;
  mobileMoneyNumber: string;
  mobileNo: string;
  expiryDate: string | null;
  statusCode: string;
  statusDesc: string;
  searchCode: string;
  prn: string;
  prn_reconciled: string;
}
