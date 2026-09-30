"use client";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    useGetLeaveSchedulesQuery,
    usePatchLeaveApplicationMutation,
} from "@/redux/features/leave-api-slice";
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, useState } from "react";
import {
    CalendarProps,
    momentLocalizer,
    SlotInfo,
    View,
    Views,
} from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { toast } from "react-toastify";
import CalenderForm from "./CalenderForm";
import LeaveApplicationForm from "./LeaveApplicationForm";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>,
);
const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  id?: number;
  resource?: LeaveSchedule; // Store the original schedule data
};

function Calendar() {
  const {
    data: leaveSchedules,
    isLoading,
    isError,
  } = useGetLeaveSchedulesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [updateLeaveSchedule] = usePatchLeaveApplicationMutation();

  // Transform leave schedules into calendar events
  const events: CalendarEvent[] = leaveSchedules
    ? leaveSchedules.map((schedule: LeaveSchedule) => ({
        title: `${schedule.leave_type || "Leave"} - ${schedule.leave_days} days`,
        start: moment(schedule.start_date, "YYYY-MM-DD")
          .startOf("day")
          .toDate(),
        // All-day calendar events use an exclusive end; schedule dates are inclusive.
        end: moment(schedule.end_date, "YYYY-MM-DD")
          .add(1, "day")
          .startOf("day")
          .toDate(),
        allDay: true, // Leave schedules are typically all-day events
        id: schedule.id,
        resource: schedule, // Store the original schedule data for the application form
      }))
    : [];

  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedSchedule, setSelectedSchedule] =
    useState<LeaveSchedule | null>(null);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const schedulesOnDate = events.filter(
      (event) => slotInfo.start >= event.start && slotInfo.start < event.end,
    );
    if (slotInfo.action !== "select" && schedulesOnDate.length > 0) {
      if (schedulesOnDate.length === 1 && schedulesOnDate[0].resource) {
        setSelectedSchedule(schedulesOnDate[0].resource);
      } else {
        toast.info("Click a schedule bar to choose which leave to apply for");
      }
      return;
    }
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = () => {
    // After successful creation, the data will be refetched automatically
    // due to RTK Query cache invalidation
    setSelectedSlot(null);
  };

  const handleEventDrop = async ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    if (event.id === undefined) {
      toast.error("Unable to update a leave schedule without an ID");
      return;
    }

    try {
      await updateLeaveSchedule({
        id: event.id,
        start_date: moment(start).format("YYYY-MM-DD"),
        end_date: moment(end).subtract(1, "day").format("YYYY-MM-DD"),
      }).unwrap();
      toast.success("Leave schedule updated successfully");
    } catch {
      toast.error("Failed to update leave schedule");
    }
  };

  const handleEventResize = handleEventDrop;

  const handleSelectEvent = (event: CalendarEvent) => {
    // When a schedule is clicked, open the leave application form
    if (event.resource) {
      setSelectedSchedule(event.resource);
    }
  };
  if (isLoading) {
    return (
      <main className="container my-auto">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg">Loading leave schedules...</div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="container my-auto">
        <div className="flex items-center justify-center h-96">
          <div className="text-lg text-red-600">
            Error loading leave schedules
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container my-auto">
      <div className="mb-4">
        <Button
          onClick={() =>
            setSelectedSlot({
              start: new Date(),
              end: new Date(),
              slots: [],
              action: "click",
            })
          }
        >
          <Plus />
          Schedule Leave
        </Button>
      </div>
      <Dialog
        open={selectedSlot !== null}
        onOpenChange={() => setSelectedSlot(null)}
      >
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
              Schedule Leave
            </DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <CalenderForm
              start={selectedSlot.start}
              end={selectedSlot.end}
              onCancel={handleCreateEvent}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={selectedSchedule !== null}
        onOpenChange={() => setSelectedSchedule(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="scroll-m-20 text-xl font-semibold tracking-tight">
              Apply for Leave
            </DialogTitle>
            <DialogDescription>
              Submit your leave application based on this schedule
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && selectedSchedule.id !== undefined && (
            <LeaveApplicationForm
              scheduleData={
                selectedSchedule as {
                  id: number;
                  leave_type: string;
                  start_date: string;
                  end_date: string;
                  leave_days: number;
                }
              }
              onCancel={() => setSelectedSchedule(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <DnDCalendar
        localizer={localizer}
        style={{ height: 600, width: "100%" }}
        className="border-border border-rounded-md border-solid border-2 rounded-lg" // Optional border
        selectable="ignoreEvents"
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
        resizable
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        events={events}
        dayPropGetter={(day) =>
          events.some((event) => day >= event.start && day < event.end)
            ? {
                style: {
                  backgroundColor: "rgba(220, 38, 38, 0.15)",
                  cursor: "pointer",
                },
              }
            : {}
        }
        eventPropGetter={() => ({
          style: {
            backgroundColor: "var(--secondary)",
            color: "var(--secondary-foreground)",
            cursor: "pointer",
          },
        })}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
      />
    </main>
  );
}

export default Calendar;
