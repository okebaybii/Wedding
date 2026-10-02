export interface CalendarEventParams {
  title: string
  description: string
  location: string
  startDate: string // YYYY-MM-DDTHH:mm:ss
  durationHours?: number
}

function formatDateToIcsString(date: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(
    date.getUTCHours(),
  )}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
}

export function getGoogleCalendarUrl(params: CalendarEventParams): string {
  const start = new Date(params.startDate)
  const duration = params.durationHours ?? 4
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000)

  const startFormatted = formatDateToIcsString(start)
  const endFormatted = formatDateToIcsString(end)

  const url = new URL('https://calendar.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', params.title)
  url.searchParams.set('dates', `${startFormatted}/${endFormatted}`)
  url.searchParams.set('details', params.description)
  url.searchParams.set('location', params.location)

  return url.toString()
}

export function downloadIcsFile(params: CalendarEventParams): void {
  const start = new Date(params.startDate)
  const duration = params.durationHours ?? 4
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000)

  const startFormatted = formatDateToIcsString(start)
  const endFormatted = formatDateToIcsString(end)
  const nowFormatted = formatDateToIcsString(new Date())

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Webdding//Wedding Invitation//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@webdding.vn`,
    `DTSTAMP:${nowFormatted}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${params.location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'le-cuoi-minh-quan-thao-my.ics')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
