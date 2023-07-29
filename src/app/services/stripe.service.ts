import { Injectable } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: Stripe;
  constructor() {
    //this.stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
  }

  async createPaymentIntent(amount: number): Promise<string> {
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });
    const data = await response.json();
    return data.client_secret;
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<boolean> {
    const result = await this.stripe.confirmCardPayment(paymentIntentId);
    if (result.error) {
      console.error(result.error);
      return false;
    } else {
      return true;
    }
  }
  
}
