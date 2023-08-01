import { Injectable } from '@angular/core';
import * as stripe from '@stripe/stripe-js';
 

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: stripe.Stripe;

  constructor() {
    this.initializeStripe();
  }

  async initializeStripe() {
    const stripeKey = 'YOUR_STRIPE_PUBLIC_KEY'; // Replace with your actual public key
    this.stripe = await stripe.loadStripe(stripeKey);

  }

  async redirectToCheckout(options: any) {
    try {
      return await this.stripe.redirectToCheckout(options);
    } catch (error) {
      console.error('Error during payment:', error);
      throw error;
    }
  }
  
}
