import { LocationInfo } from "@/store/api/endpoints";

interface Question {
  text: string;
  options: Record<string, string>;
  answer: string;
}
