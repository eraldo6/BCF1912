# BC Frankfurt 1912 - Website Tasks

## 1. Improve Header Banner Navigation
**Description:** Reorganize and restructure the header banner items (currently: club disciplines, experience, etc.) for better UX and logical flow.

**Implementation:**
- Review current navigation order in the header component
- Consider user journey: About → Disciplines → Facilities → Events → Contact
- Update navigation links and translations (EN/DE)
- Ensure mobile responsiveness

---

## 2. Improve German Translation Text
**Description:** Review and enhance the German version text quality across all pages for better readability and native feel.

**Implementation:**
- Audit all German translations in the i18n/translation files
- Check for awkward phrasing, grammar issues, and consistency
- Ensure billiards/snooker terminology is accurate in German
- Update translation files with improved copy

---

## 3. Record Hero Video
**Description:** Create and integrate the main hero section video showcasing the club atmosphere and facilities.

**Implementation:**
- Record high-quality footage of club interior, tables, and atmosphere
- Edit video to 15-30 seconds, optimized for web (MP4, max 5MB)
- Add video to `/public/videos/` directory
- Update hero section component to use the new video

---

## 4. Record Discipline Videos
**Description:** Create individual showcase videos for each of the three billiards disciplines.

**Implementation:**
- Record 3 short videos (10-15 seconds each): Pool, Snooker, Carom
- Showcase gameplay and table specifics for each discipline
- Optimize for web delivery (MP4 format, compressed)
- Update discipline cards/sections with embedded videos

---

## 5. Improve "More Than Tables" Section
**Description:** Redesign the diagram for 10 match-grade tables, reduce empty space in "tournament cloth" section, and reflow layout.

**Implementation:**
- Create better visual diagram/infographic for the 10 tables layout
- Reduce vertical spacing in the "tournament cloth every summer" section
- Reflow the 3 subsections into the reclaimed space using CSS Grid/Flexbox
- Ensure responsive layout on mobile devices

---

## 6. Improve "Atmosphere in Still Frames" Section
**Description:** Enhance the photo gallery section with better images and layout.

**Implementation:**
- Replace current images with higher quality photos
- Add proper image optimization (WebP format, lazy loading)
- Consider implementing a lightbox/modal for enlarged views
- Update image grid layout for better visual flow

---

## 7. Replace "Tournaments & Events" with Live Tournament Feed
**Description:** Transform static promotions section into dynamic upcoming tournaments feed from CueScore API.

**Implementation:**
- Research CueScore API endpoints for tournament data
- Create API integration to fetch upcoming tournaments
- Design tournament card component with date, format, and registration link
- Add loading states and error handling
- Update section heading to "Upcoming Tournaments"

---

## 8. Update Contact Email Addresses
**Description:** Replace placeholder emails with actual club contact addresses and remove excess spacing in the "Private Club" section.

**Implementation:**
- Update email addresses in contact section component
- Remove unnecessary margin/padding in "This is a private club not a public bar" section
- Verify email links work correctly (mailto: links)
- Update both EN and DE versions

---

## 9. Improve Footer Design and UX
**Description:** Streamline footer by removing unnecessary items and improving user experience.

**Implementation:**
- Audit current footer links and sections
- Remove redundant or low-value links
- Reorganize remaining items into logical groups (About, Contact, Social, Legal)
- Improve visual hierarchy and spacing
- Ensure mobile-friendly layout

---

## 10. Improve Calendar/Games Section
**Description:** Recreate the league games calendar from the old website to display the upcoming season schedule.

**Implementation:**
- Review old website calendar structure and data source
- Design calendar/schedule component with date, opponent, venue, results
- Fetch or manually add season game data (consider CMS or JSON file)
- Add filters for team/league if multiple teams exist
- Style table/list view with responsive design

---

## 11. Improve Scrolling Banner Text
**Description:** Enhance the scrolling text banner with faster animation speed and implement infinite smooth scrolling.

**Implementation:**
- Locate the scrolling banner component (likely in header or hero section)
- Increase animation speed by reducing the `animation-duration` in CSS or adjusting speed prop
- Implement infinite scroll by duplicating content and using seamless loop animation
- Use CSS `animation: scroll Xs linear infinite` or Framer Motion for smooth continuous scroll
- Ensure no gaps or jumps when the animation loops
- Test performance and adjust timing for optimal readability
