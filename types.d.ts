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

interface ListResponse<T> {
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
interface Title {
  id: number;
  name: string;
}
interface Relationship {
  id: number;
  name: string;
}

interface District {
  id: number;
  name: string;
  code: string;
}

interface InterimAuthority {
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
  leased_or_rented: string;
  classrooms: number;
  libraries: number;
  science_labs: number;
  computer_labs: number;
  staff_houses: number;
  administrative_staff_area: number;
  area_for_staff_use: number;
  administrative_block_area: number;
  student_welfare_offices: number;
  sick_bay_area: number;
  hostels_area: number;
  meeting_hall_area: number;
  master_plan: File | null;
  area_of_playground: number;
  available_playgrounds: string;
  area_of_empty_space: number;
  total_roads_mileage: number;
  water_source: string;
  power_source: string;
  has_cultivable_land: true;
  cultivable_land: number;
  number_of_vehicles: number;
  vehicle_registration: string;
  library_books: number;
  text_books: number;
  computers_in_use: number;
  computers_in_library: number;
  academic_staff_computers: number;
  administrative_staff_computers: number;
  library_computer_software: string;
  students_have_access: true;
  has_internet_access: true;
  library_seats: number;
  classroom_seats: number;
  laboratories_seats: number;
  administration_block_seats: number;
  student_facilities: string;
  full_time_academic_staff: number;
  full_time_academic_staff_qualifications: File | null;
  part_time_academic_staff: number;
  intended_full_time_academic_staff: number;
  part_time_academic_staff_qualifications: File | null;
  phd_holders: number;
  phd_holder_discipline: File | null;
  masters_holders: number;
  masters_holders_discipline: File | null;
  bachelor_holders: number;
  bachelor_holders_discipline: File | null;
  diploma_holders: number;
  diploma_holders_discipline: File | null;
  average_staff_student_ratio: string;
  staff_overload: number;
  administrative_staff: number;
  programme_staff_student_ratio: File | null;
  support_staff: number;
  chancellor: string;
  vice_chancellor: string;
  university_secretary: string;
  academic_registrar: string;
  vice_registrar: string;
  ownership: string;
  other_assets: string;
  annual_budget: number;
  fees_percentage: number;
  other_income_source: string;
  infrastructure_budget: number;
  research_budget: number;
  computer_budget: number;
  science_labs_budget: number;
  staff_development_budget: number;
  library_budget: number;
  staff_salary_budget: number;
  current_bankers: string;
  vision: string;
  mission: string;
  specific_objectives: string;
  total_students: number;
  arts_students: number;
  social_science_students: number;
  basic_science_students: number;
  arts_education_students: number;
  science_education_students: number;
  agriculture_students: number;
  medicine_students: number;
  veterinary_students: number;
  engineering_students: number;
  other_students_numbers: string;
  eastern_region: number;
  central_region: number;
  northern_region: number;
  western_region: number;
  east_africans: number;
  other_regions: number;
  institution: string;
  publication_years: string[];
  status: string | null;
  application_date?: string;
  deans: File | null;
  senate_members: File | null;
  council_members: File | null;
  previous_year_accounts: File | null;
  fees_structure: File | null;
  university_strategic_plan: File | null;
  programmes_offered: File | null;
  areas_of_competence: File | null;
  future_planned_programmes: File | null;
  signature_officers: File | null;
  financial_control: File | null;
  detailed_programmes: File | null;
  facilities: File | null;
  member_cvs: File | null;
  prn?: string;
}

interface ProgrammeAccreditation {
  id?: number;
  application_number?: string;
  application_type: string;
  program_level: string;
  program_name: string;
  duration: number;
  duration_type: string;
  number_of_years: number;
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
  reviewers?: ReviewerAssignment[];
  invoice_status?: string;
  invoice_number?: string;
  invoice_date?: string | null;
  invoice_amount?: string;
  invoice_payment_date?: string | null;
  invoice_cleared?: boolean;
  pod_comment?: string | null;
  pod_comment_date?: string | null;
  director_comment?: string | null;
  director_comment_date?: string | null;
  is_paid?: boolean;
  institution?: string;
  program_to_renew?: string | null;
  preliminary_reviewer?: number;
  assessor?: number;
  review_date?: string;
  expert_progression?: string;
  review_id?: number;
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
  application_status?: string;
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
  names?: string;
  email?: string;
  phone?: string;
  alternative_phone_number?: string;
  profile_pic?: string;
  gender: "male" | "female";
  joining_date: string;
  distance_from_work: number;
  address: string;
  directorate: string;
  directorate_name: string;
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
  department_name: string;
  designation: string;
  designation_name?: string;
  title: string;
  title_name?: string;
  nationality: string;
  nationality_name: string;
  religion: string;
  tribe: string;
  supervisor: string;
  supervisor_name: string;
  district: string;
  district_name: string;
  county: string;
  county_name: string;
  sub_county: string;
  sub_county_name: string;
  parish: string;
  parish_name: string;
  village: string;
  village_name: string;
  district_of_origin: string;
  district_of_origin_name: string;
  county_of_origin: string;
  county_of_origin_name: string;
  sub_county_of_origin: string;
  sub_county_of_origin_name: string;
  parish_of_origin: string;
  parish_of_origin_name: string;
  village_of_origin: string;
  gender_name?: string;
  village_of_origin_name?: string;
  education_histories: EducationHistory[];
  work_histories: WorkHistory[];
  referees: Referee[];
  dependents: Dependent[];
  documents: Document[];
  religion_name?: string;
  tribe_name?: string;
  marital_status_name?: string;
  blood_group_name?: string;
  passport_type_name?: string;
  father_status_name?: string;
  mother_status_name?: string;
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
  relationship_name?: string;
}

interface Document {
  id?: number;
  name: string;
  document: string;
  employee?: number;
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
interface Invoice {
  id?: number;
  application_id?: number;
  institution?: string;
  application?: string | number;
  invoice_number?: string;
  invoice_date?: string;
  status?: string;
  payment_reference?: string;
  payment_receipt?: string;
  payment_date?: string;
  grand_total?: string;
  invoice_items?: {
    item_type: string | number;
    persons_number: number;
    number_of_days: number;
    rate?: number;
    total?: number;
  }[];
}

type InvoiceItemType = {
  id?: number;
  name: string;
  default_rate: string;
  is_active?: boolean;
};

interface DeskReviewInvoice {
  id?: number;
  application?: string;
  status?: string;
  invoice_number?: string;
  desk_review_fee?: string;
  administrative_fee?: string;
  invoice_date?: string;
  grand_total?: number;
  payment_date?: string | null;
  cleared?: boolean;
  payment_reference?: string | null;
  payment_receipt?: string | null;
  institution?: string;
}

interface Directorate {
  id?: number;
  name: string;
  short_code: string;
}

interface Department {
  id?: number;
  name: string;
  short_code: string;
  directorate?: string;
}

interface Designation {
  id?: number;
  name: string;
}

interface Nationality {
  id?: number;
  name: string;
}

interface Religion {
  id?: number;
  name: string;
}

interface Tribe {
  id?: number;
  name: string;
}

interface EmployeeDropdown {
  id: number;
  full_name: string;
}

interface County {
  id: number;
  name: string;
  district: string;
}

interface SubCounty {
  id: number;
  name: string;
  county: string;
}

interface Parish {
  id: number;
  name: string;
  sub_county: string;
}

interface Village {
  id: number;
  name: string;
  parish: string;
}

// ─── Performance Appraisal Types ──────────────────────────────────────────────

type AppraisalStatus =
  | "draft"
  | "self_assessment"
  | "appraiser_review"
  | "reviewer_review"
  | "director_review"
  | "executive_review"
  | "completed"
  | "rejected";

interface AppraisalOutput {
  id?: number;
  appraisal?: number;
  output: string;
  performance_indicator: string;
  performance_target: string;
  self_score?: number | null;
  appraiser_score?: number | null;
  agreed_score?: number | null;
  comments?: string;
}

interface CompetencyRating {
  id?: number;
  appraisal?: number;
  competency_number: number;
  score: number;
}

interface ImprovementArea {
  id?: number;
  appraisal?: number;
  performance_gap: string;
  agreed_action: string;
  time_frame: string;
}

interface NextYearPlan {
  id?: number;
  appraisal?: number;
  key_output: string;
  performance_indicator: string;
  target: string;
}

interface AppraisalQualification {
  id?: number;
  appraisal?: number;
  date_period: string;
  institution: string;
  qualification_attained: string;
}

interface AppraisalTraining {
  id?: number;
  appraisal?: number;
  date_period: string;
  organiser: string;
  attainment: string;
}

interface AppraisalComment {
  id?: number;
  appraisal?: number;
  commenter?: number;
  commenter_role:
    | "appraisee"
    | "appraiser"
    | "reviewer"
    | "director"
    | "executive";
  comment: string;
  created?: string;
}

interface PerformanceAppraisal {
  id?: number;
  start_date: string;
  end_date: string;
  appraisee: number;
  appraiser: number;
  reviewer?: number | null;
  director?: number | null;
  executive_director?: number | null;
  status?: AppraisalStatus;
  date_submitted?: string | null;

  // Section B scores
  output_total_score?: number;
  output_average?: number;
  output_weighted_score?: number;

  // Section C scores
  competency_total_score?: number;
  competency_average?: number;
  competency_weighted_score?: number;

  overall_score?: number;
  overall_level?: string;

  // Text fields
  additional_tasks?: string;
  skills_needed?: string;
  challenges?: string;
  supervisor_remarks?: string;

  // Related objects (read)
  outputs?: AppraisalOutput[];
  competencies?: CompetencyRating[];
  improvement_areas?: ImprovementArea[];
  next_year_plans?: NextYearPlan[];
  initial_qualifications?: AppraisalQualification[];
  additional_qualifications?: AppraisalQualification[];
  trainings?: AppraisalTraining[];
  comments?: AppraisalComment[];

  // read-only display
  appraisee_name?: string;
  appraiser_name?: string;
}
