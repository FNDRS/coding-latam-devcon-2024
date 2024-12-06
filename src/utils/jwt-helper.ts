import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `${process.env.AUTH0_API_URL}/.well-known/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
  const kid = header.kid || "";
  client.getSigningKey(kid, (err, key) => {
    if (err || !key) {
      callback(err || new Error("Signing key not found"), undefined);
    } else {
      const publicKey = key.getPublicKey();
      callback(null, publicKey);
    }
  });
}

export function accessTokenDecode(accessToken: string): Promise<{
  status: boolean;
  data?: { userId: string };
  message?: string;
  code?: number;
}> {
  return new Promise((resolve) => {
    jwt.verify(
      accessToken,
      getKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) {
          resolve({ status: false, message: err.message, code: 403 });
        } else if (decoded && typeof decoded === "object") {
          resolve({ status: true, data: decoded as { userId: string } });
        } else {
          resolve({
            status: false,
            message: "Invalid token format",
            code: 403,
          });
        }
      }
    );
  });
}
