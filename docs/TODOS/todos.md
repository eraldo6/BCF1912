-> translations -> mobile version -> Spacing bei EN/DN

# Todos before first release

## Bigger sections

Mitgliedschaft Subpage gestalten -> BCF Files hinterlegen (Satzung, Datenschutzerklärung)
(Eraldo) Disziplinen Section gestalten
(Eraldo) Vereinsheim Section gestalten
Mobile Layout (Breakpoints, Nav(Hamburger))
Cookie Banner
Datenschutz Subpage
Impressum & Vorstand Subpage
File Struktur aufräumen + sectionnumbers prüfen + alle Bindestriche aus in DE und EN(ganz am Ende)

## kleinere todos oder bugfixes

## With Sydney

text content drüber schauen und bearbeiten
Disciplines (Karambol, Pool, Snooker) echte Beschreibungen
Mitgliedschaftstexte überarbeiten (selber gucken auf alter Seite)
Platzhalter Mail durch echte Mails ersetzen
regelmäßiges training mit Trainern in allen Sparten erwähnen?
Termin Datenbank füllen mit ihm zusammen (Newsbeiträge, Mannschaftstrainings, Trainings mit David, Turniere)
exisiteren diese Emailadressen?
sind diese Satzungen noch aktuell? Richtige Satzungen hinterlegen
mitgliederanzahl auf hero prüfen "240+ Mitglieder"

# GoLive

klappt alles mit den Admin Accounts?
learn about Vercel Analysis Interface, how does it work?
vercel einrichten
env vars einrichten
dns umzeigen
wie läuft das jetzt gerade? Wie kriegen wird die Url?
Wie viel wird das kosten
Cronjob aktivieren
durchgehen von typischen cyber-security-issues und web-cyber-security-issues
darf ich überhaupt fetchen?
SSL Zertifikat
XML Sitemaps und robots.txt (Was ist das?)
XSS-Absicherung bei dangerouslySetInnerHTML prüfen (Bevor Admin Crud für Beiträge aktiv ist [ ] DOMPurify einbauen. Was ist DOMPurify?)
RLS UPDATE-Policies für beitraege und veranstaltungen prüfen
StorageBucket Listing Policy einschränken (Zu breite SELECT-Policy erlaubt Dateilisten-Zugriff im media Bucket)
Privater Storage-Bucket für Entwurfs-bilder (Aktuell sind Bilder unveröffentlichter Beiträge über direkte URL abrufbar)
Cookie und Datenschutz Hinweise einbauen
Was ist mit Bildrechten? Oder Bausteine der Website oder Programmierbausteine der Website?
Impressum Seite legalmachen
Resend eigene Domain verifizieren (E-Mails kommen aktuell von onboarding@resend.dev und landen im Spam — eigene Adresse wie noreply@bcfrankfurt.de einrichten, braucht DNS-Zugriff)

# Weiß nicht ob davor oder danach

mobile version
Termin teilen Funktion editieren wegen Whatsapp

# Second release

## bigger ideas

Record Hero Video
Record Discipline Video
Vorstand Bilder
Vorstandspage gestalten
Verheinshistorie Page gestalten
Sportbetrieb und Mannschaften Page gestalten
CueSore Tournament Import aktivieren (?)
CueScore Score and Ranking Board
Admin Dashboard: dynamische Storage Anzeige
Admin Dashboard: DE/EN Übersetzung
Was ist Seo? How do i use it the best way? How can i integrate it more?

## little things

Admin Dashboard: Veranstaltungen Tabelle in Termine umbenennen
Admin Dashboard: Austragungsort kann anders eingetragen werden, hat aber keine Auswirkungen
auto testtabelle in Supabase löschen
Admin Dashboard: Bug "+ Neuer Termin" Btn veschwindet bei 0 Einträgen
Bug News-Card Hover-farblicher Streifen unten
Admin Dashboard: Edit Modal "Änderungen speichern" nur aktiv wenn Feld geändert
Was passiert bei keinen news Beiträgen
DB-Spaltenbreiten mit App-Validierung synchronisieren (Zeichenlimits in DB und Admin-Formular müssen immer übereinstimmen — wenn eins geändert wird, das andere auch anpassen)
News-Artikel Detailseiten /beitraege/[slug] (eigene Unterseite pro Artikel bauen, auf der der volle Text zu lesen ist)
Galerie-Bilder EXIF-Rotation korrigieren (Handy-Fotos sind manchmal falsch gedreht gespeichert — beim Upload automatisch korrekt ausrichten)
Scrolling Banner verbessern (Marquee schneller machen und nahtlosen Loop ohne sichtbaren Sprung einbauen)
Zeilenumsprung wenn auf EN geschaltet -> Upcoming Tournaments

## Other

Google Eintrag
Sunday Breakout Poster
