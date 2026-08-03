"""
곰탱이보카 앱 아이콘.

이름이 '곰탱이'니 곰 얼굴로 그린다. 폰 홈 화면에서 아이가 한눈에 찾을 수
있어야 하므로 형태를 크고 단순하게 잡는다.

안드로이드 적응형 아이콘은 기기마다 원·둥근사각·물방울 등으로 **가장자리를
잘라 낸다.** 그래서 앞면(foreground)은 가운데 66% 안에만 그린다. 밖으로
나가면 잘린다.
"""

from PIL import Image, ImageDraw
import math

FUR = (146, 94, 58)        # 곰 털
FUR_DARK = (108, 68, 40)   # 테두리·귀 그림자
MUZZLE = (241, 219, 197)   # 주둥이
NOSE = (58, 42, 32)
BG1 = (255, 214, 138)      # 배경 위 (theme accent 계열)
BG2 = (245, 158, 11)       # 배경 아래
WHITE = (255, 255, 255)

SS = 4  # 4배로 그린 뒤 줄여서 가장자리를 부드럽게


def bear(size, scale=1.0, cx=None, cy=None, mono=False):
    """곰 얼굴 한 장. `scale` 은 얼굴 지름 대 전체 크기 비율."""
    S = size * SS
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)

    cx = (cx if cx is not None else 0.5) * S
    cy = (cy if cy is not None else 0.5) * S
    r = scale * S / 2

    fur = WHITE if mono else FUR
    dark = WHITE if mono else FUR_DARK
    muz = WHITE if mono else MUZZLE
    nos = (0, 0, 0, 0) if mono else NOSE

    # 귀 — 얼굴보다 먼저 그려야 뒤로 간다
    ear_r = r * 0.40
    for sx in (-1, 1):
        ex, ey = cx + sx * r * 0.72, cy - r * 0.70
        d.ellipse([ex - ear_r, ey - ear_r, ex + ear_r, ey + ear_r], fill=fur)
        if not mono:
            ir = ear_r * 0.52
            d.ellipse([ex - ir, ey - ir, ex + ir, ey + ir], fill=dark)

    # 얼굴
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fur)

    # 주둥이
    mw, mh = r * 0.78, r * 0.60
    my = cy + r * 0.30
    d.ellipse([cx - mw, my - mh, cx + mw, my + mh], fill=muz)

    # 코
    nw, nh = r * 0.22, r * 0.17
    ny = my - mh * 0.38
    d.ellipse([cx - nw, ny - nh, cx + nw, ny + nh], fill=nos)

    # 입 — 코에서 내려온 짧은 선 + 좌우 대칭인 두 호(ω 모양)
    # 두 호는 **같은 각도**여야 한다. 다르게 주면 한쪽만 뒤집혀 깨져 보인다.
    lw = max(2, int(r * 0.06))
    my0 = ny + nh
    d.line([cx, my0, cx, my0 + r * 0.13], fill=nos, width=lw)
    aw, ah = r * 0.26, r * 0.30
    top = my0 + r * 0.13 - ah / 2
    for sx in (-1, 1):
        x0 = cx + (0 if sx < 0 else 0) + (-aw if sx < 0 else 0)
        x1 = cx + (0 if sx < 0 else aw)
        d.arc([x0, top, x1, top + ah], start=0, end=180, fill=nos, width=lw)

    # 눈 — 웃는 반달. 점으로 찍으면 작은 크기에서 무표정해 보인다.
    ey = cy - r * 0.16
    ew = r * 0.20
    for sx in (-1, 1):
        ex = cx + sx * r * 0.42
        d.arc(
            [ex - ew, ey - ew, ex + ew, ey + ew],
            start=200, end=340, fill=nos, width=max(2, int(r * 0.075)),
        )

    return im.resize((size, size), Image.LANCZOS)


def gradient(size, top, bottom):
    """위에서 아래로 부드럽게 바뀌는 배경."""
    im = Image.new("RGB", (1, size))
    d = ImageDraw.Draw(im)
    for y in range(size):
        t = y / max(1, size - 1)
        d.point((0, y), fill=tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return im.resize((size, size), Image.NEAREST)


def rounded(im, radius_ratio=0.22):
    """모서리를 둥글게. iOS 는 알아서 깎지만 웹 파비콘 등에는 필요하다."""
    s = im.size[0]
    mask = Image.new("L", (s * SS, s * SS), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, s * SS - 1, s * SS - 1], radius=int(s * SS * radius_ratio), fill=255
    )
    out = im.convert("RGBA")
    out.putalpha(mask.resize((s, s), Image.LANCZOS))
    return out


A = "assets/"

# ── iOS·일반 아이콘 (1024, 배경 있음, 모서리는 OS가 깎는다) ──────────────
icon = gradient(1024, BG1, BG2).convert("RGBA")
icon.alpha_composite(bear(1024, scale=0.56), (0, 0))
icon.convert("RGB").save(A + "icon.png")

# ── 안드로이드 적응형 ────────────────────────────────────────────────
# 앞면: 가운데 66% 안에만. 밖은 기기가 잘라 낸다.
fg = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
fg.alpha_composite(bear(512, scale=0.40), (0, 0))
fg.save(A + "android-icon-foreground.png")

gradient(512, BG1, BG2).convert("RGBA").save(A + "android-icon-background.png")

# 단색(monochrome) — 안드로이드 13+ 테마 아이콘. 흰 실루엣만 남긴다.
mono = Image.new("RGBA", (432, 432), (0, 0, 0, 0))
mono.alpha_composite(bear(432, scale=0.40, mono=True), (0, 0))
mono.save(A + "android-icon-monochrome.png")

# ── 스플래시 — 배경은 app.json 이 칠하므로 곰만 투명하게 ─────────────
sp = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
sp.alpha_composite(bear(1024, scale=0.55), (0, 0))
sp.save(A + "splash-icon.png")

# ── 파비콘 ───────────────────────────────────────────────────────────
fav = gradient(256, BG1, BG2).convert("RGBA")
fav.alpha_composite(bear(256, scale=0.60), (0, 0))
rounded(fav, 0.22).resize((48, 48), Image.LANCZOS).save(A + "favicon.png")

print("만든 것:")
for f in [
    "icon.png",
    "android-icon-foreground.png",
    "android-icon-background.png",
    "android-icon-monochrome.png",
    "splash-icon.png",
    "favicon.png",
]:
    im = Image.open(A + f)
    print(f"  {f:34} {im.size} {im.mode}")
