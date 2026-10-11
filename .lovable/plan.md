# KZN Masjids – Product Requirements (Features Only)

## Purpose
One place for Muslims in KwaZulu-Natal to find masjids and musallahs, check salaah times, and keep up with community notices.

## Target Users
- People looking for the nearest masjid or the next salaah
- Travellers in KZN who need a nearby jamaat time
- Masjid committees who share notices and fundraising projects

## Core Features

### 1. Live Salaah Times
- Today's salaah times for Durban (Fajr, Dhuhr, Asr Shafi'i and Hanafi, Maghrib, Isha)
- Shows the next salaah with a live countdown
- Uses saved backup times if the live source can't be reached

### 2. Nearby Masjids
- Finds masjids near the user based on their location
- Adjustable search distance
- Three views:
  - Nearby: sorted by distance
  - Upcoming: the next salaah at each masjid and how long until it starts
  - Info: distance and address
- Directions to any masjid

### 3. Find Masjids & Musallahs
- Browse by region: Durban, North Coast, South Coast, Midlands, Northern Natal, and others
- Each region splits into sub-regions (South Coast includes Transkei)
- Shows how many masjids are in each sub-region

### 4. Salaah Time Filters
- Choose a region, then an optional sub-region
- Time blocks for Fajr, Dhuhr, Asr and Isha list the jamaat times available in that area
- Choosing a time lists every masjid and musallah with salaah at that time
- Two ways to view results: Table and Block
- Marks the earliest and latest masjid for each salaah
- Results heading updates to match the chosen region and sub-region
- Directions from each result

### 5. Notices & Events
- Slideshow of community notices, posters and events
- Tabs for Upcoming, Jumuah and Info
- Notices are loaded from an online sheet, so committees can update them without changing the site
- Supports images stored in Google Drive

### 6. Community Stats
- Counters for things like total masjids, musallahs and regions covered

### 7. Support New Masjids
- Shows masjid building projects that need funding
- Project details, images and progress

### 8. Masjid Audio (supporting feature)
- Audio from masjids, such as adhan or lectures

## Data Needs
- Masjid list: name, type (masjid or musallah), region, sub-region, address, location, and jamaat times per salaah
- Notices: image, title, category
- Projects: name, images, funding target and progress

## Suggested Next Steps (not built yet)
- Admin login so masjid committees can update their own times and notices
- Move masjid data from sample data into a real database
- Favourite masjids and salaah reminders
- Jumuah times and khutbah language
- Ramadan timetables and Eid salaah times
