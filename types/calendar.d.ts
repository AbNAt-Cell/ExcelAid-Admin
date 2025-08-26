export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  image?: string
  type: 'client-meeting' | 'festival' | 'staff-meeting' | 'general-meeting'
}

export interface CalendarEvent extends Event {
  start: Date
  end: Date
}

