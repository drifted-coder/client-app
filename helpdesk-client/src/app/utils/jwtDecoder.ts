export function jwtDecoderFunc(token: string | null): any {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const decodedPayload = atob(base64Payload);
    const payload = JSON.parse(decodedPayload);

    return payload
  } catch (error) {
    console.error('Invalid JWT Token', error);
    return null;
  }
}
