
type Group = {
    name:string
}

type NavItem = {
  name: string
  href: string
  icon: ElementType
  current?: boolean,
  children?: { name: string; href: string, current:boolean }[]
}

type User = 
{       id?:number,
        email:string,
        first_name:string,
        last_name:string,
        username:string,
        profile_pic?:string,
         password:string,
         re_password:string

}

type LoginUser = {
    username:string,
    password:string
}
type UserEmail={
    email:string
}

interface Option {
    value: string
    label: string
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
  
}

type Institution = {
        id ?: number;
        name: string;
        acroynm: string;
        postal_address: string;
        website: string;
        landline: string;
        region: string ;
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
        location?: string
    }
type InstitutionRegForm = {
  email: string;
  username: string;
  phone: string;
  alternative_phone_number: string;
  password: string;
  re_password: string;
  institution: institution;
  
}

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
  id?: string,
  application_code?: string,
  has_title_deed: boolean,
  title_deed?: string | File,
  names_of_promoters: string,
  vision: string,
  mission: string,
  objectives: string,
  philosophy: string,
  governance_structure: string,
  human_resources: string,
  source_of_finance: string,
  action_plan: string,
  infrastructure: string,
  programmes: string,
  status?: "pending" | "approved" | "rejected" | "draft" | "submitted" | "pending",
  institution?: string,
  application_date?:string
  promoters?: string | File,
  project_proposal?: string | File
}


interface UniversityProvisionalLicense {
  id?: string,
  application_code ?: string,
    institution : string,
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
    application_date?: Date ;
    number_of_vehicles?: number | null;
    vehicle_registration?: string | null;
}

interface CharterApplication {
  has_provisional_license: boolean,
  amount_of_land_owned: string,
  land_in_use: string,
  land_for_future_use: string,
  year_obtained: string,
  leased_or_rented: string,
  classrooms: number,
  libraries: number,
  science_labs: number,
  computer_labs: number,
  staff_houses: number,
  areadministrative_staff_area: number,
  area_for_staff_use: number,
  administrative_block_area: number,
  student_Welfare_offices: number,
  sick_bay_area: number,
  hostels_area: number,
  meeting_hall_area: number,
  area_of_playground: number,
  available_playgrounds: string,
  area_of_empty_space: number,
  total_roads_mileage: string,
  water_source: string,
  power_source: string,
  has_cultivable_land: true,
  cultivable_land: number,
  library_books: number,
  text_books: number,
  computers_in_use: number,
  computers_in_library: number,
  academic_staff_computers: number,
  administrative_staff_computers: number,
  library_computer_software: number,
  students_have_access: true,
  has_internet_access: true,
  library_seats: number,
  classroom_seats: number,
  laboratories_seats: number,
  administration_block_seats: number,
  student_facilities: string,
  full_time_academic_staff: number,
  intended_full_time_academic_staff: number,
  intended_part_time_academic_staff: number,
  phd_holders: number,
  masters_holders: number,
  bachelor_holders: number,
  diploma_holders: number,
  average_staff_student_ratio: number,
  staff_overload: number,
  administrative_staff: number,
  support_staff: number,
  chancellor: string,
  vice_chancellor: string,
  university_secretary: string,
  academic_registrar: string,
  vice_registrar: string,
  ownership: string,
  other_assets: string,
  annual_budget: string,
  fees_percentage: string,
  other_income_source: string,
  infrastructure_budget: string,
  research_budget: string,
  computer_budget: string,
  science_labs_budget: string,
  staff_development_budget: string,
  library_budget: string,
  staff_salary_budget: string,
  current_bankers: string,
  vision: string,
  mission: string,
  specific_objectives: string,
  total_students: number,
  arts_students: number,
  social_science_students: number,
  basic_science_students: number,
  arts_education_students: number,
  agriculture_students: number,
  medicine_students: number,
  veterinary_students: number,
  engineering_students: number,
  other_students_numbers: string,
  eastern_region: number,
  central_region: number,
  northern_region: number,
  western_region: number,
  eastern_africans: number,
  other_regions: number,
  institution: string,
  publication_years: string[],
}