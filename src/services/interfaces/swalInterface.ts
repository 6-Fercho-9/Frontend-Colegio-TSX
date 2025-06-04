export interface ISwal {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  timer?: number;
  showButton?: boolean;
}