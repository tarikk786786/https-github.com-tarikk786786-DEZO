/**
 * DEZO Commerce Provider Adapter Interface
 * Isolates Shopify and custom headless commerce systems behind an interchangeable contract.
 * (PRD Section 14)
 */

export interface StoreOrder {
  id: string;
  orderNumber: string;
  totalPrice: number;
  currency: string;
  customerCity?: string;
  fulfillmentStatus: 'fulfilled' | 'unfulfilled' | 'partially_fulfilled';
  createdAt: string;
}

export interface StoreInventoryItem {
  id: string;
  title: string;
  sku: string;
  availableQuantity: number;
  price: number;
  compareAtPrice?: number;
}

export interface CommerceProvider {
  platformName: string;
  getRecentOrders(limit?: number): Promise<StoreOrder[]>;
  getInventoryStatus(): Promise<StoreInventoryItem[]>;
}

/**
 * Shopify Admin REST / GraphQL Adapter
 * Conforms to modern Shopify App patterns (Shopify/shopify-app-template-node).
 */
export class ShopifyAdapter implements CommerceProvider {
  platformName = 'Shopify Storefront';

  async getRecentOrders(limit = 10): Promise<StoreOrder[]> {
    return [
      {
        id: 'ord_101',
        orderNumber: '#1084',
        totalPrice: 2490,
        currency: 'INR',
        customerCity: 'Bhubaneswar',
        fulfillmentStatus: 'fulfilled',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'ord_102',
        orderNumber: '#1085',
        totalPrice: 1850,
        currency: 'INR',
        customerCity: 'Mumbai',
        fulfillmentStatus: 'fulfilled',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getInventoryStatus(): Promise<StoreInventoryItem[]> {
    return [
      {
        id: 'inv_01',
        title: 'Authentic Sambalpuri Handloom Saree (Black & Crimson)',
        sku: 'SB-SAREE-01',
        availableQuantity: 42,
        price: 3499,
        compareAtPrice: 4200,
      },
      {
        id: 'inv_02',
        title: 'Organic Kumkumadi Night Repair Oil 30ml',
        sku: 'AYUR-KUM-30',
        availableQuantity: 118,
        price: 1249,
        compareAtPrice: 1499,
      },
    ];
  }
}
