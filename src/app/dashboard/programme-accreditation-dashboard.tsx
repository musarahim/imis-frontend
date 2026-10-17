"use client";

import {
    useGetProgrammeHeadDashboardFiltersQuery,
    useGetProgrammeHeadDashboardRegisterQuery,
    useGetProgrammeHeadDashboardSummaryQuery,
} from "@/redux/features/programme-api-slice";
import type {
    ProgrammeDashboardParams,
    ProgrammeDashboardSummary,
} from "@/types/programme-dashboard";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./programme-accreditation-dashboard.module.css";

const date = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Africa/Kampala",
      })
    : "Not available";
const count = (value: number) => value.toLocaleString("en-UG");

function Overview({
  data,
  openInstitution,
}: {
  data: ProgrammeDashboardSummary;
  openInstitution: (id: number) => void;
}) {
  const totals = data.totals;
  const percent = (value: number) =>
    totals.applications
      ? `${((value / totals.applications) * 100).toFixed(1)}% of all applications`
      : "No applications yet";
  const metrics = [
    {
      label: "Programme applications",
      value: totals.applications,
      note: "All programme submissions",
    },
    {
      label: "Institutions",
      value: totals.institutions,
      note: "With programme submissions",
    },
    {
      label: "Programmes reviewed",
      value: totals.reviewed,
      note: "At least one preliminary review",
    },
    {
      label: "Ready for assessment",
      value: totals.ready_for_assessment,
      note: "Desk review payment fully verified",
    },
    {
      label: "STEM applications",
      value: totals.stem,
      note: percent(totals.stem),
    },
    {
      label: "Humanities applications",
      value: totals.humanities,
      note: percent(totals.humanities),
    },
  ];
  const stemEnd = totals.applications
    ? (totals.stem / totals.applications) * 100
    : 0;
  const humanitiesEnd = totals.applications
    ? ((totals.stem + totals.humanities) / totals.applications) * 100
    : 0;
  const largest = Math.max(
    1,
    ...data.top_institutions.map((institution) => institution.applications),
  );
  const stage = (value: string) =>
    data.stages.find((item) => item.value === value)?.count ?? 0;
  const queues = [
    {
      label: "Submitted applications",
      value: stage("submitted"),
      note: "Awaiting preliminary reviewer assignment",
      href: "/programmes/programme-accreditation",
    },
    {
      label: "Under preliminary review",
      value: stage("under_review"),
      note: "Assigned to preliminary reviewers",
      href: "/programmes/under-review",
    },
    {
      label: "Reviewed applications",
      value: stage("reviewed"),
      note: "Ready for desk review invoicing",
      href: "/programmes/reviewed-applications",
    },
    {
      label: "Payment verification",
      value: totals.payment_verification,
      note: "Desk review invoices awaiting Accounts",
      href: "/programmes/desk-review-invoices",
    },
    {
      label: "Ready for assessment",
      value: totals.ready_for_assessment,
      note: "Programmes cleared for assignment",
      href: "/programmes/ready-for-assessment",
    },
    {
      label: "Under assessment",
      value: stage("under_assessment"),
      note: "Assigned to programme assessors",
      href: "/programmes/under-assessment",
    },
  ];
  return (
    <>
      <div className={styles.kpis}>
        {metrics.map((metric) => (
          <div className={styles.kpi} key={metric.label}>
            <small>{metric.label}</small>
            <strong>{count(metric.value)}</strong>
            <p>{metric.note}</p>
          </div>
        ))}
      </div>
      <div className={styles.grid2}>
        <section
          className={styles.panel}
          aria-labelledby="programme-mix-heading"
        >
          <div className={styles.panelHeading}>
            <h3 id="programme-mix-heading">Programme category mix</h3>
            <span className={styles.muted}>All applications</span>
          </div>
          <div className={styles.donutWrap}>
            <div
              className={styles.donut}
              role="img"
              aria-label={`${totals.stem} STEM, ${totals.humanities} Humanities, ${totals.unspecified} not specified`}
              style={{
                background: totals.applications
                  ? `conic-gradient(#237a57 0% ${stemEnd}%, var(--secondary) ${stemEnd}% ${humanitiesEnd}%, #cbd5e1 ${humanitiesEnd}% 100%)`
                  : "var(--line)",
              }}
            >
              <div className={styles.donutCenter}>
                <strong>{count(totals.applications)}</strong>
                <span>applications</span>
              </div>
            </div>
            <ul className={styles.legend}>
              {[
                { label: "STEM", value: totals.stem, color: "#237a57" },
                {
                  label: "Humanities",
                  value: totals.humanities,
                  color: "var(--secondary)",
                },
                {
                  label: "Not specified",
                  value: totals.unspecified,
                  color: "#94a3b8",
                },
              ].map((item) => (
                <li key={item.label}>
                  <span
                    className={styles.dot}
                    style={{ background: item.color }}
                  />
                  <strong>{count(item.value)}</strong> {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section
          className={styles.panel}
          aria-labelledby="top-institutions-heading"
        >
          <div className={styles.panelHeading}>
            <h3 id="top-institutions-heading">
              Top institutions by application volume
            </h3>
            <span className={styles.muted}>Top 10</span>
          </div>
          {data.top_institutions.length ? (
            data.top_institutions.map((institution) => (
              <button
                type="button"
                key={institution.id}
                className={styles.barRow}
                title={`${institution.name}: ${institution.applications} applications, ${institution.reviewed} reviewed`}
                aria-label={`View ${institution.name}: ${institution.applications} applications`}
                onClick={() => openInstitution(institution.id)}
              >
                <span className={styles.barLabel}>{institution.name}</span>
                <span className={styles.barTrack}>
                  <span
                    className={styles.barFill}
                    style={{
                      width: `${(institution.applications / largest) * 100}%`,
                    }}
                  />
                </span>
                <span className={styles.barValue}>
                  {institution.applications}
                </span>
              </button>
            ))
          ) : (
            <p className={styles.empty}>
              Institution rankings will appear when programmes are submitted.
            </p>
          )}
          <p className={styles.muted}>
            Select an institution to view its applications and current statuses.
          </p>
        </section>
      </div>
      <section
        className={`${styles.panel} ${styles.workflow}`}
        aria-labelledby="workflow-heading"
      >
        <div className={styles.panelHeading}>
          <h3 id="workflow-heading">Accreditation work queues</h3>
          <span className={styles.muted}>Open a queue to continue working</span>
        </div>
        <div className={styles.queueGrid}>
          {queues.map((queue) => (
            <Link
              href={queue.href}
              className={styles.queueItem}
              key={queue.label}
            >
              <div>
                <p>{queue.label}</p>
                <small>{queue.note}</small>
              </div>
              <strong>{count(queue.value)}</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ProgrammeAccreditationDashboard({
  user,
}: {
  user: User;
}) {
  const [tab, setTab] = useState<"overview" | "register">("overview");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [institution, setInstitution] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [ordering, setOrdering] = useState("-date_submitted");
  const summary = useGetProgrammeHeadDashboardSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60_000,
  });
  const options = useGetProgrammeHeadDashboardFiltersQuery(undefined, {
    skip: tab !== "register",
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  const params: ProgrammeDashboardParams = {
    page,
    pageSize,
    search: debouncedSearch,
    institution,
    programme_category: category,
    status,
    ordering,
  };
  const register = useGetProgrammeHeadDashboardRegisterQuery(params, {
    skip: tab !== "register",
    refetchOnMountOrArgChange: true,
    pollingInterval: 60_000,
  });
  const results = register.currentData;
  const searching = register.isFetching || search.trim() !== debouncedSearch;
  const pages = Math.max(1, Math.ceil((results?.count ?? 0) / pageSize));
  const reset = () => {
    setSearch("");
    setDebouncedSearch("");
    setInstitution("");
    setCategory("");
    setStatus("");
    setPage(1);
  };
  const sort = (column: string) => {
    setOrdering((previous) => (previous === column ? `-${column}` : column));
    setPage(1);
  };

  return (
    <div
      className={styles.dashboard}
      aria-label={`Programme accreditation dashboard for ${user.first_name || user.username}`}
    >
      <header className={styles.toolbar}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Programme dashboard views"
        >
          <button
            type="button"
            id="programme-overview-tab"
            role="tab"
            aria-selected={tab === "overview"}
            aria-controls="programme-overview"
            className={`${styles.tab} ${tab === "overview" ? styles.activeTab : ""}`}
            onClick={() => setTab("overview")}
          >
            Dashboard
          </button>
          <button
            type="button"
            id="programme-register-tab"
            role="tab"
            aria-selected={tab === "register"}
            aria-controls="programme-register"
            className={`${styles.tab} ${tab === "register" ? styles.activeTab : ""}`}
            onClick={() => setTab("register")}
          >
            All Applications
          </button>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              void summary.refetch();
              if (tab === "register") {
                void register.refetch();
                void options.refetch();
              }
            }}
            disabled={
              summary.isFetching || (tab === "register" && register.isFetching)
            }
            aria-label="Refresh dashboard"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </header>

      {tab === "overview" ? (
        <div
          role="tabpanel"
          id="programme-overview"
          aria-labelledby="programme-overview-tab"
        >
          {summary.isLoading ? (
            <p className={styles.notice} role="status">
              Loading programme accreditation statistics...
            </p>
          ) : summary.isError || !summary.data ? (
            <div className={styles.notice} role="alert">
              The dashboard could not be loaded.{" "}
              <button
                className={styles.button}
                type="button"
                onClick={() => void summary.refetch()}
              >
                Try again
              </button>
            </div>
          ) : (
            <Overview
              data={summary.data}
              openInstitution={(id) => {
                reset();
                setInstitution(String(id));
                setTab("register");
              }}
            />
          )}
        </div>
      ) : (
        <div
          role="tabpanel"
          id="programme-register"
          aria-labelledby="programme-register-tab"
        >
          <section
            className={styles.controls}
            aria-label="Filter programme applications"
          >
            <div className={styles.filterHeading}>
              <h3>All programme applications</h3>
              <button type="button" className={styles.button} onClick={reset}>
                Reset filters
              </button>
            </div>
            <p className={styles.muted}>
              Track every application from submission through review, assessment and final decision.
            </p>
            <div className={styles.filterGrid}>
              <div className={styles.field}>
                <label htmlFor="dashboard-search">Search</label>
                <input
                  id="dashboard-search"
                  type="search"
                  placeholder="Programme, institution or application number"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="dashboard-category">Programme category</label>
                <select
                  id="dashboard-category"
                  value={category}
                  disabled={options.isLoading || options.isError}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All categories</option>
                  {options.data?.programme_categories.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="dashboard-institution">Institution</label>
                <select
                  id="dashboard-institution"
                  value={institution}
                  disabled={options.isLoading || options.isError}
                  onChange={(event) => {
                    setInstitution(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All institutions</option>
                  {options.data?.institutions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="dashboard-stage">Current status</label>
                <select
                  id="dashboard-stage"
                  value={status}
                  disabled={options.isLoading || options.isError}
                  onChange={(event) => {
                    setStatus(event.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All statuses</option>
                  {options.data?.statuses.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {options.isError && (
              <p role="alert" className={styles.muted}>
                Filter options are unavailable.{" "}
                <button type="button" onClick={() => void options.refetch()}>
                  Retry
                </button>
              </p>
            )}
          </section>
          <div className={styles.tableWrap}>
            <div className={styles.tableMeta}>
              <span role="status">
                {searching
                  ? "Loading applications..."
                  : register.isError
                    ? "Applications unavailable"
                    : `${count(results?.count ?? 0)} matching applications`}
              </span>
              <label className={styles.pageSize}>
                Rows per page{" "}
                <select
                  value={pageSize}
                  onChange={(event) => {
                    setPageSize(Number(event.target.value));
                    setPage(1);
                  }}
                >
                  {[25, 50, 100, 250].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div
              className={styles.registerScroll}
              role="region"
              aria-label="All programme applications and current statuses"
              tabIndex={0}
            >
              <table className={styles.dataTable}>
                <caption className="sr-only">
                  All programme accreditation applications, their current status and
                  desk review payment status
                </caption>
                <thead>
                  <tr>
                    {[
                      {
                        key: "programme_name",
                        label: "Programme",
                        css: styles.programmeCell,
                      },
                      {
                        key: "institution__name",
                        label: "Institution",
                        css: styles.institutionCell,
                      },
                      {
                        key: "date_submitted",
                        label: "Submission date",
                        css: "",
                      },
                      { key: "programme_category", label: "Category", css: "" },
                      { key: "status", label: "Current status", css: "" },
                    ].map((column) => (
                      <th
                        key={column.key}
                        scope="col"
                        className={column.css}
                        aria-sort={
                          ordering.replace(/^-/, "") === column.key
                            ? ordering.startsWith("-")
                              ? "descending"
                              : "ascending"
                            : "none"
                        }
                      >
                        <button
                          type="button"
                          className={styles.sortButton}
                          onClick={() => sort(column.key)}
                        >
                          {column.label}
                          <ArrowUpDown size={12} />
                        </button>
                      </th>
                    ))}
                    <th scope="col">Desk review payment</th>
                  </tr>
                </thead>
                <tbody>
                  {searching ? (
                    <tr>
                      <td colSpan={6} className={styles.empty}>
                        Loading programme applications...
                      </td>
                    </tr>
                  ) : register.isError ? (
                    <tr>
                      <td colSpan={6} className={styles.empty}>
                        The applications could not be loaded.{" "}
                        <button
                          type="button"
                          className={styles.button}
                          onClick={() => void register.refetch()}
                        >
                          Try again
                        </button>
                      </td>
                    </tr>
                  ) : !results?.results.length ? (
                    <tr>
                      <td colSpan={6} className={styles.empty}>
                        No programme applications match these filters.
                      </td>
                    </tr>
                  ) : (
                    results.results.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <Link
                            className={styles.programmeLink}
                            href={`/programmes/programme-accreditation/${row.id}/details`}
                          >
                            {row.programme_name}
                          </Link>
                          <span className={styles.subtext}>
                            {row.application_number} · {row.program_level}
                          </span>
                        </td>
                        <td>{row.institution}</td>
                        <td>{date(row.date_submitted)}</td>
                        <td>
                          <span
                            className={`${styles.badge} ${row.programme_category === "stem" ? styles.green : row.programme_category === "humanities" ? styles.secondaryBadge : styles.gray}`}
                          >
                            {row.programme_category_label || "Not specified"}
                          </span>
                        </td>
                        <td>
                          <span className={`${styles.badge} ${styles.secondaryBadge}`}>
                            {row.status_label}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`${styles.badge} ${row.payment_status === "Fully verified" ? styles.green : row.payment_status.includes("verified") || row.payment_status === "Awaiting verification" ? styles.secondaryBadge : styles.gray}`}
                          >
                            {row.payment_status}
                          </span>
                          {row.invoice_number && (
                            <span className={styles.subtext}>
                              {row.invoice_number}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className={styles.pagination}>
              <span>
                {!searching && !register.isError && results?.count
                  ? `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, results.count)} of ${count(results.count)}`
                  : "Programme applications"}
              </span>
              <div className={styles.pageButtons}>
                <button
                  type="button"
                  className={styles.button}
                  disabled={searching || register.isError || !results?.previous}
                  onClick={() => setPage((previous) => previous - 1)}
                >
                  <ChevronLeft size={14} />
                  Previous
                </button>
                <span>
                  Page {page} of {pages}
                </span>
                <button
                  type="button"
                  className={styles.button}
                  disabled={searching || register.isError || !results?.next}
                  onClick={() => setPage((previous) => previous + 1)}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
