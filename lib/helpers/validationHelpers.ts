// helpers/validationHelpers.ts
export function validatePageNumber(page: string): boolean {
  return !isNaN(Number(page)) && Number(page) > 0;
}
