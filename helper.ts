import crypto from "crypto";

export const encryptFile: (
  file: File,
  initVector: Buffer,
  Securitykey: Buffer
) => File = (file: File, initVector: Buffer, Securitykey: Buffer) => {
  const reader = new FileReader();
  let encryptedFile: File = new File([], "");
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const buffer = Buffer.from(reader.result as ArrayBuffer);
    const algorithm = "aes-256-cbc";
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    const blob = new Blob([encrypted], { type: file.type });
    encryptedFile = new File([blob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
    return encryptedFile;
  };
  return encryptedFile;
};

export const decryptFile: (
  file: File,
  initVector: Buffer,
  Securitykey: Buffer
) => File = (file: File, initVector: Buffer, Securitykey: Buffer) => {
  const reader = new FileReader();
  let decryptedFile: File = new File([], "");
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const buffer = Buffer.from(reader.result as ArrayBuffer);
    const algorithm = "aes-256-cbc";
    const decipher = crypto.createDecipheriv(
      algorithm,
      Securitykey,
      initVector
    );
    const decrypted = Buffer.concat([
      decipher.update(buffer),
      decipher.final(),
    ]);
    const blob = new Blob([decrypted], { type: file.type });
    decryptedFile = new File([blob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
    return decryptedFile;
  };
  return decryptedFile;
};
