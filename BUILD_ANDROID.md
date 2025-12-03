# Build RutinPro untuk Android

Panduan lengkap untuk build aplikasi RutinPro sebagai aplikasi Android native menggunakan Capacitor.

## Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

1. **Node.js** (v18 atau lebih baru)
2. **Android Studio** (untuk build APK/AAB)
   - Download dari: https://developer.android.com/studio
   - Install Android SDK (API Level 33 atau lebih baru)
   - Setup Android SDK path di environment variables
3. **Java Development Kit (JDK)** 17 atau lebih baru
   - Bisa menggunakan JDK yang sudah include di Android Studio

## Setup Environment Variables

Tambahkan ke System Environment Variables:

```
ANDROID_HOME=C:\Users\[YourUsername]\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Android\Android Studio\jbr
```

Tambahkan ke PATH:

```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

## Langkah-langkah Build

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Web App

```bash
npm run build
```

Ini akan membuat static export di folder `out/`

### 3. Sync dengan Capacitor

```bash
npx cap sync android
```

Ini akan:

- Copy web assets ke Android project
- Update Android plugins
- Sync konfigurasi

### 4. Buka di Android Studio

```bash
npm run android
```

Atau manual:

```bash
npx cap open android
```

### 5. Build APK/AAB di Android Studio

#### Build Debug APK (untuk testing)

1. Di Android Studio, pilih **Build > Build Bundle(s) / APK(s) > Build APK(s)**
2. Tunggu proses build selesai
3. APK akan tersimpan di: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Build Release APK (untuk distribusi)

1. Generate Keystore (jika belum punya):

   ```bash
   keytool -genkey -v -keystore rutinpro-release.keystore -alias rutinpro -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Buat file `android/key.properties`:

   ```properties
   storePassword=your_store_password
   keyPassword=your_key_password
   keyAlias=rutinpro
   storeFile=../rutinpro-release.keystore
   ```

3. Update `android/app/build.gradle`:

   ```gradle
   def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }

   android {
       ...
       signingConfigs {
           release {
               keyAlias keystoreProperties['keyAlias']
               keyPassword keystoreProperties['keyPassword']
               storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
               storePassword keystoreProperties['storePassword']
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               minifyEnabled false
               proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
           }
       }
   }
   ```

4. Build Release APK:

   - Di Android Studio: **Build > Generate Signed Bundle / APK**
   - Pilih **APK**
   - Pilih keystore dan masukkan password
   - Pilih **release** build variant
   - Klik **Finish**

5. APK akan tersimpan di: `android/app/build/outputs/apk/release/app-release.apk`

## Build dari Command Line

### Build Debug APK

```bash
cd android
./gradlew assembleDebug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

### Build Release APK

```bash
cd android
./gradlew assembleRelease
```

APK: `android/app/build/outputs/apk/release/app-release.apk`

### Build AAB (untuk Google Play Store)

```bash
cd android
./gradlew bundleRelease
```

AAB: `android/app/build/outputs/bundle/release/app-release.aab`

## Testing di Device/Emulator

### Install APK ke Device

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Run di Emulator

1. Buka Android Studio
2. Pilih **Tools > Device Manager**
3. Create atau start emulator
4. Run app dari Android Studio (tombol Play hijau)

## Troubleshooting

### Error: ANDROID_HOME not set

Pastikan environment variable `ANDROID_HOME` sudah di-set dengan benar.

### Error: SDK location not found

Buat file `android/local.properties`:

```properties
sdk.dir=C\:\\Users\\[YourUsername]\\AppData\\Local\\Android\\Sdk
```

### Error: Gradle build failed

1. Bersihkan build cache:

   ```bash
   cd android
   ./gradlew clean
   ```

2. Rebuild:
   ```bash
   ./gradlew assembleDebug
   ```

### App tidak load / blank screen

1. Pastikan sudah build web app: `npm run build`
2. Sync ulang: `npx cap sync android`
3. Rebuild Android app

## Update Aplikasi

Setiap kali ada perubahan di web app:

```bash
npm run build:mobile
```

Ini akan:

1. Build Next.js app
2. Sync dengan Capacitor Android

Kemudian rebuild di Android Studio atau via Gradle.

## Konfigurasi App

Edit `capacitor.config.ts` untuk mengubah:

- App ID: `appId: 'com.rutinpro.app'`
- App Name: `appName: 'RutinPro'`
- Server settings

Edit `android/app/src/main/res/values/strings.xml` untuk:

- App name yang tampil di launcher
- Custom strings

## Icon & Splash Screen

1. Siapkan icon (1024x1024 px)
2. Siapkan splash screen (2732x2732 px)
3. Gunakan tool generator atau manual replace di:
   - `android/app/src/main/res/mipmap-*/ic_launcher.png`
   - `android/app/src/main/res/drawable*/splash.png`

## Permissions

Edit `android/app/src/main/AndroidManifest.xml` untuk menambah permissions jika diperlukan.

Saat ini app tidak memerlukan permissions khusus karena semua data disimpan lokal.

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
