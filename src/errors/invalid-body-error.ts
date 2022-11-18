import { ApplicationError } from "@/protocols";

export function invalidBodyError(): ApplicationError {
  return {
    name: "InvalidBodyError",
    message: "Some necessary information is missing",
  };
}
