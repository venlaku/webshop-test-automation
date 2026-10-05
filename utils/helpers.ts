function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

//password env variable
export const PASSWORD = requireEnv('SAUCE_PASSWORD');

// Extracts the numeric amount from price text
export const toNumber = (text: string | null) =>
  Number(text?.replace(/[^0-9.]/g, ''));
