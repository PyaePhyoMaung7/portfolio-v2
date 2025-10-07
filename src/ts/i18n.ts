type Translations = Record<string, string>;

class I18n {
  private translations: Translations = {};
  private currentLang: string = "en";
  private langs: string[] = ["en", "jp"];

  async load() {
    for (const lang of this.langs) {
      const response = await fetch(`/src/locales/${lang}.json`);
      this.translations[lang] = await response.json();
    }
  }

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
