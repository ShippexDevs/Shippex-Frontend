import { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";

function ArrivalDetailsCard({
  deliveryDetails = {
    estimatedDeliveryDate: "",
    estimatedDeliveryTime: "",
  },
  onChange,
  errors = {},
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [visibleMonth, setVisibleMonth] = useState(() => {
    const selectedDate = parseDate(
      deliveryDetails.estimatedDeliveryDate
    );

    return selectedDate
      ? new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          1
        )
      : new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1
        );
  });

  const calendarRef = useRef(null);

  const handleChange = (field, value) => {
    onChange?.({
      ...deliveryDetails,
      [field]: value,
    });
  };

  const selectedDate = parseDate(
    deliveryDetails.estimatedDeliveryDate
  );

  const today = startOfDay(new Date());

  const monthLabel = visibleMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  const days = getCalendarDays(visibleMonth);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target)
      ) {
        setCalendarOpen(false);
      }
    };

    if (calendarOpen) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [calendarOpen]);

  useEffect(() => {
    if (!calendarOpen) {
      return;
    }

    const selected = parseDate(
      deliveryDetails.estimatedDeliveryDate
    );

    if (selected) {
      setVisibleMonth(
        new Date(
          selected.getFullYear(),
          selected.getMonth(),
          1
        )
      );
    }
  }, [
    calendarOpen,
    deliveryDetails.estimatedDeliveryDate,
  ]);

  const handleDateSelect = (date) => {
    if (isBefore(date, today)) {
      return;
    }

    handleChange(
      "estimatedDeliveryDate",
      formatDateForInput(date)
    );

    setCalendarOpen(false);
  };

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() - 1,
      1
    );

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previousMonth < currentMonth) {
      return;
    }

    setVisibleMonth(previousMonth);
  };

  const goToNextMonth = () => {
    setVisibleMonth(
      new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    setVisibleMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    handleDateSelect(today);
  };

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        sm:p-6
      "
    >
      {/* Header */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#EAF7F8]
            text-[#087E8B]
          "
        >
          <Clock3 size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#102A43]">
            Expected Delivery
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Let us know when your supply should be delivered.
          </p>
        </div>
      </div>

      {/* Date */}

      <div className="mt-6">
        <label
          htmlFor="estimatedDeliveryDate"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Required Delivery Date
        </label>

        <div
          ref={calendarRef}
          className="relative"
        >
          {/* Date Button */}

          <button
            id="estimatedDeliveryDate"
            type="button"
            onClick={() =>
              setCalendarOpen((open) => !open)
            }
            className={`
              flex
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              bg-white
              py-3.5
              pl-4
              pr-4
              text-left
              outline-none
              transition
              ${
                errors.estimatedDeliveryDate
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 hover:border-slate-300 focus:border-[#087E8B]"
              }
            `}
          >
            <CalendarDays
              size={18}
              className="shrink-0 text-slate-400"
            />

            <span
              className={
                formattedSelectedDate
                  ? "text-sm font-medium text-slate-900"
                  : "text-sm text-slate-400"
              }
            >
              {formattedSelectedDate ||
                "Select delivery date"}
            </span>
          </button>

          {/* Calendar */}

          {calendarOpen && (
            <div
              className="
                absolute
                left-0
                right-0
                top-[calc(100%+8px)]
                z-50
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_18px_45px_rgba(15,42,67,0.16)]
              "
            >
              {/* Calendar Header */}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  disabled={isCurrentMonth(
                    visibleMonth,
                    today
                  )}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-800
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                  aria-label="Previous month"
                >
                  ‹
                </button>

                <div className="text-center">
                  <p className="text-sm font-bold text-[#102A43]">
                    {monthLabel}
                  </p>

                  <button
                    type="button"
                    onClick={goToToday}
                    className="
                      mt-0.5
                      text-[11px]
                      font-semibold
                      text-[#087E8B]
                      transition
                      hover:text-[#066b76]
                    "
                  >
                    Today
                  </button>
                </div>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    text-slate-500
                    transition
                    hover:bg-slate-100
                    hover:text-slate-800
                  "
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              {/* Weekdays */}

              <div className="mt-4 grid grid-cols-7 gap-1">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map((day) => (
                  <div
                    key={day}
                    className="
                      py-1.5
                      text-center
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wide
                      text-slate-400
                    "
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days */}

              <div className="mt-1 grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="h-10"
                      />
                    );
                  }

                  const disabled = isBefore(
                    date,
                    today
                  );

                  const selected =
                    selectedDate &&
                    isSameDay(date, selectedDate);

                  const todayDate =
                    isSameDay(date, today);

                  const currentMonth =
                    date.getMonth() ===
                    visibleMonth.getMonth();

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        handleDateSelect(date)
                      }
                      className={`
                        relative
                        flex
                        h-10
                        w-full
                        items-center
                        justify-center
                        rounded-xl
                        text-sm
                        font-medium
                        transition
                        ${
                          !currentMonth
                            ? "text-slate-300"
                            : disabled
                              ? "cursor-not-allowed text-slate-300"
                              : selected
                                ? "bg-[#087E8B] text-white shadow-sm"
                                : "text-slate-700 hover:bg-[#EAF7F8] hover:text-[#087E8B]"
                        }
                      `}
                    >
                      {date.getDate()}

                      {todayDate &&
                        !selected && (
                          <span
                            className="
                              absolute
                              bottom-1
                              h-1
                              w-1
                              rounded-full
                              bg-[#087E8B]
                            "
                          />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Calendar Footer */}

              <div
                className="
                  mt-4
                  border-t
                  border-slate-100
                  pt-3
                "
              >
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={15}
                    className="text-[#087E8B]"
                  />

                  <p className="text-xs text-slate-500">
                    {selectedDate
                      ? `Delivery: ${formattedSelectedDate}`
                      : "Choose your required delivery date"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {errors.estimatedDeliveryDate && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.estimatedDeliveryDate}
          </p>
        )}
      </div>

      {/* Time */}

      <div className="mt-5">
        <label
          htmlFor="estimatedDeliveryTime"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Required Delivery Time
        </label>

        <div className="relative">
          <Clock3
            size={18}
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            id="estimatedDeliveryTime"
            type="time"
            value={
              deliveryDetails.estimatedDeliveryTime || ""
            }
            onChange={(event) =>
              handleChange(
                "estimatedDeliveryTime",
                event.target.value
              )
            }
            className={`
              w-full
              rounded-2xl
              border
              bg-white
              py-3.5
              pl-11
              pr-4
              text-sm
              text-slate-900
              outline-none
              transition
              ${
                errors.estimatedDeliveryTime
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-200 focus:border-[#087E8B]"
              }
            `}
          />
        </div>

        {errors.estimatedDeliveryTime && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.estimatedDeliveryTime}
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------- Date Helpers ---------- */

function parseDate(value) {
  if (!value) {
    return null;
  }

  const parts = value.split("-").map(Number);

  if (parts.length !== 3) {
    return null;
  }

  const [year, month, day] = parts;

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function formatDateForInput(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
}

function isBefore(date, comparisonDate) {
  return (
    startOfDay(date) < startOfDay(comparisonDate)
  );
}

function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() ===
      secondDate.getFullYear() &&
    firstDate.getMonth() ===
      secondDate.getMonth() &&
    firstDate.getDate() ===
      secondDate.getDate()
  );
}

function isCurrentMonth(month, today) {
  return (
    month.getFullYear() ===
      today.getFullYear() &&
    month.getMonth() ===
      today.getMonth()
  );
}

function getCalendarDays(month) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(
    year,
    monthIndex,
    1
  );

  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0
  ).getDate();

  const startingDay = firstDay.getDay();

  const days = [];

  for (
    let index = 0;
    index < startingDay;
    index += 1
  ) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= daysInMonth;
    day += 1
  ) {
    days.push(
      new Date(
        year,
        monthIndex,
        day
      )
    );
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

export default ArrivalDetailsCard;