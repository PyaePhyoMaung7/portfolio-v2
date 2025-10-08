import en from "@/locales/en.json";
import ja from "@/locales/ja.json";

type Translations = Record<string, Record<string, string>>;

class I18n {
  private translations: Translations = { en, ja };
  private currentLang: string = "en";

  setLang(lang: string) {
    this.currentLang = lang;
    this.updateTexts();
  }

  t(key: string): string {
    let currentTrans: any = this.translations[this.currentLang];
    return currentTrans[key] || key;
  }

  private updateTexts() {
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n!;
      el.textContent = this.t(key);
    });
  }
}

export const i18n = new I18n();
