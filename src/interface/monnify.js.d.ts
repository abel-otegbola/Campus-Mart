declare module 'monnify-js' {
  class Monnify {
    constructor(apiKey: string, contractCode: string);

    initializePayment(config: {
      apiKey: string;
      contractCode: string;
      paymentDescription?: string;
      paymentReference?: string;
      customerFullName: string;
      customerEmail: string;
      amount: number;
      currency?: string;
      reference: string;
      methodName?: string;
      metadata?: Record<string, unknown>;
      onLoadStart?: () => void;
      onLoadFailed?: () => void;
      onComplete?: (response: { status: string; transactionReference: string }) => void;
    }): void;
  }

  export default Monnify;
}