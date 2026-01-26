export type QuoteType = "start" | "continue";

export interface Quote {
  id: string;
  type: QuoteType;
  text: string;
  author: "Nieznany";
}

export interface QuoteDto {
  text: string;
  author: "Nieznany";
}
