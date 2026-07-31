# Sound and Motion Specification

Status: Implemented baseline  
Updated: 2026-07-16

This document is the shared timing source for the website and the Figma prototype. All time values are seconds from the start of the relevant interaction.

## Browser entry rule

Browsers block audible autoplay before a user gesture. The site therefore begins with a minimal sound gate:

- `Enter with sound`: resumes Web Audio, sets the master level to 72%, plays the complete intro with sound.
- `Enter muted`: plays the same complete visual intro with the master level at 0%.
- No short or remembered intro is used. Every new root-page entry presents the gate and then plays the full sequence.
- `Sound on / Sound off` remains available in global navigation.
- Reduced-motion users receive the same information and final state without rotational or camera-heavy movement.

## Five-second entry sequence

| Time | Visual action | Sound action |
|---:|---|---|
| 0.00 | Magic circle emerges on pure black | Low 72→156 Hz activation tone |
| 0.08 | Inner and outer rings begin counter-rotation | Opposing 196→112 Hz triangular tone |
| 0.55 | Seal reaches full energy | Both tones overlap at restrained level |
| 1.05 | Circle contracts toward the book | 520→88 Hz convergence sweep |
| 1.42 | Seal strikes the blank cover | Short broadband impact plus 92→46 Hz body |
| 1.43 | Closed book becomes imprinted book | Impact tail |
| 1.70 | Book accelerates toward the camera | 65→340 Hz approach sweep |
| 2.36–3.12 | Rapid page sequence | Eight filtered page-noise impulses at 95 ms intervals |
| 3.18 | Book resolves into front-facing open state | Two-note spectral chime |
| 3.20–4.15 | Final page state settles | Chime decay |
| 4.15–5.00 | Final frame / homepage handoff | Silence; visual breath before content |

## Category ritual

1. Category title scales into the center.
2. Latin title appears.
3. A restrained spectral chime begins.
4. The processed female Latin recording starts 180 ms after the chime.
5. Title blurs and dissolves.
6. The book/index state appears.
7. Project covers enter with a 120 ms stagger.

## Latin titles and voice files

| Public label | Displayed Latin | Meaning | Pronunciation direction | Production file |
|---|---|---|---|---|
| Architecture | Architectūra | Architecture / the art of building | ar-khi-tek-TOO-ra | `public/audio/voice/architecture.wav` |
| Landscape | Forma Terrae | The form of the land | FOR-ma TEHR-rai | `public/audio/voice/landscape.wav` |
| Installation | Ars in Situ | Art situated in place | ars in SEE-too | `public/audio/voice/installation.wav` |

Language verification notes:

- `architectūra` is an attested first-declension Latin noun meaning architecture.
- `terrae` is the genitive singular of `terra`; `Forma Terrae` therefore reads as “the form of the land/earth.”
- `in situ` is retained as the established Latin phrase “in place.”
- The spoken recordings contain only these verified titles. No unverified pseudo-Latin invocation is used.

## Voice production

- Source voice: Microsoft Zira Desktop, female, offline.
- Source rate: `-3`.
- Pitch direction: lowered by a 1.12 time stretch.
- Stereo early reflections:
  - Left: 90 / 210 / 390 ms
  - Right: 120 / 260 / 440 ms
- Reflection gains remain below the direct voice.
- A one-pole darkening filter softens the synthetic upper register.
- Final peak: 86% of full scale.
- Files are stereo, 16-bit PCM WAV.
- Generation is repeatable through:
  - `scripts/generate_latin_voice.ps1`
  - `scripts/process_voice.py`

## Other interface cues

| Interaction | Cue |
|---|---|
| Single book leaf | 160 ms high-passed paper noise plus a quiet 260→180 Hz body |
| Sound enabled | Short two-note chime |
| Sound disabled | 45 ms master fade to zero; no extra sound after mute |
| Project image entrance | Silent by default, avoiding a noisy long page |
| Previous / next project | Silent; preserve reading concentration |

## Level hierarchy

1. Latin voice: 0.82 into the master bus.
2. Seal impact: 0.15 peak before master.
3. Intro sweeps: 0.08–0.09.
4. Page flips: 0.055–0.083.
5. Chimes: 0.07–0.095.
6. Master bus: 0.72 when enabled.

The site intentionally has no continuous music. Silence between events keeps the work readable and prevents the magic-book theme from becoming a game-like soundtrack.

## Figma representation

- Create one frame per key visual state and label each with the time range above.
- Place a small audio annotation beside each frame using the exact production filename or procedural cue name.
- Smart Animate should reproduce scale, opacity, blur, and rotation. The generated A1–A4 book images supply the four principal visual states.
- Figma cannot reproduce the Web Audio synthesis accurately; attach the timing table and production WAV files as the authoritative development reference.
