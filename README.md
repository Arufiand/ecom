# ECOM 
#ECOM for Android
Aplikasi chat react-native dengan memanfaatkan Rocket Chat

## Instalasi
- clone aplikasi dari git `git clone git@github.com:Arufiand/ecom.git`
- pastikan berada di branch dev-v1
- Jalankan perintah `npm install`

## Jalankan Aplikasi
- masukkan perintah `npm run cleanStart` pada terminal (shortcut untuk gradlew clean dan start, untuk lebih lengkapnya, cek di `package.json`)
- lanjutkan dengan perintah `npm run android` untuk menjalankan aplikasi pada emulator / real device

## Keterangan Tambahan
- pada `app.js` (```branch dev-v1```) terdapat dependensi OneSignal, OneSignal digunakan untuk melakukan push notification jika terdapat notifikasi pesan masuk dari user lain. Terdapat pula websocket untuk melakukan koneksi menggunakan rocketchat realtime.
- Alamat rocket chat server dideklarasikan pada `endpoint.class`, untuk pengembangan server RocketChat dapat dilihat pada https://docs.rocket.chat/guides/developer/developing-on-windows-10

## UPDATE Branch

### Master
Menggunakan metode REST API secara keseluruhan
### dev-v1
Menggunakan metode campuran antara REST API dengan REALTIME Websocket
