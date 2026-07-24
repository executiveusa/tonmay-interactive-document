import { Project } from '../types/schema';

/**
 * Calendar Utilities — Apple Calendar (.ics) and Google Calendar Deep Links
 */

export function generateIcsContent(project: Project): string {
  const startDateStr = '20260830T120000';
  const endDateStr = '20260830T150000';
  const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TonMay Productions//TonMay Studio OS//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:tonmay-${project.id}-${Date.now()}@tonmayproductions.com`,
    `DTSTAMP:${nowStr}`,
    `DTSTART;TZID=America/Los_Angeles:${startDateStr}`,
    `DTEND;TZID=America/Los_Angeles:${endDateStr}`,
    `SUMMARY:TonMay Shoot: ${project.name}`,
    `DESCRIPTION:${project.slogan || 'TonMay Productions session'} - Venue: ${project.location}`,
    `LOCATION:${project.address || project.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadIcsFile(project: Project): void {
  const content = generateIcsContent(project);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `TonMay_${project.name.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getGoogleCalendarUrl(project: Project): string {
  const title = encodeURIComponent(`TonMay Shoot: ${project.name}`);
  const details = encodeURIComponent(`TonMay Productions Session: ${project.slogan || ''}\nLocation: ${project.location}`);
  const location = encodeURIComponent(project.address || project.location || '');
  const dates = '20260830T190000Z/20260830T220000Z'; // UTC conversion for 12pm-3pm PST

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
