/** ECDSA P-256 public JWK used to verify SnapSolve Pro license keys. */
export const LICENSE_PUBLIC_JWK: JsonWebKey = {
  kty: "EC",
  crv: "P-256",
  ext: true,
  key_ops: ["verify"],
  x: "nHyjffedwrjmynTcg-jo2XN_kuZhFJPYQO9aLfAdE3M",
  y: "geX9ZMmLnvIVtEJTqg-zNS0oKr2WYcFw3MwM46oMX9w",
};

export const PRICING = {
  product: "SnapSolve Pro",
  priceLabel: "$9 / month",
  priceNote: "Or $59 / year — billed via TarikIslam.in",
  purchaseUrl: "https://tarikislam.in/#snapsolve-pro",
  supportUrl: "https://tarikislam.in",
} as const;
