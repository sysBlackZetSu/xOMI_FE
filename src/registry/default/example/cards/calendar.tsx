"use client"

import { addDays } from "date-fns"

import { Calendar } from "@/registry/default/ui/calendar"
import { Card, CardContent } from "@/registry/default/ui/card"

const start = new Date();

export function CardsCalendar() {
  return (
    <Card className="max-w-[280px]">
      <CardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 0),
          }}
        />
      </CardContent>
    </Card>
  )
}
