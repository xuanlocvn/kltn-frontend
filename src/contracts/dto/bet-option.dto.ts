import { OptionMode } from "../enum/option-mode.enum";

export class BetOptionDto {
  constructor(mode: OptionMode, attribute: number, id: string, brackets: number[]) {
    this.mode = mode;
    this.attribute = attribute;
    this.id = id;
    this.brackets = brackets;
  }
  mode: OptionMode;
  attribute: number;
  id: string;
  brackets: number[];

  addBracket(newBracket: number) {
    if (!this.brackets) {
      this.brackets = [newBracket]
    } else {
      this.brackets.push(newBracket)
    }
  }

  isValidBrackets() {
    if (!this.brackets) return false;
    if (this.brackets.length === 0) return false;
    for (let i = 0; i < this.brackets.length - 1; ++i) {
      if (this.brackets[i] >= this.brackets[i + 1]) {
        return false
      }
    }
    return true;
  }
}