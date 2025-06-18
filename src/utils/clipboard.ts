// https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts
export const isClipboardAvailable = () =>
  !!navigator.clipboard && window.isSecureContext;
