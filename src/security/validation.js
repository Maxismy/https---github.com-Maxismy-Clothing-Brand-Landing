// Form validation and security utilities
import { sanitizeInput } from './middleware';

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Form field validation
export const validateFormField = (field, value) => {
  const sanitizedValue = sanitizeInput(value);
  
  switch (field) {
    case 'email':
      if (!EMAIL_REGEX.test(sanitizedValue)) {
        throw new Error('Invalid email format');
      }
      break;
    case 'name':
      if (sanitizedValue.length < 2 || sanitizedValue.length > 50) {
        throw new Error('Name must be between 2 and 50 characters');
      }
      if (!/^[a-zA-Z\s'-]+$/.test(sanitizedValue)) {
        throw new Error('Name contains invalid characters');
      }
      break;
    case 'message':
      if (sanitizedValue.length < 10 || sanitizedValue.length > 1000) {
        throw new Error('Message must be between 10 and 1000 characters');
      }
      break;
    default:
      throw new Error('Unknown field type');
  }
  
  return sanitizedValue;
};

// Form submission security check
export const validateFormSubmission = (formData) => {
  const errors = [];
  const sanitizedData = {};
  
  try {
    sanitizedData.name = validateFormField('name', formData.name);
    sanitizedData.email = validateFormField('email', formData.email);
    sanitizedData.message = validateFormField('message', formData.message);
  } catch (error) {
    errors.push(error.message);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
};

// Token validation
export const validateToken = (token) => {
  if (!token || typeof token !== 'string' || token.length < 32) {
    throw new Error('Invalid security token');
  }
  return token;
};

// URL validation
export const validateURL = (url) => {
  try {
    const parsedURL = new URL(url);
    const allowedDomains = [
      'chronicleofcloth.com',
      'localhost',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'videos.pexels.com'
    ];
    
    if (!allowedDomains.some(domain => parsedURL.hostname.includes(domain))) {
      throw new Error('Domain not allowed');
    }
    
    return parsedURL.toString();
  } catch (error) {
    throw new Error('Invalid URL');
  }
};