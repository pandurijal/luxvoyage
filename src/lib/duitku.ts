/**
 * Duitku Payment Gateway Client (Sandbox Only)
 *
 * SECURITY WARNING: API keys live in the browser bundle. This is a
 * dummy/sample integration. Production deployments must proxy these
 * calls through a server that holds the secret key.
 *
 * Docs: https://docs.duitku.com/payment-gateway/api-browser/
 */

const MERCHANT_CODE = import.meta.env.VITE_DUITKU_MERCHANT_CODE as string | undefined;
const API_KEY = import.meta.env.VITE_DUITKU_API_KEY as string | undefined;

// Real packages are 85M-125M IDR; sandbox caps out lower. Allow override.
const SANDBOX_AMOUNT_OVERRIDE = import.meta.env.VITE_DUITKU_TEST_AMOUNT
  ? Number(import.meta.env.VITE_DUITKU_TEST_AMOUNT)
  : null;

const API_BASE = '/duitku-api/webapi/api/merchant';

export type PaymentMethodCode = 'BC' | 'I1' | 'M2' | 'BT' | 'VC' | 'OV' | 'DA' | 'SP';

export interface InquiryRequest {
  merchantOrderId: string;
  paymentAmount: number;
  paymentMethod: PaymentMethodCode;
  productDetails: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
}

export interface InquiryResponse {
  merchantCode: string;
  reference: string;
  paymentUrl: string;
  vaNumber?: string;
  qrString?: string;
  amount: string;
  statusCode: string;
  statusMessage: string;
}

export interface StatusResponse {
  merchantCode: string;
  merchantOrderId: string;
  reference: string;
  amount: string;
  statusCode: string;
  statusMessage: string;
}

export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed';

// Duitku statusCode → internal payment_status.
// '00' = paid, '01' = pending, '02' = failed/cancelled, anything else = unpaid.
export function mapPaymentStatus(duitkuCode: string): PaymentStatus {
  switch (duitkuCode) {
    case '00':
      return 'paid';
    case '01':
      return 'pending';
    case '02':
      return 'failed';
    default:
      return 'unpaid';
  }
}

async function sign(plaintext: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    enc.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(plaintext));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function getDuitkuConfig() {
  if (!MERCHANT_CODE || !API_KEY) {
    throw new Error(
      'Missing Duitku env vars. Set VITE_DUITKU_MERCHANT_CODE and VITE_DUITKU_API_KEY in .env'
    );
  }
  return { merchantCode: MERCHANT_CODE, apiKey: API_KEY };
}

export async function createInquiry(req: InquiryRequest): Promise<InquiryResponse> {
  const { merchantCode, apiKey } = getDuitkuConfig();

  const amount = SANDBOX_AMOUNT_OVERRIDE ?? req.paymentAmount;

  const signature = await sign(
    merchantCode + req.merchantOrderId + amount,
    apiKey
  );

  const body = {
    merchantCode,
    paymentAmount: amount,
    paymentMethod: req.paymentMethod,
    merchantOrderId: req.merchantOrderId,
    productDetails: req.productDetails,
    email: req.customerEmail,
    customerVaName: req.customerName,
    phoneNumber: req.customerPhone,
    callbackUrl: req.returnUrl,
    returnUrl: req.returnUrl,
    signature,
    expiryPeriod: 60,
  };

  const res = await fetch(`${API_BASE}/v2/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Duitku inquiry failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as InquiryResponse;
  if (data.statusCode !== '00') {
    throw new Error(`Duitku rejected transaction: ${data.statusMessage}`);
  }
  return data;
}

export async function checkTransactionStatus(merchantOrderId: string): Promise<StatusResponse> {
  const { merchantCode, apiKey } = getDuitkuConfig();
  const signature = await sign(merchantCode + merchantOrderId, apiKey);

  const res = await fetch(`${API_BASE}/transactionStatus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ merchantCode, merchantOrderId, signature }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Duitku status check failed (${res.status}): ${text}`);
  }

  return (await res.json()) as StatusResponse;
}
