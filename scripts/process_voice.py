"""Turn local TTS recordings into restrained stereo witch-voice assets."""

from __future__ import annotations

import wave
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tmp" / "audio-raw"
OUTPUT = ROOT / "public" / "audio" / "voice"
PITCH_STRETCH = 1.12


def read_pcm(path: Path) -> tuple[np.ndarray, int]:
    with wave.open(str(path), "rb") as wav:
        if wav.getsampwidth() != 2:
            raise ValueError(f"{path.name}: expected 16-bit PCM")
        rate = wav.getframerate()
        channels = wav.getnchannels()
        frames = np.frombuffer(wav.readframes(wav.getnframes()), dtype=np.int16)
    frames = frames.reshape(-1, channels).astype(np.float32) / 32768.0
    return frames.mean(axis=1), rate


def stretch(signal: np.ndarray, factor: float) -> np.ndarray:
    source_x = np.arange(signal.size, dtype=np.float64)
    target_x = np.linspace(0, signal.size - 1, int(signal.size * factor))
    return np.interp(target_x, source_x, signal).astype(np.float32)


def delay_mix(signal: np.ndarray, rate: int, delays: tuple[tuple[float, float], ...]) -> np.ndarray:
    tail = int(max(delay for delay, _ in delays) * rate)
    mixed = np.zeros(signal.size + tail, dtype=np.float32)
    mixed[: signal.size] += signal
    for delay, gain in delays:
        offset = int(delay * rate)
        mixed[offset : offset + signal.size] += signal * gain
    return mixed


def process(path: Path) -> Path:
    mono, rate = read_pcm(path)
    lowered = stretch(mono, PITCH_STRETCH)

    # Slightly different early reflections create width without a theatrical echo.
    left = delay_mix(lowered, rate, ((0.09, 0.31), (0.21, 0.20), (0.39, 0.10)))
    right = delay_mix(lowered, rate, ((0.12, 0.29), (0.26, 0.18), (0.44, 0.09)))
    size = max(left.size, right.size)
    stereo = np.zeros((size, 2), dtype=np.float32)
    stereo[: left.size, 0] = left
    stereo[: right.size, 1] = right

    # A small darkening pass: one-pole low-pass followed by a quiet breath-like tail.
    alpha = 0.72
    for channel in range(2):
        for index in range(1, size):
            stereo[index, channel] = alpha * stereo[index - 1, channel] + (1 - alpha) * stereo[index, channel]

    peak = float(np.max(np.abs(stereo))) or 1.0
    stereo *= 0.86 / peak
    pcm = np.clip(stereo * 32767.0, -32768, 32767).astype(np.int16)

    OUTPUT.mkdir(parents=True, exist_ok=True)
    destination = OUTPUT / path.name
    with wave.open(str(destination), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(rate)
        wav.writeframes(pcm.tobytes())
    return destination


def main() -> None:
    outputs = [process(path) for path in sorted(SOURCE.glob("*.wav"))]
    print({"created": len(outputs), "files": [str(path.relative_to(ROOT)) for path in outputs]})


if __name__ == "__main__":
    main()
