export interface ProgrammeDashboardSummary {
  totals: {
    applications: number;
    institutions: number;
    reviewed: number;
    ready_for_assessment: number;
    payment_verification: number;
    stem: number;
    humanities: number;
    unspecified: number;
    latest_submission: string | null;
  };
  stages: { value: string; label: string; count: number }[];
  top_institutions: { id: number; name: string; applications: number; reviewed: number }[];
  generated_at: string;
}

export interface ProgrammeDashboardApplication {
  id: number;
  application_number: string;
  programme_name: string;
  institution: string;
  institution_id: number;
  date_submitted: string;
  programme_category: string | null;
  programme_category_label: string | null;
  program_level: string;
  status: string;
  status_label: string;
  invoice_number: string | null;
  payment_status: string;
}

export interface ProgrammeDashboardFilters {
  institutions: { id: number; name: string }[];
  programme_categories: { value: string; label: string }[];
  statuses: { value: string; label: string }[];
}

export interface ProgrammeDashboardParams {
  page?: number;
  pageSize?: number;
  search?: string;
  institution?: string;
  programme_category?: string;
  status?: string;
  ordering?: string;
}

export interface ReviewerDashboardSummary {
  totals: { assigned: number; pending: number; completed: number; institutions: number };
  stages: { value: string; label: string; count: number }[];
}

export interface ReviewerDashboardApplication {
  id: number;
  application_number: string;
  programme_name: string;
  institution: string;
  date_submitted: string;
  status: string;
  status_label: string;
  has_review: boolean;
  review_pending: boolean;
  reviewed_at: string | null;
}

export interface AssessorDashboardSummary {
  totals: { assigned: number; pending: number; completed: number; institutions: number };
}

export interface AssessorDashboardApplication {
  id: number;
  application_number: string;
  programme_name: string;
  institution: string;
  date_submitted: string;
  has_assessment: boolean;
  assessment_pending: boolean;
  assessment_date: string | null;
}
