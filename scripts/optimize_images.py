"""Create web-sized derivatives without modifying the portfolio originals."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "portfolio"
OUTPUT_ROOT = ROOT / "web-assets"
SOURCE_SETS = (
    "product management",
    "architecture",
    "landscape",
    "interacation",
    "assets/generated",
)
EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
MAX_EDGE = 2400
QUALITY = 82


def destination_for(source: Path) -> Path:
    relative = source.relative_to(SOURCE_ROOT)
    if relative.parts and relative.parts[0] == "product management":
        relative = Path("product-management", *relative.parts[1:])
    return (OUTPUT_ROOT / relative).with_suffix(".webp")


def optimize(source: Path, destination: Path) -> tuple[int, int]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        image.save(
            destination,
            "WEBP",
            quality=QUALITY,
            method=6,
            exact=image.mode == "RGBA",
        )
        return image.size


def main() -> None:
    created = 0
    skipped = 0
    source_bytes = 0
    output_bytes = 0

    for source_set in SOURCE_SETS:
        folder = SOURCE_ROOT / source_set
        for source in sorted(folder.rglob("*")):
            if not source.is_file() or source.suffix.lower() not in EXTENSIONS:
                continue
            destination = destination_for(source)
            if destination.exists() and destination.stat().st_mtime >= source.stat().st_mtime:
                skipped += 1
            else:
                optimize(source, destination)
                created += 1
            source_bytes += source.stat().st_size
            output_bytes += destination.stat().st_size

    print(
        {
            "created": created,
            "skipped": skipped,
            "source_mb": round(source_bytes / 1024 / 1024, 1),
            "output_mb": round(output_bytes / 1024 / 1024, 1),
            "max_edge": MAX_EDGE,
            "quality": QUALITY,
        }
    )


if __name__ == "__main__":
    main()
