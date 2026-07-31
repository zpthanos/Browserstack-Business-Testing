export interface TestEnvironment {
  baseUrl: string;
  expectedTitlePattern?: RegExp;
  productPath: string;
  productName: string;
}

export function getTestEnvironment(source: NodeJS.ProcessEnv = process.env): TestEnvironment {
  const baseUrl = source.APP_BASE_URL ?? 'https://cms.demo.katalon.com';

  try {
    new URL(baseUrl);
  } catch {
    throw new Error(`APP_BASE_URL must be an absolute URL; received: ${baseUrl}`);
  }

  const rawTitlePattern = source.EXPECTED_TITLE_PATTERN?.trim();

  return {
    baseUrl,
    expectedTitlePattern: rawTitlePattern ? new RegExp(rawTitlePattern, 'i') : undefined,
    productPath: source.WOOCOMMERCE_PRODUCT_PATH ?? '/product/flying-ninja/',
    productName: source.WOOCOMMERCE_PRODUCT_NAME ?? 'Flying Ninja',
  };
}
