import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as stripe from '@stripe/stripe-js';
import { Observable } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripe: stripe.Stripe;
  private apiUrl = 'https://api.stripe.com/v1';
    stripeKey = 'pk_test_51NUivUFCkl6VqTDu0LcRZUfPK4j89snBvIVNHQC5sd49MKdI5sSkC6Ux35NfNpj3OKermwi6EoHK6KuIQhzfGhgD00bK59ZIQe'; // Replace with your actual public key
  constructor( public http:HttpClient) {
    this.initializeStripe();
  }

  async initializeStripe() {
   
    this.stripe = await stripe.loadStripe(this.stripeKey);

  }

  async redirectToCheckout(options: any) {
    try {
      return await this.stripe.redirectToCheckout(options);
    } catch (error) {
      console.error('Error during payment:', error);
      throw error;
    }
  }
   createPaymentIntent2(amount: number, currency: string)  {
    const url = `${this.apiUrl}/payment_intents`;
    const headers = {
      'Authorization': `Bearer ${this.stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = `amount=${amount}&currency=${currency}`;

    return this.http.post(url, body, { headers });
  }
 
  async createPaymentIntent(amount: number): Promise<string> {

    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      }
    };
    const response = await this.http.post(`${'https://futplaycompany.com/production/api/post/efectuar/pago/'}${amount}`,options).toPromise();
    return response['client_secret'];
  }
  
 

  
}
