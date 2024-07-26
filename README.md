# Pomadorable

A simple Pomodoro timer Chrome Extension.

- configurable rest and work intervals, (does not support long rests after x pomodoros)
- dark and light theme support
- operations: reset current interval, skip, and start timer
- to stop the extension close the popup using the x icon in the top right corner
- toolbar badge updates when intervals change

## Scripts

Build for production - `npm run build`
Lint - `npm run lint`
Format (prettier) - `npm run format`

## Run Extension in Browser

Build extension
`npm run build`

Open Chrome and follow these instructions loading unpacked extensions: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

Don't forget to pin the extension once it's loaded!

## Main Files

`src/popup/index.tsx` - default popup that opens in the toolbar when the icon is clicked

`src/background/index.ts` - service worker

`manifest.json` - defines extension settings

## Tooling & Dependencies

- React
- Typescript
- TailwindCSS
- Vite
- Chrome Extension API
- Hero Icons

## Things to add...

### Tests!

This extension was tested manually but automated tests are necessary for deployment and further development. For unit tests I like to use Jest and React Testing Library and for e2e tests I use Cypress (but I need to re-evaluate in light of current testing library trends).

### Icons for Chrome Web Store

I only included one logo icon sized 128x128 for illustration purposes, but more sizes are required for publishing.

### Notification

I would like to add a notification or sound to inform the user when the interval has completed when the popup is closed. For now the current interval is always shown on the toolbar badge but more can be done for better UX.

### Component Library

Irl it would be best to use a community developed component library like NextUI or MUI to ensure code quality, great UX, and accessability.
