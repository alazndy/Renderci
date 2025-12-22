
# 🏗️ Rendercı Muhittin ABİ

**Mimari renderların içinden geçen yapay zeka asistanınız.**

Rendercı Muhittin, mimarlar, tasarımcılar ve sanatçılar için geliştirilmiş; eskizleri, teknik çizimleri, PDF paftalarını ve 3D modelleri saniyeler içinde yüksek çözünürlüklü, fotorealistik görsellere dönüştüren gelişmiş bir web uygulamasıdır. 

**Google Gemini 2.5 Flash** ve **Gemini 3 Pro** modellerinin multimodal yeteneklerini kullanarak, görselleri analiz eder ve istediğiniz stilde yeniden yorumlar.

---

## ✨ Özellikler

### 🎨 Gelişmiş Render Motoru
*   **Çoklu Format Desteği:** `.jpg`, `.png`, `.pdf` dosyalarını ve `.3dm`, `.obj`, `.stl` formatındaki 3D modelleri destekler.
*   **Akıllı Stil Transferi:** Kendi referans görselinizi yükleyin veya ön tanımlı stilleri kullanın (Realistik, Eskiz, Vaziyet Planı, Kesit).
*   **4K Çözünürlük:** Standart (1K), Yüksek (2K) ve Ultra (4K) çıktı desteği.

### 🧊 Entegre 3D Görüntüleyici
*   Tarayıcı içinde **Three.js** tabanlı güçlü 3D görüntüleyici.
*   `.obj`, `.stl` ve Rhino `.3dm` dosyalarını doğrudan yükleyin.
*   Modeli döndürün, yakınlaştırın ve istediğiniz açıyı yakalayıp anında render'a gönderin.
*   *Not: `.step` dosyaları için dönüştürme uyarısı içerir.*

### 🛠️ Profesyonel Düzenleme Araçları (Inpainting)
*   **Katmanlı Düzenleme:** Görselin belirli bölgelerini seçin (Kutu veya Kement aracı ile).
*   **Kompozit Promptlama:** Seçili alanları "Ön Plan", "Arka Plan" mantığıyla katmanlar halinde yeniden oluşturun.

### 🧭 3D Sahne Keşfi (Explorer Mode)
*   Oluşturulan render'ın içinde yapay zeka ile gezinin.
*   Kamerayı ileri, geri, sağa, sola veya yukarı/aşağı hareket ettirerek sahnenin devamını hayal ettirin ve oluşturun.

### 💾 Galeri ve Geçmiş
*   **IndexedDB** teknolojisi ile renderlarınızı tarayıcınızda yerel olarak saklar.
*   Geçmiş renderlar arasında hızlı geçiş yapın ve varyasyonlar türetin.

### 💎 Deep Dark Glassmorphism Arayüz
*   Modern, siber-estetik tasarım dili.
*   Neon parıltılar (Glow effects), bulanık cam paneller ve akıcı animasyonlar.

---

## 🚀 Teknolojiler

Bu proje, modern web teknolojilerinin en güncel sürümleri kullanılarak geliştirilmiştir:

*   **Frontend:** [React 19](https://react.dev/), TypeScript
*   **Stil:** [Tailwind CSS](https://tailwindcss.com/) (Özel konfigürasyon ve animasyonlar)
*   **Yapay Zeka:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai) (Gemini 3 Pro & 2.5 Flash)
*   **3D Motoru:** [Three.js](https://threejs.org/) (@react-three/fiber kullanılmadan, saf implementasyon)
*   **3D Loaderlar:** `Rhino3dmLoader`, `OBJLoader`, `STLLoader`
*   **PDF İşleme:** `pdfjs-dist`
*   **Veri Depolama:** IndexedDB (Local Browser Storage)

---

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/kullaniciadi/renderci-muhittin.git
    cd renderci-muhittin
    ```

2.  **Bağımlılıkları Yükleyin:**
    Proje modül yapısı gereği `node_modules` kullanmıyor olabilir (CDN importları), ancak geliştirme ortamı için:
    ```bash
    npm install
    ```

3.  **API Anahtarı:**
    Uygulama, Google AI Studio API anahtarına ihtiyaç duyar. Uygulama arayüzü, `window.aistudio` entegrasyonu üzerinden anahtar seçimi yapmanıza olanak tanır veya `.env` dosyasında `API_KEY` tanımlayabilirsiniz.

4.  **Uygulamayı Başlatın:**
    ```bash
    npm start
    # veya
    npm run dev
    ```

---

## 🎮 Kullanım Kılavuzu

1.  **Görsel Yükleme:** Ana ekrandaki alana bir resim sürükleyin veya 3D model dosyanızı seçin.
2.  **Açı Ayarlama (3D ise):** Model yüklendiyse, fare ile istediğiniz açıyı ayarlayın ve "Bu Açıyı Renderla" butonuna basın.
3.  **Ayarlar:**
    *   **Çözünürlük:** 1K (Hızlı), 2K veya 4K seçin.
    *   **Stil:** "Realistik", "Eskiz" vb. bir preset seçin veya kendi stil görselinizi yükleyin.
    *   **Prompt:** Ekstra detaylar için (örn: "karlı bir akşam üstü, neon tabelalar") açıklama girin.
4.  **Render:** "Render Al" butonuna basın ve Muhittin Abi'nin sihrini bekleyin.
5.  **Düzenleme:** Sonuçtan memnun değilseniz "Düzenle" diyerek belirli alanları maskeleyip değiştirebilirsiniz.

---

## 📂 Proje Yapısı

```
/
├── components/         # React bileşenleri
│   ├── ThreeDViewer.tsx    # 3D model görüntüleme motoru
│   ├── ImageModal.tsx      # Maskeleme ve katman düzenleme
│   ├── ResultDisplay.tsx   # Sonuç görüntüleme ve aksiyonlar
│   └── ...
├── services/           # Harici servis entegrasyonları
│   ├── geminiService.ts    # Google Gemini API çağrıları
│   ├── storageService.ts   # IndexedDB işlemleri
│   └── pdfService.ts       # PDF -> Görsel dönüşümü
├── hooks/              # Custom React Hooks
│   └── useAppState.ts      # Tüm uygulama durum yönetimi
├── types.ts            # TypeScript tip tanımları
└── index.html          # Ana giriş ve CSS stilleri
```

---

## ⚠️ Lisans ve Yasal Uyarı

Bu proje **Google Gemini API** kullanır. API kullanım ücretleri ve kotaları Google Cloud hesabınıza bağlıdır. 4K render ve video üretimi ücretli API anahtarı gerektirebilir.

---

<p align="center">
  <small>Mimarinin ve teknolojinin birleştiği nokta.</small>
</p>
