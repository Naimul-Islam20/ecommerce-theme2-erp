export class ApiLink {
  static ecommerceSettings = "/ecommerce/settings";
  static ecommerceLanding = "/ecommerce/landing";
  static ecommerceFooterMenus = "/ecommerce/footer-menus";
  static ecommerceBlogBySlug = "/ecommerce/blog/by-slug";
  static ecommerceProductCategories = "/ecommerce/product-categories";
  static ecommerceOffersStorefront = "/ecommerce/offers/storefront";
  static ecommerceCustomPage = "/ecommerce/custom-page";
  static ecommerceProducts = "/ecommerce/products";
  static ecommerceProductBySlug = "/ecommerce/products/by-slug";
  static ecommerceProductReviews = (productId: string) =>
    `/ecommerce/products/${encodeURIComponent(productId)}/reviews`;
  static ecommerceProductsByCategorySlug = "/ecommerce/products/by-category-slug";
  static ecommerceProductsByTags = (tags: string) =>
    `/ecommerce/products/by-tags/${encodeURIComponent(tags)}`;
  static ecommerceCategoriesByTags = "/ecommerce/categories/tags";
  static ecommerceCheckout = "/ecommerce/checkout";
  static ecommerceCouponApply = "/ecommerce/coupon/apply";
  static ecommerceCheckoutPaymentGatewayApply = "/ecommerce/checkout/payment-gateway/apply";
  static ecommerceCheckoutPaymentGatewayOptions = "/ecommerce/checkout/payment-gateway/options";
  static ecommerceCheckoutShippingOptions = "/ecommerce/checkout/shipping-options";
  static ecommerceWishlist = "/ecommerce/wishlist";
  static ecommerceCustomerRegister = "/ecommerce/customer/register";
  static ecommerceCustomerLogin = "/ecommerce/customer/login";
  static ecommerceCustomerLogout = "/ecommerce/customer/logout";
  static ecommerceCustomerMe = "/ecommerce/customer/me";
  static ecommerceCustomerOrders = "/ecommerce/customer/orders";
  static ecommerceCustomerOrderById = (orderId: string) =>
    `/ecommerce/customer/orders/${encodeURIComponent(orderId)}`;
  static ecommerceCustomerOrderReturn = (orderId: string) =>
    `/ecommerce/customer/orders/${encodeURIComponent(orderId)}/return`;
  static ecommerceCustomerOrderCancel = (orderId: string) =>
    `/ecommerce/customer/orders/${encodeURIComponent(orderId)}/cancel`;
  static ecommerceCustomerOrderRefund = (orderId: string) =>
    `/ecommerce/customer/orders/${encodeURIComponent(orderId)}/refund`;
  static ecommerceCustomerOrderTracking = (orderId: string) =>
    `/ecommerce/customer/orders/${encodeURIComponent(orderId)}/tracking`;
  static ecommerceCustomerProfile = "/ecommerce/customer/profile";
}
