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
}

export const i18n = new I18n();
