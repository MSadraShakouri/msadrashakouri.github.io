# Image style guide — `assets/mahdi/`

This note records the exact recipe used to generate the paintings on the home
page, so the set can be extended or regenerated later in the same style.

## Base template

Every image in this folder is generated from this skeleton — swap `[SUBJECT]`
and keep everything else identical:

```
Soft painterly digital painting, vertical portrait 3:4 composition.
[SUBJECT]
Muted palette of cream, pale turquoise and soft indigo, calm, reverent,
spacious negative space. No people, no text, no lettering.
```

Rules of the set:

- **Portrait 3:4** — the page layout ("plates") crops to 3:4 and dissolves the
  top and bottom edges into the page background (see `.fade-figure` in
  `assets/style.css`), so subjects must sit in the **middle** of the frame with
  generous sky above and ground below. If a generated image is taller than 3:4,
  crop from the **bottom** when the sky headroom matters (e.g. minaret tips),
  otherwise center-crop.
- **Soft palette** — cream sky, pale turquoise / soft indigo tones; nothing
  dark or saturated (the page background is warm paper `#faf8f2`; images must
  feel like they are made of the same light). Exception: `05-sunrise.jpg`
  (older, warmer gold palette — kept because it is the closing image).
- **No people, no text/lettering, no watermarks.**
- Real places must be generated **from reference photos** (see below), then
  cropped to exact 3:4 and compressed:

  ```
  convert in.jpg -gravity center -crop <H*3/4>x<H>+0+0 +repage \
          -strip -interlace Plane -quality 82 out.jpg
  ```

## Generating authentic shrines

For real buildings, feed 1–2 reference photos into the image model together
with a prompt of this shape:

```
Faithful painterly rendition of this exact mosque — the [NAME] in [CITY].
Keep the true architecture: [dome color/shape], [minaret count + placement],
[facades / tilework], accurate proportions. Remove any people, flags, banners,
text and watermarks. Repaint in a soft muted painterly style: gentle cream
sky, pale turquoise and soft indigo tones, vertical portrait 3:4 composition,
serene and spacious.
```

## The current set

| File | Placement | Prompt (subject line) |
| --- | --- | --- |
| `00-jamkaran.jpg` | Opening plate (right of the headline on wide screens) | Faithful rendition of the **Jamkaran Mosque, Qom** from reference photos: large turquoise-tiled dome, blue-tiled iwan facade, minarets in their true placement; flag removed. The sky was later extended via outpainting so the minaret tips have headroom; cropped to 3:4 from the bottom. |
| `07-night.jpg` | Ch. 01 — A Universal Longing | Vast quiet starry night sky over a smooth empty desert, one bright solitary star low above the horizon; a mood of waiting and watching. |
| `01-samarra.jpg` | Ch. 02 — Who Is He? | Faithful rendition of the **al-Askari Shrine, Samarra** from a reference photo, reframed as a closer low street-level view looking slightly upward — golden dome and twin golden minarets dominating the frame against a hazy cream sky, minimal ground. |
| `06-jerusalem.jpg` | Ch. 03 — FAQ (after Q2) | The **Dome of the Rock, Jerusalem**: golden dome, octagonal turquoise-tiled wall, quiet stone plaza, soft cream sky. |
| `05-sunrise.jpg` | Ch. 04 — An Invitation (closing) | Soft radiant sunrise over a calm open horizon: gentle rays through delicate clouds, sky from pale turquoise to warm cream and soft gold — hope, arrival, promise fulfilled. |

## Placement (for reference)

Plates are centered, max-width 500px (360px beside text on wide screens), and
each one's edges dissolve into the page via CSS gradients — the image files
themselves have **no baked-in fade**; if you regenerate, keep hard edges and
let the CSS do the dissolve.
