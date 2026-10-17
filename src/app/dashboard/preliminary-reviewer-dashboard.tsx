"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, RefreshCw } from "lucide-react";
import { useGetReviewerDashboardApplicationsQuery, useGetReviewerDashboardSummaryQuery } from "@/redux/features/programme-api-slice";
import styles from "./programme-accreditation-dashboard.module.css";
import reviewerStyles from "./preliminary-reviewer-dashboard.module.css";

const displayDate = (value: string | null) => value ? new Date(value).toLocaleDateString("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Kampala",
}) : "Not reviewed";

export default function PreliminaryReviewerDashboard({ user }: { user: User }) {
  const [queue, setQueue] = useState("pending");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [search]);
  const summary = useGetReviewerDashboardSummaryQuery(undefined, { refetchOnMountOrArgChange: true, pollingInterval: 60_000 });
  const applications = useGetReviewerDashboardApplicationsQuery({ page, search: debouncedSearch, queue }, {
    refetchOnMountOrArgChange: true, pollingInterval: 60_000,
  });
  const totals = summary.data?.totals;
  const data = applications.currentData;
  const loading = applications.isFetching || search.trim() !== debouncedSearch;
  const progress = totals?.assigned ? Math.round(totals.completed / totals.assigned * 100) : 0;
  const selectQueue = (value: string) => { setQueue(value); setPage(1); };
  return (
    <div className={styles.dashboard} aria-label={`Preliminary reviewer dashboard for ${user.first_name || user.username}`}>
      <header className={styles.toolbar}>
        <div className={styles.brand}>
          <span className={styles.brandMark}><ClipboardCheck size={24} /></span>
          <div><h2>My preliminary reviews</h2><p>Your assigned applications, progress and next actions.</p></div>
        </div>
        <button type="button" className={styles.button} aria-label="Refresh reviewer dashboard"
          disabled={summary.isFetching || applications.isFetching}
          onClick={() => { void summary.refetch(); void applications.refetch(); }}><RefreshCw size={16} />Refresh</button>
      </header>
      {summary.isLoading ? <p className={styles.notice} role="status">Loading your review statistics...</p>
        : summary.isError || !totals ? <div className={styles.notice} role="alert">Review statistics could not be loaded. <button type="button" className={styles.button} onClick={() => void summary.refetch()}>Try again</button></div>
        : <>
          <div className={reviewerStyles.metrics}>
            {[
              { label: "Assigned applications", value: totals.assigned, note: "Currently assigned to you", queue: "all" },
              { label: "Pending reviews", value: totals.pending, note: "Awaiting your review or returned for review", queue: "pending" },
              { label: "Reviews completed", value: totals.completed, note: "Reviewed by you and moved beyond review", queue: "completed" },
              { label: "Institutions", value: totals.institutions, note: "Across your assigned applications", queue: "all" },
            ].map((metric) => <button key={metric.label} type="button" className={`${styles.kpi} ${reviewerStyles.metric}`} onClick={() => selectQueue(metric.queue)}>
              <small>{metric.label}</small><strong>{metric.value.toLocaleString("en-UG")}</strong><p>{metric.note}</p>
            </button>)}
          </div>
          <div className={`${styles.grid2} ${reviewerStyles.summary}`}>
            <section className={styles.panel} aria-labelledby="review-progress-heading">
              <div className={styles.panelHeading}><h3 id="review-progress-heading">Your review progress</h3><strong>{progress}%</strong></div>
              <div className={reviewerStyles.progress} role="progressbar" aria-label="Completed assigned reviews" aria-valuemin={0} aria-valuemax={totals.assigned || 1} aria-valuenow={totals.completed}>
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className={styles.muted}>{totals.completed} of {totals.assigned} assigned applications reviewed and progressed.</p>
              <p className={reviewerStyles.hint}>{totals.pending ? "Start with the oldest pending submissions below. Returned applications also need your attention." : "You have no pending reviews. New assignments will appear here."}</p>
            </section>
            <section className={styles.panel} aria-labelledby="review-stages-heading">
              <div className={styles.panelHeading}><h3 id="review-stages-heading">Current application statuses</h3><span className={styles.muted}>Your assignments</span></div>
              <div className={reviewerStyles.stages}>{summary.data?.stages.map((stage) => <div key={stage.value} className={reviewerStyles.stage}><span>{stage.label}</span><strong>{stage.count}</strong></div>)}</div>
              {!totals.assigned && <p className={styles.muted}>No applications have been assigned to you yet.</p>}
            </section>
          </div>
        </>}
      <section className={styles.controls} aria-label="My assigned applications">
        <div className={styles.filterHeading}><h3>My applications</h3><span className={styles.muted}>Oldest submissions first</span></div>
        <div className={styles.tabs} role="group" aria-label="Review queues">
          {[{ value: "pending", label: "Pending reviews" }, { value: "completed", label: "Completed reviews" }, { value: "all", label: "All assigned" }].map((item) =>
            <button key={item.value} type="button" className={`${styles.tab} ${queue === item.value ? styles.activeTab : ""}`} aria-pressed={queue === item.value} onClick={() => selectQueue(item.value)}>{item.label}</button>)}
        </div>
        <div className={styles.field}><label htmlFor="reviewer-search">Search my applications</label><input id="reviewer-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Programme, institution or application number" /></div>
      </section>
      <div className={styles.tableWrap}>
        <div className={styles.tableMeta} role="status">{loading ? "Loading your applications..." : applications.isError ? "Applications unavailable" : `${data?.count ?? 0} applications`}</div>
        <div className={styles.registerScroll} role="region" aria-label="Reviewer application list" tabIndex={0}>
          <table className={styles.dataTable}>
            <caption className="sr-only">Your assigned preliminary reviews and current application statuses</caption>
            <thead><tr><th scope="col" className={styles.programmeCell}>Application</th><th scope="col" className={styles.institutionCell}>Institution</th><th scope="col">Submitted</th><th scope="col">Current status</th><th scope="col">My latest review</th><th scope="col">Action</th></tr></thead>
            <tbody>{loading ? <tr><td colSpan={6} className={styles.empty}>Loading applications...</td></tr>
              : applications.isError ? <tr><td colSpan={6} className={styles.empty}>Your applications could not be loaded. <button type="button" className={styles.button} onClick={() => void applications.refetch()}>Try again</button></td></tr>
              : !data?.results.length ? <tr><td colSpan={6} className={styles.empty}>{search ? "No assigned applications match your search." : queue === "pending" ? "No applications are awaiting your review." : "No applications in this queue."}</td></tr>
              : data.results.map((application) => <tr key={application.id}>
                <td><Link className={styles.programmeLink} href={`/programmes/programme-accreditation/${application.id}/details`}>{application.programme_name}</Link><span className={styles.subtext}>{application.application_number}</span></td>
                <td>{application.institution}</td><td>{displayDate(application.date_submitted)}</td>
                <td><span className={`${styles.badge} ${styles.secondaryBadge}`}>{application.status_label}</span></td>
                <td>{displayDate(application.reviewed_at)}</td>
                <td><Link className={styles.button} href={`/programmes/programme-accreditation/${application.id}/${application.review_pending ? "review" : "details"}`}>{application.review_pending ? application.has_review ? "Continue review" : "Review" : "View application"}<ArrowRight size={14} /></Link></td>
              </tr>)}</tbody>
          </table>
        </div>
        <div className={styles.pagination}><span>Page {page} of {Math.max(1, Math.ceil((data?.count ?? 0) / 25))}</span><div className={styles.pageButtons}>
          <button type="button" className={styles.button} disabled={loading || applications.isError || !data?.previous} onClick={() => setPage((value) => value - 1)}>Previous</button>
          <button type="button" className={styles.button} disabled={loading || applications.isError || !data?.next} onClick={() => setPage((value) => value + 1)}>Next</button>
        </div></div>
      </div>
    </div>
  );
}
