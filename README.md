# Motion Graphics (Remotion + TypeScript)

A clean, neutral starting point for building animated graphics in code and exporting
them to any video editor (Premiere, DaVinci Resolve, Final Cut, CapCut, …).

## Quick start

```bash
npm install
npm run studio      # live preview at http://localhost:3000
```

Requires Node 18+ (Node 20/22 recommended). Pinned to Remotion 4.0.535 with zod 4.5.4 — keep all `remotion` / `@remotion/*` versions identical. On first render, Remotion downloads a
headless Chrome automatically.

## Project layout

```
src/
  config.ts          # canvas (width/height/fps), sec() helper, title-safe margin, neutral theme
  fonts.ts           # Google font loading via @remotion/google-fonts (Inter)
  Root.tsx           # registers every composition
  index.ts           # entry point (registerRoot)
  lib/anim.ts        # useScale(), useSafe(), useEnterExit() shared helpers
  compositions/      # one file per graphic
public/              # fonts/, images/, audio/ (referenced with staticFile())
out/                 # renders land here
```

## Starter compositions

| ID            | What it is                                  | Background   |
|---------------|---------------------------------------------|--------------|
| `TitleCard`   | Title + accent line + subtitle              | solid colour |
| `LowerThird`  | Name/role bar with wipe in / wipe out       | transparent  |
| `KineticText` | Staggered word-by-word spring text          | solid colour |
| `OverlayBadge`| Pill badge ("LIVE") in a chosen corner      | transparent  |

Each has a zod schema + `defaultProps`, so you can edit text, colours, and options live
in the Studio's right-hand **Props** panel. Every one fades/animates in at the start and
fully animates out at the end, so nothing pops or cuts mid-motion.

## Changing resolution / frame rate

Edit **one place**: `src/config.ts`

```ts
export const VIDEO = {width: 3840, height: 2160, fps: 60} as const;  // 4K / 60fps
```

All sizes are multiplied by `useScale()` (width ÷ 1920) and all durations are written in
seconds via `sec()`, so layouts and timing stay the same when you change either value.

You can also render at a higher resolution without editing anything:

```bash
npx remotion render TitleCard out/title-card-4k.mp4 --scale=2
```

## Rendering / exporting

Replace `<CompositionId>` with an ID from the table above (e.g. `TitleCard`).

**MP4 (H.264) — opaque graphics (title card, kinetic text):**

```bash
npx remotion render <CompositionId> out/<name>.mp4 --codec=h264 --crf=18
```

**MOV with alpha (ProRes 4444) — transparent overlays (lower third, badge):**

```bash
npx remotion render <CompositionId> out/<name>.mov \
  --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png
```

**PNG sequence with alpha (works in every editor):**

```bash
npx remotion render <CompositionId> out/<name> --sequence --image-format=png \
  --image-sequence-pattern='frame-[frame].[ext]'
```

> Frame numbers are zero-padded automatically to fit the length (e.g. `frame-000.png` … `frame-119.png`).
> Change the name by editing the `--image-sequence-pattern` value.

> The three flags that make alpha work for ProRes are `--codec=prores`,
> `--pixel-format=yuva444p10le`, and `--image-format=png`. Leave any of them out and the
> transparency is lost.

Examples:

```bash
npx remotion render OverlayBadge out/overlay-badge.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png
npx remotion render LowerThird out/lower-third --sequence --image-format=png --image-sequence-pattern='frame-[frame].[ext]'
npx remotion render TitleCard out/title-card.mp4 --codec=h264 --crf=18
```

Shortcuts: `npm run render:title`, `npm run render:overlay`.

Tip: in the Studio, transparent compositions show a checkerboard behind them. If you see
a solid colour, something in the tree is drawing a background.

## Adding a new graphic

