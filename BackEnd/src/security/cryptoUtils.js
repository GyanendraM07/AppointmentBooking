const crypto = require('crypto');
const algorithm = 'aes-256-cbc';


/**
 * Encrypts the provided data using AES-256-CBC encryption.
 *
 * @author Gyanendra Mishra 
 * @since November 24, 2023
 * @param {string} data - The data to be encrypted.
 * @returns {string} - The encrypted data as a hex string.
 */
function encrypt(data) {
    const key = crypto.randomBytes(32);// Generate a random 32-byte key
    const iv = crypto.randomBytes(16);// Generate a random 16-byte IV
    // Encrypt the data with the generated key and IV
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    // Concatenate IV, encrypted data, and key into a single string
    const encryptedString = iv.toString('hex') + encrypted.toString('hex') + key.toString('hex');
    return encryptedString;
}


/**
 * Decrypts the provided encrypted string using AES-256-CBC decryption.
 *
 * @author Gyanendra Mishra
 * @since November 24, 2023
 * @param {string} encryptedString - The encrypted string to be decrypted.
 * @returns {string} - The decrypted data.
 */
function decrypt(encryptedString) {
    // Extract IV, encrypted data, and key from the concatenated string
    const iv = Buffer.from(encryptedString.slice(0, 32), 'hex');
    const encryptedText = Buffer.from(encryptedString.slice(32, -64), 'hex');
    const key = Buffer.from(encryptedString.slice(-64), 'hex');
    // Decrypt the data with the stored key and IV
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

 function comparePasswords(inputPassword, storedEncryptedPassword) {
    try {
      // Decrypt the stored encrypted password
      const decryptedStoredPassword = decrypt(storedEncryptedPassword);
  
      // Compare the provided password with the decrypted stored password
      return inputPassword === decryptedStoredPassword;
    } catch (error) {
      throw error;
    }
  }

// Export the functions
module.exports = { encrypt,decrypt,comparePasswords};
