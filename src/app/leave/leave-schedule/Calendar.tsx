"use client";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import moment from "moment";
import { ComponentType, useState } from "react";
import { CalendarProps, momentLocalizer, SlotInfo, View, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalenderForm from "./CalenderForm";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

function Calendar() {

    const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  
  // Sample events for December 2025
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      title: "Annual Leave",
      start: new Date(2025, 11, 3, 10, 0), // December 3rd, 10:00 AM
      end: new Date(2025, 11, 10, 11, 30),   // December 10th, 11:30 AM
      allDay: true,
    },

   
    {
      title: "Client Presentation",
      start: new Date(2025, 11, 16, 14, 0), // December 16th, 2:00 PM
      end: new Date(2025, 11, 16, 16, 0),   // December 16th, 4:00 PM
      allDay: false,
    },
    {
      title: "Holiday Party",
      start: new Date(2025, 11, 20, 18, 0), // December 20th, 6:00 PM
      end: new Date(2025, 11, 20, 22, 0),   // December 20th, 10:00 PM
      allDay: false,
    },
    {
      title: "Christmas Break",
      start: new Date(2025, 11, 24),        // December 24th (all day)
      end: new Date(2025, 11, 26),          // December 26th (all day)
      allDay: true,
    },
    {
      title: "Year-end Review",
      start: new Date(2025, 11, 30, 13, 0), // December 30th, 1:00 PM
      end: new Date(2025, 11, 30, 15, 0),   // December 30th, 3:00 PM
      allDay: false,
    },
    {
      title: "Doctor Appointment",
      start: new Date(2025, 11, 11, 9, 30), // December 11th, 9:30 AM
      end: new Date(2025, 11, 11, 10, 30),  // December 11th, 10:30 AM
      allDay: false,
    },
    {
      title: "Training Workshop",
      start: new Date(2025, 11, 18, 8, 0),  // December 18th, 8:00 AM
      end: new Date(2025, 11, 18, 17, 0),   // December 18th, 5:00 PM
      allDay: false,
    },
    {
      title: "New Year Planning",
      start: new Date(2025, 11, 31, 10, 0), // December 31st, 10:00 AM
      end: new Date(2025, 11, 31, 12, 0),   // December 31st, 12:00 PM
      allDay: false,
    },
  ]);
  
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = (data: { title: string; start: string; end: string }) => {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    const allDaySelection =
      startDate.getHours() === 0 &&
      startDate.getMinutes() === 0 &&
      endDate.getHours() === 0 &&
      endDate.getMinutes() === 0 &&
      endDate.getTime() - startDate.getTime() >= 24 * 60 * 60 * 1000;

    const newEvent: CalendarEvent = {
      title: data.title,
      start: startDate,
      end: endDate,
      allDay: allDaySelection,
    };
    setEvents([...events, newEvent]);
    setSelectedSlot(null);
  };

  const deriveAllDay = (startDate: Date, endDate: Date, isAllDay?: boolean, fallback?: boolean) => {
    if (typeof isAllDay === "boolean") return isAllDay;
    const dayDiff = endDate.getTime() - startDate.getTime();
    const startsAtMidnight =
      startDate.getHours() === 0 &&
      startDate.getMinutes() === 0 &&
      startDate.getSeconds() === 0;
    const endsAtMidnight =
      endDate.getHours() === 0 &&
      endDate.getMinutes() === 0 &&
      endDate.getSeconds() === 0;
    if (startsAtMidnight && endsAtMidnight && dayDiff >= 24 * 60 * 60 * 1000) {
      return true;
    }
    if (!startsAtMidnight || dayDiff < 24 * 60 * 60 * 1000) {
      return false;
    }
    return fallback ?? false;
  };

  const clampToSingleDay = (startDate: Date) => {
    const endOfDay = new Date(startDate);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  };

  const handleEventDrop = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const normalizedEnd =
      !nextAllDay && event.allDay && event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000
        ? clampToSingleDay(nextStart)
        : nextEnd;
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? { ...existingEvent, start: nextStart, end: normalizedEnd, allDay: nextAllDay }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? { ...existingEvent, start: nextStart, end: nextEnd, allDay: nextAllDay }
        : existingEvent
    );
    setEvents(updatedEvents);
  };
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
              onSubmit={handleCreateEvent}
              onCancel={() => setSelectedSlot(null)}
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
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
      />
    </main>
  )
}

export default Calendar
