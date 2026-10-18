# Aswin Soumya Wedding Reverie

PROJECT: ASWIN & SOUMYA — CINEMATIC WEDDING INVITATION
WEBSITE TO REDESIGN:
https://aswinwedssoumya.vercel.app/
DESIGN INSPIRATION:
https://saveourdate.in/templates/azure-dreams/live
OBJECTIVE
Redesign the existing wedding invitation into a premium, cinematic, interactive, mobile-first experience. Preserve the existing wedding information, family details, and essential content.
I have limited Lovable credits. Implement the complete website in one pass without asking for intermediate approvals.
Before implementing, inspect the existing project, its content, available assets, and the reference UI images I have added to Resources.
Use the current website as the source for wedding information and the inspiration website for visual direction. Follow the supplied reference UI images closely when implementing the envelope and scenic cover.
Do not replace the design with a generic wedding template.
1. VISUAL DIRECTION
Create an elegant, romantic experience inspired by premium wedding stationery, South Indian aesthetics, and editorial photography.
Colour palette:
- Warm ivory: #F8F5EE
- Soft ivory: #FFFCF7
- Powder blue: #DCE8F0
- Champagne gold: #C5A66A
- Deep blue-grey: #354957
- Warm charcoal: #292B2D
Use refined serif typography for the couple's names, headings, and dates, complemented by a clean sans-serif for supporting information.
Keep the design sophisticated, natural, and uncluttered. Avoid glassmorphism, excessive gradients, unnecessary icons, and heavy shadows.
Both the bride and groom are Hindu. Keep the design culturally appropriate.
2. WEBSITE STRUCTURE
The experience consists of two introductory screens followed by one continuous scrolling page.
SCREEN 1: Full-screen envelope.
SCREEN 2: Scenic wedding invitation cover.
SCROLLING SECTIONS:
1. Wedding announcement.
2. Wedding countdown.
3. Wedding events.
4. Family details.
5. Couple photo gallery.
6. Closing message.
Do not create separate pages for these sections or repeat information unnecessarily.
3. SCREEN 1 — ENVELOPE
Use the approved envelope image in Resources.
The envelope must fill the entire viewport edge-to-edge, particularly on mobile, with no visible margins or floating-card styling.
Visual details:
- Warm ivory paper.
- Subtle embossed floral patterns.
- Delicate gold detailing.
- A prominent metallic-gold wax seal.
Keep the floral embossing understated so the seal remains the focal point.
INTERACTION:
Only the gold seal should be clickable.
When tapped, the seal should respond subtly, followed by an elegant envelope-opening animation with a 3D flap effect and an invitation card sliding out.
Transition smoothly into the scenic cover.
Keep the animation short and reliable. If a convincing 3D animation is impractical, use a subtle seal-release effect followed by a smooth transition.
Do not add an Open button or make the entire envelope clickable.
4. SCREEN 2 — SCENIC COVER
Use the approved scenic artwork in Resources.
The scene features:
- An elegant stone arch.
- Hanging green vines and delicate white blossoms.
- Soft ivory curtains.
- A beautiful mountain landscape.
- A reflective lake.
- Golden-hour sunlight.
- Three to six small flowers floating on the water.
- Gentle ripples and reflections.
Preserve the artwork's visual beauty. Do not introduce houses, obstruct the water with foreground steps, or make the scene excessively dark.
Display the following text:
ശുഭ വിവാഹം
THE WEDDING OF
Aswin & Soumya
SUNDAY
29
NOVEMBER 2026
The couple's names must be the primary focal point. Ensure excellent contrast, readability, and responsive positioning.
If the artwork already contains the wedding typography, do not duplicate it with HTML text.
A subtle scroll indicator may appear near the bottom.
5. WEDDING ANNOUNCEMENT AND COUNTDOWN
Preserve the existing invitation message and Malayalam wording where applicable.
Create an elegant announcement section with refined typography and restrained decorative details.
Include a live countdown to 29 November 2026, using the Asia/Kolkata time zone. Display days, hours, minutes, and seconds. Handle the completed state correctly after the wedding date.
6. WEDDING EVENTS
Create one consolidated Wedding Events section with two numbered events, inspired by the editorial presentation of the reference website.
01 — WEDDING CEREMONY
Date: Sunday, 29 November 2026
Time: 11:30 AM – 12:30 PM
Venue: St. Mathews Knanaya Church, Njaliyakuzhi, Vakathanam
02 — POST-WEDDING RECEPTION
Date: Sunday, 29 November 2026
Time: 6:00 PM
Venue: St. Mary's Knanaya Catholic Church, Kothanalloor
Preserve the existing Google Maps links from the current website:
- St. Mathews Knanaya Church: https://www.google.com/maps/search/?api=1&query=St.+Mathews+Knanaya+Church+Njaliyakuzhi+Vakathanam
- St. Mary's Knanaya Catholic Church: https://www.google.com/maps/search/?api=1&query=St+Mary%27s+Knanaya+Catholic+Church+Kothanalloor
Present event names, dates, times, and venues clearly, with elegant typography and subtle dividers.
Provide a minimal Events shortcut after the envelope has been opened. It should take guests directly to this section.
Do not invent venue details or map destinations.
7. FAMILY DETAILS
Preserve these details exactly.
BRIDE — SOUMYA
Daughter of C P Satheesan & Sobhana
Chorickanpara, Puthenchandha P O, Vakathanam, Kottayam.
GROOM — ASWIN
Son of Anandan & Lali
Vadakkirickal House, Kothanalloor, Kottayam.
Include the existing invitation wording acknowledging their families, relatives, and well-wishers:
"Together with their families, relatives and well-wishers."
Use an elegant, balanced layout that works well on mobile. Do not invent additional family information.
8. PHOTO GALLERY
Create a premium editorial gallery using genuine couple photographs available in the project:
https://aswinwedssoumya.vercel.app/photo1.jpg
https://aswinwedssoumya.vercel.app/photo2.jpg
https://aswinwedssoumya.vercel.app/photo3.jpg
https://aswinwedssoumya.vercel.app/photo4.jpg
Use a balanced mix of portrait and landscape images with thoughtful spacing and cropping.
Implement a functional lightbox with:
- Previous and next navigation.
- A close control.
- Touch-friendly interactions.
- Keyboard navigation on desktop.
- Smooth opening and closing.
- Return to the original gallery position after closing.
Add subtle image-reveal animations and restrained hover effects. Avoid excessive movement and unnecessary animation.
If genuine photographs are unavailable, use clearly identifiable replaceable placeholders rather than fabricated couple photographs.
Lazy-load gallery images where appropriate.
9. CLOSING SECTION
Finish with a warm, elegant closing message using the existing verified content and blessings:
"Your presence and blessings will make our day complete."
"Soumya & Aswin"
"29 NOVEMBER 2026 · VAKATHANAM, KOTTAYAM"
Maintain the same visual style, with refined typography and restrained decorative details.
10. RESPONSIVENESS AND IMPLEMENTATION
Make the entire experience responsive, prioritising mobile devices opened through WhatsApp.
Ensure:
- The envelope fills the viewport.
- Text remains readable on small screens.
- The scenic cover crops appropriately.
- Scrolling works naturally.
- All interactions function on touchscreens.
- There is no horizontal overflow.
- The gallery and lightbox work on mobile and desktop.
- Reduced-motion preferences are respected.
Reuse the existing framework, components, and dependencies wherever practical. Keep wedding information maintainable and avoid unnecessary architectural changes.
FINAL REQUIREMENT
Implement the complete website in one pass, using the supplied reference UI images and existing wedding information.
Prioritise visual quality, accurate content, a reliable envelope-opening interaction, mobile usability, and a polished gallery.
Test the main interactions and fix obvious problems before finishing. Do not stop at a static mockup.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5979583c-fad0-4fb0-a8ee-a967ec37440d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