1. Create `src/compositions/MyGraphic.tsx`:

   ```tsx
   import {AbsoluteFill} from 'remotion';
   import {z} from 'zod';
   import {zColor} from '@remotion/zod-types';
   import {fontFamily} from '../fonts';
   import {useEnterExit, useScale} from '../lib/anim';

   export const myGraphicSchema = z.object({text: z.string(), color: zColor()});
   export type MyGraphicProps = z.infer<typeof myGraphicSchema>;
   export const myGraphicDefaults: MyGraphicProps = {text: 'Hello', color: '#ffffff'};

   export const MyGraphic: React.FC<MyGraphicProps> = ({text, color}) => {
     const s = useScale();
     const {opacity} = useEnterExit();
     return (
       <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', fontFamily}}>
         <div style={{fontSize: 80 * s, color, opacity}}>{text}</div>
       </AbsoluteFill>
     );
   };
   ```

2. Register it in `src/Root.tsx`:

   ```tsx
   <Composition
     id="MyGraphic"
     component={MyGraphic}
     durationInFrames={sec(4)}
     fps={VIDEO.fps}
     width={VIDEO.width}
     height={VIDEO.height}
     schema={myGraphicSchema}
     defaultProps={myGraphicDefaults}
   />
   ```

3. It appears in the Studio sidebar immediately. Render it with `npx remotion render MyGraphic out/my-graphic.mp4`.

Per-composition `fps`, `width`, `height` can differ from the shared defaults (e.g. a
vertical 1080×1920 graphic) — just pass different values to that `<Composition>`.

## Fonts

`src/fonts.ts` loads **Inter** with `@remotion/google-fonts`. To switch fonts, change the
import (`@remotion/google-fonts/Poppins`, etc.) and keep exporting `fontFamily`.
For local fonts, put the file in `public/fonts/` and load it with `FontFace` + `staticFile()`
(example in the comment inside `fonts.ts`).

## Sound effects

Put audio in `public/audio/`, then place it inside a `<Sequence>` so you control exactly
which frame it starts on. `TitleCard` has a working example behind its `playSound` prop
(toggle it in the Props panel):

```tsx
import {Html5Audio, Sequence, staticFile} from 'remotion';

<Sequence from={15}>                       {/* start the sound at frame 15 */}
  <Html5Audio src={staticFile('audio/whoosh.wav')} volume={0.6} trimBefore={0} />
</Sequence>
```

- `from` — the frame the sound starts at (use `sec(0.5)` for "half a second in").
- `trimBefore` — frames to skip at the start of the file (use this to cut leading silence).
- `volume` — 0 to 1, or a function of the frame for fades.

Audio is included in MP4 renders. ProRes `.mov` and PNG sequences from overlays are
usually silent; add the sound effect in your editor or render audio separately with
`--codec=mp3` / `--codec=wav`.

## Tips

- **Title-safe area:** keep text inside the central 90% of the frame (5% margin per edge).
  `useSafe()` returns those margins; `SAFE_MARGIN` in `config.ts` controls them.
- **Always give animations a full enter and exit.** `useEnterExit()` drives both from the
  composition length, so the first and last frames are fully hidden and clips cut cleanly
  in your editor. Leave a little room (about 0.5s) before and after the "hold".
- **Trim leading silence on sound effects.** If a whoosh has 80ms of silence before the
  sound, the hit will feel late. Use `trimBefore` or trim the file.
- Use `sec()` for durations and `useScale()` for sizes so changing resolution/fps never
  breaks your layout.
- Keep one transparent overlay per file so each can be dropped on its own video track.
- Keep graphics `durationInFrames` slightly longer than needed; trimming in the editor is
  easier than extending.

## Scripts

| Command                | What it does                      |
|------------------------|-----------------------------------|
| `npm run studio`       | Live preview / props editor       |
| `npm run typecheck`    | TypeScript check                  |
| `npm run render:title` | Render the title card to MP4      |
| `npm run render:overlay` | Render the badge to ProRes 4444 |
| `npm run build`        | Bundle for deployment             |
