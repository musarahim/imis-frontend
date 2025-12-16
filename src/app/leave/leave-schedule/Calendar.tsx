"use client";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useGetLeaveSchedulesQuery } from '@/redux/features/leave-api-slice';
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, useState } from "react";
import { CalendarProps, momentLocalizer, SlotInfo, View, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalenderForm from "./CalenderForm";
import LeaveApplicationForm from "./LeaveApplicationForm";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
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
  const { data: leaveSchedules, isLoading, isError } = useGetLeaveSchedulesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  
  // Transform leave schedules into calendar events
  const events: CalendarEvent[] = leaveSchedules ? leaveSchedules.map((schedule: LeaveSchedule) => ({
    title: `${schedule.leave_type || 'Leave'} - ${schedule.leave_days} days`,
    start: new Date(schedule.start_date),
    end: new Date(schedule.end_date),
    allDay: true, // Leave schedules are typically all-day events
    id: schedule.id,
    resource: schedule, // Store the original schedule data for the application form
  })) : [];
  
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<LeaveSchedule | null>(null);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = () => {
    // After successful creation, the data will be refetched automatically
    // due to RTK Query cache invalidation
    setSelectedSlot(null);
  };
 

  const handleEventDrop = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    // TODO: Implement API call to update leave schedule dates
    console.log('Event dropped:', { event, start, end, isAllDay });
  };

  const handleEventResize = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    // TODO: Implement API call to update leave schedule dates
    console.log('Event resized:', { event, start, end, isAllDay });
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    // When a schedule is clicked, open the leave application form
    console.log('Schedule clicked:', event);
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
          <div className="text-lg text-red-600">Error loading leave schedules</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container my-auto">
      <div className="mb-4">
        <Button onClick={() => setSelectedSlot({ start: new Date(), end: new Date(), slots: [], action: 'click' })}>
          <Plus />
          Schedule Leave
        </Button>
      </div>
      <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Schedule Leave</h2>
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

      <Dialog open={selectedSchedule !== null} onOpenChange={() => setSelectedSchedule(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Apply for Leave</h2>
            <p className="text-sm text-muted-foreground">
              Submit your leave application based on this schedule
            </p>
          </DialogHeader>
          {selectedSchedule && selectedSchedule.id !== undefined && (
            <LeaveApplicationForm
              scheduleData={selectedSchedule as {
                id: number;
                leave_type: string;
                start_date: string;
                end_date: string;
                leave_days: number;
              }}
              onCancel={() => setSelectedSchedule(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      <DnDCalendar
        localizer={localizer}
        style={{ height: 600, width: "100%" }}
        className="border-border border-rounded-md border-solid border-2 rounded-lg" // Optional border
        selectable
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
        resizable
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        events={events}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
      />
    </main>
  )
}

export default Calendar
