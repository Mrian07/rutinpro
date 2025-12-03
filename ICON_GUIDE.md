# Panduan Icon Aplikasi RutinPro

## Icon Saat Ini

Icon aplikasi saat ini menggunakan file `icon.png` yang ada di root project.

## Cara Mengganti Icon

### 1. Siapkan Icon Baru

- Format: PNG dengan background transparan
- Ukuran minimal: 512x512 px (disarankan 1024x1024 px)
- Desain: Pastikan icon terlihat jelas di ukuran kecil
- Nama file: `icon.png`

### 2. Replace Icon

Ganti file `icon.png` di root project dengan icon baru Anda.

### 3. Generate Icon untuk Android

Jalankan script untuk generate icon dalam berbagai ukuran:

```bash
npm run generate-icons
```

Script ini akan:

- Generate icon untuk semua density Android (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- Membuat versi square (`ic_launcher.png`)
- Membuat versi round (`ic_launcher_round.png`)
- Menyimpan ke folder `android/app/src/main/res/mipmap-*/`

### 4. Sync dan Build

```bash
npm run build:mobile
```

Atau manual:

```bash
npm run build
npx cap sync android
```

### 5. Test di Android

```bash
npm run android
```

Build dan install APK untuk melihat icon baru di launcher.

## Ukuran Icon Android

Script akan generate icon dalam ukuran berikut:

| Density | Folder         | Size    |
| ------- | -------------- | ------- |
| MDPI    | mipmap-mdpi    | 48x48   |
| HDPI    | mipmap-hdpi    | 72x72   |
| XHDPI   | mipmap-xhdpi   | 96x96   |
| XXHDPI  | mipmap-xxhdpi  | 144x144 |
| XXXHDPI | mipmap-xxxhdpi | 192x192 |

## Tips Desain Icon

### Do's ✅

- Gunakan desain simple dan recognizable
- Pastikan icon terlihat jelas di ukuran kecil (48x48)
- Gunakan warna yang kontras
- Test di berbagai background (light & dark)
- Gunakan padding yang cukup (safe area)

### Don'ts ❌

- Jangan gunakan terlalu banyak detail
- Hindari text yang terlalu kecil
- Jangan gunakan foto atau gambar kompleks
- Hindari gradient yang terlalu halus

## Icon Adaptive (Android 8.0+)

Untuk icon adaptive yang lebih modern, Anda bisa membuat:

1. **Foreground layer** - Icon utama (108x108 dp, safe area 72x72 dp)
2. **Background layer** - Background solid atau gradient

File yang perlu dibuat:

- `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml`
- `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml`
- Foreground dan background images

Contoh `ic_launcher.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
```

## Tools Rekomendasi

### Online Tools

- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
- [App Icon Generator](https://www.appicon.co/)
- [Icon Kitchen](https://icon.kitchen/)

### Desktop Tools

- Adobe Illustrator / Photoshop
- Figma
- Sketch
- GIMP (free)

## Troubleshooting

### Icon tidak berubah setelah install

1. Uninstall aplikasi lama:

   ```bash
   adb uninstall com.rutinpro.app
   ```

2. Clear cache Android Studio:

   - File > Invalidate Caches / Restart

3. Rebuild project:
   ```bash
   cd android
   ./gradlew clean
   ./gradlew assembleDebug
   ```

### Icon terlihat blur

- Pastikan source icon minimal 512x512 px
- Gunakan PNG dengan kualitas tinggi
- Jangan scale up dari ukuran kecil

### Icon terpotong

- Tambahkan padding di source icon
- Untuk adaptive icon, pastikan elemen penting ada di safe area (72x72 dp)

## Verifikasi Icon

Setelah generate, cek folder berikut untuk memastikan icon sudah ter-generate:

```
android/app/src/main/res/
├── mipmap-mdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-hdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-xhdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
├── mipmap-xxhdpi/
│   ├── ic_launcher.png
│   └── ic_launcher_round.png
└── mipmap-xxxhdpi/
    ├── ic_launcher.png
    └── ic_launcher_round.png
```

## Resources

- [Android Icon Design Guidelines](https://developer.android.com/guide/practices/ui_guidelines/icon_design_launcher)
- [Material Design Icons](https://material.io/design/iconography/product-icons.html)
- [Adaptive Icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
