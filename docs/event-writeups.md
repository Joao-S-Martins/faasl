# Event write-ups with photos and video

How to give a past event its own page with a story, photos and short video clips. The sample is `src/content/event-writeups/2026-05-17-sample-spring-concert.md` ([on beta](https://faasl-beta.faasl.workers.dev/events/2026-05-17-sample-spring-concert)); copy it to start.

Related: the Gallery entry in the component catalog (`/design/components`, beta) · [`astro-extensibility.md`](./astro-extensibility.md) §2 (why PhotoSwipe) · [`brief.md`](./brief.md) §5.1 (photos of minors)

---

## What you get

- **The event keeps its page** (`/events/<name>`) after it has passed. Past events without a write-up drop off at the weekly refresh.
- **A "What happened" section** with your text.
- **A "Photos and video" grid**: square thumbnails, 2 across on phones, 3 on tablets, 4 on desktops, each with an optional caption.
- **A full-screen lightbox:** tap a thumbnail to open it, swipe or use the arrow keys between slides, pinch or double-tap to zoom photos. Clips play there with the browser's own controls, and stop when you swipe away.
- **Search engines see everything:** each thumbnail is a plain link to the full photo, with its alt text and caption in the page.
- **The share image** for Facebook, texts and Google is the write-up's `cover`, or else its first photo.

## Steps

### 1. Name it

Use the event's page address: the date, then the event's name in lowercase with dashes. The event's page on the site shows it, e.g. `/events/2026-11-07-festival-das-filarmonicas-2026` → `2026-11-07-festival-das-filarmonicas-2026`.

That one name is used three times:

```
src/content/event-writeups/
├── 2026-11-07-festival-das-filarmonicas-2026.md    ← the write-up
└── 2026-11-07-festival-das-filarmonicas-2026/      ← its photos (and clip posters)
    ├── 01-parade-start.jpg
    ├── 02-brass.jpg
    └── clip-poster.jpg
public/media/events/
└── 2026-11-07-festival-das-filarmonicas-2026/      ← its video clips
    └── clip.mp4
```

### 2. Prepare the photos

- **Choose** 6 to 20 good photos: faces, action, the crowd. Leave out blurry, dark and near-duplicate shots.
- **Consent:** only students whose families signed the photo consent form, and no full names of minors in captions (`brief.md` §5.1).
- **Size:** JPEG, about 2400 px on the long side and under 2 MB each. The site makes the small versions itself; a bigger original only makes the repository heavier. On a Mac: Preview → Tools → Adjust Size. Or `sips -Z 2400 *.jpg` in Terminal.
- **File names:** lowercase with dashes, numbered in order: `01-parade-start.jpg`.

### 3. Prepare video clips (optional)

- **Keep them short:** under a minute and under 20 MB each (Cloudflare's limit is 25 MB per file). For anything longer, post it on YouTube or Facebook and link to it in the text instead.
- **Format:** MP4 (H.264), up to 1280 × 720, no need for 4K. Phones record this already; to shrink a clip:
  ```sh
  ffmpeg -i original.mov -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow \
    -c:a aac -b:a 96k -movflags +faststart clip.mp4
  ```
- **Poster:** a still from the clip, shown in the grid and before it plays. It must be the same shape as the video:
  ```sh
  ffmpeg -ss 2 -i clip.mp4 -frames:v 1 -q:v 3 clip-poster.jpg
  ```
- Put the clip in `public/media/events/<name>/` and the poster in the write-up's photo folder.

### 4. Write it

Copy the sample and edit the top part (the "front matter") and the text below it:

```yaml
---
title: Festival das Filarmónicas 2026
date: 2026-11-07
location: Sacramento, CA
summary: One sentence for search results and link previews.
gallery:
  - image: ./2026-11-07-festival-das-filarmonicas-2026/01-parade-start.jpg
    alt: The band marching past the cathedral, banner in front
    caption: Leading the parade to the cathedral.
  - video: /media/events/2026-11-07-festival-das-filarmonicas-2026/clip.mp4
    poster: ./2026-11-07-festival-das-filarmonicas-2026/clip-poster.jpg
    alt: The band playing the national anthem on the steps
    caption: The anthems on the cathedral steps.
  - image: ./2026-11-07-festival-das-filarmonicas-2026/02-brass.jpg
    alt: Trumpets and trombones close up
---

Three or four short paragraphs: what the event was, who we played with, a moment people will remember, and thanks.
```

- **`alt`** (required) says what the photo shows, for people who can't see it and for search engines. Be specific: "Trumpets and trombones close up", not "photo".
- **`caption`** (optional) is what you'd say about it out loud. Shown under the thumbnail and in the lightbox.
- **Order** in the list is the order on the page; the first photo is also the share image unless you set `cover`.
- **`draft: true`** keeps it on beta only while you work on it. Remove it to publish.

### 5. Check and publish

1. `npm run dev` and open `/events/<name>`. Or push and check beta.
2. Open the lightbox, swipe through, play the clips.
3. `npm run verify`. A wrong photo path or a missing `alt` stops the build with a message saying which line.
4. Commit and push. Beta updates in about two minutes; production at the next release.

## When something goes wrong

| Message or problem | Fix |
|---|---|
| `Image … not found` | The `image:` or `poster:` path is wrong; it's relative to the `.md` file and starts with `./` |
| `a clip in public/media/events/` | The `video:` path must start with `/media/events/` and end in `.mp4` or `.webm` |
| The clip shows a black box or the wrong shape | The poster isn't a still from that clip; make it again with the command above |
| The clip won't play on an iPhone | It isn't H.264 MP4; convert it with the command above |
| A photo is sideways | Rotate and save it in Preview or Photos, then replace the file |

## How it works

- `src/content.config.ts` (`eventWriteups`) checks every write-up's front matter, including that every photo has alt text.
- `src/components/blocks/Gallery.astro` makes the grid and the lightbox. Pages and other components can use it directly: `<Gallery items={[…]} label="…" />`.
- **The lightbox is [PhotoSwipe 5](https://photoswipe.com)** (MIT license, no other libraries). Its code only downloads when someone opens a photo, so pages stay fast.
- `src/integrations/draft-media.mjs` leaves the clips of draft write-ups out of production, since everything in `public/` is otherwise published.
- **Later:** a site-wide `/gallery` page or tag pages can reuse the same `gallery` lists (`astro-extensibility.md` §2, §4). If photos make the repository too heavy, they can move to Cloudflare R2 without changing the write-ups.
