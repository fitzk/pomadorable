# Pomadorable

A simple Pomodoro timer Chrome Extension.

## Features

- Configurable rest and work intervals, (does not support [long rests](https://todoist.com/productivity-methods/pomodoro-technique))
- Dark and light themes
- Timers that persist when browser is closed, continuing upon reopening browser
- Toolbar badge that updates when intervals change

## Usage

- buttons for resetting, starting, and skipping intervals
- "x" icon stops the timer and closes the popup
- "-" icon minimizes popup

## Scripts

- `npm run build`: Build for production
- `npm run lint`: Lint
- `npm run format`: Format (prettier)

## Run Extension in Browser

Install deps & build the extension

```shell
npm run install
npm run build
```

Then, open Chrome and follow these instructions for loading unpacked extensions: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

**NOTE:** Pin the extension once it's loaded so you can open the popup and see the badge updates

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

### Notifications

I would like to add a notification or sound to inform the user when the interval has completed when the popup is closed. For now the current interval is always shown on the toolbar badge but more can be done for better UX.

### Component Library

It would be best to use a community developed component library like NextUI or MUI to ensure code quality, great UX, and accessability.

### Icons for Chrome Web Store

I only included one logo icon sized 128x128 for illustration purposes, but more sizes are required for publishing.

### No Pause Button

I would like to add a button to pause the current interval in the future.
