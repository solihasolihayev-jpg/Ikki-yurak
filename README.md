# Ikki Yurak — internet orqali multiplayer demo

Loyiha Android va iPhone brauzerlarida ishlashi uchun web-ilova shaklida tayyorlangan. Alohida APK kerak emas: ikkala foydalanuvchi ham hosting bergan HTTPS havolani Safari yoki Chrome orqali ochadi.

## Render orqali internetga joylashtirish
1. ZIP faylni oching.
2. Loyihani GitHub repository sifatida yuklang (GitHub hisobingiz kerak).
3. Render.com saytiga kiring va GitHub hisobingizni ulang.
4. Render'da **New + → Blueprint** tanlang va shu repository'ni belgilang. `render.yaml` sozlamalarni avtomatik ko‘rsatadi.
5. Deploy tugashini kuting va berilgan `https://...onrender.com` manzilni oching.
6. Siz Android'da, juftingiz iPhone'da aynan shu havolani oching.
7. Ikkalangiz ham bir xil xona kodini kiriting va **Ulanish** tugmasini bosing. Har bir qurilmada Sozlamalar bo‘limidan o‘z ismini kiriting.

## Lokal ishga tushirish
Node.js 18+ kerak:
```bash
npm install
npm start
```
So‘ng `http://localhost:3000` ni oching.

## Nimalar bor
- Xona kodi bilan ulanish
- Jonli matnli chat va stiker uzatish (Socket.IO)
- Avatar o‘zgarishini uzatish
- 15 mini-o‘yin, sovg‘alar, demo media galereyasi

## Hali tayyor bo‘lmagan imkoniyatlar
- Foydalanuvchi hisoblari va doimiy saqlanadigan profillar
- Rasmlarni serverga doimiy yuklash
- Haqiqiy audio/video qo‘ng‘iroq (WebRTC va signalizatsiya kerak)
- Xona maxfiyligi, moderatsiya va ishlab chiqarish darajasidagi xavfsizlik
- Bir sherikning ismi/avatari faqat o‘z qurilmasiga alohida bog‘lanishi (hozirgi demo buni to‘liq boshqarmaydi)

Bu paket kod loyihasi; hosting hisobingizga kirish yoki uni sizning nomingizdan nashr qilish imkonim yo‘q. Hostingni siz boshlashingiz kerak bo‘ladi.
