import en from "@/locales/en.json";
import ja from "@/locales/ja.json";

type Translations = Record<string, Record<string, string>>;

class I18n {
  private translations: Translations = { en, ja };
  private currentLang: string = "en";

  setLang(lang: string) {
    this.currentLang = lang;
    this.updateTexts();
    this.updateCV();
    this.updateSeo();
  }

  t(key: string): string {
    let currentTrans: any = this.translations[this.currentLang];
    return currentTrans[key] || "";
  }

  private updateTexts() {
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n!;
      el.textContent = this.t(key);
    });
  }

  private updateCV = () => {
    const cvLink = document.getElementById("cv-link") as HTMLAnchorElement;
    let fileName = "";
    switch (this.currentLang) {
      case "en":
        fileName = "Pyae_Phyo_Maung_Resume.docx";
        break;
      case "ja":
        fileName = "ピェッピョーマウン_履歴書.docx";
        break;
      default:
        fileName = "Pyae_Phyo_Maung_Resume.docx";
        break;
    }
    cvLink.href = `/cv/${fileName}`;
  };

  private updateSeo = () => {
    const title = document.querySelector("title");
    const description = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]',
    );

    const isJapanese = this.currentLang === "ja";
    document.documentElement.lang = isJapanese ? "ja" : "en";

    const seoTitle = isJapanese
      ? "ピェッピョーマウン | ソフトウェアエンジニア"
      : "Pyae Phyo Maung | Software Engineer";
    const seoDescription = isJapanese
      ? "Vue、Nuxt、Laravel を中心に開発するソフトウェアエンジニアです。アクセシブルで使いやすいウェブ体験を設計・実装します。"
      : "Software engineer specializing in modern web development, Vue, Nuxt, Laravel, and accessible digital experiences.";

    if (title) title.textContent = seoTitle;
    if (description) description.setAttribute("content", seoDescription);
    if (ogTitle) ogTitle.setAttribute("content", seoTitle);
    if (ogDescription) ogDescription.setAttribute("content", seoDescription);
    if (twitterTitle) twitterTitle.setAttribute("content", seoTitle);
    if (twitterDescription)
      twitterDescription.setAttribute("content", seoDescription);
  };
}

export const i18n = new I18n();
