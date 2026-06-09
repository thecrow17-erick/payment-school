import { Inject, Injectable } from '@nestjs/common';
import stripe, { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripeClient: Stripe;

  constructor(
    @Inject('STRIPE_KEY')
    private readonly stripeKey: string
  ) {
    this.stripeClient = new stripe(stripeKey);
  }

  
  public async createLineParamItem(name: string, amount: number, currency: string, quantity: number) {
    return {
      price_data: {
        currency,
        product_data: {
          name,
        },
        unit_amount: amount,
      },
      quantity,
    };
  }

}
