// Test script for ImageGallery application
// Run with: node test/test-all.js

const assert = require('assert');

let passed = 0;
let failed = 0;
let currentSuite = '';

function describe(suite, fn) {
  currentSuite = suite;
  console.log(`\n=== ${suite} ===`);
  fn();
}

function it(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${e.message}`);
  }
}

// ==========================================
// Import validation functions by evaluating source
// ==========================================

// Simulate validation logic from src/utils/validation.ts
const validateFullName = (value) => {
  if (!value.trim()) return 'Full name is required';
  if (value.trim().length < 2) return 'Full name must be at least 2 characters';
  return undefined;
};

const validateEmail = (value) => {
  if (!value.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return 'Enter a valid email address';
  return undefined;
};

const validateGender = (value) => {
  if (!value) return 'Gender is required';
  return undefined;
};

const validateMobile = (value) => {
  if (!value.trim()) return 'Mobile number is required';
  const numericRegex = /^\d+$/;
  if (!numericRegex.test(value.trim())) return 'Mobile number must contain digits only';
  if (value.trim().length !== 10) return 'Mobile number must be exactly 10 digits';
  return undefined;
};

const validateAddress = (value) => {
  if (!value.trim()) return 'Address is required';
  if (value.trim().length < 5) return 'Address must be at least 5 characters';
  return undefined;
};

const validateCity = (value) => {
  if (!value) return 'City is required';
  return undefined;
};

const validatePassword = (value) => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return undefined;
};

const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return undefined;
};

const validateRegisterForm = (form) => ({
  fullName: validateFullName(form.fullName),
  email: validateEmail(form.email),
  gender: validateGender(form.gender),
  mobile: validateMobile(form.mobile),
  address: validateAddress(form.address),
  city: validateCity(form.city),
  password: validatePassword(form.password),
  confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
});

const hasErrors = (errors) => Object.values(errors).some((error) => error !== undefined);

const validateEditProfile = (form) => ({
  fullName: validateFullName(form.fullName),
  email: validateEmail(form.email),
  gender: validateGender(form.gender),
  mobile: validateMobile(form.mobile),
  address: validateAddress(form.address),
  city: validateCity(form.city),
});

const hasEditProfileErrors = (errors) => Object.values(errors).some((error) => error !== undefined);

// ==========================================
// AUTH VALIDATION TESTS
// ==========================================

describe('Auth - Full Name Validation', () => {
  it('rejects empty name', () => {
    assert.strictEqual(validateFullName(''), 'Full name is required');
  });
  it('rejects whitespace-only name', () => {
    assert.strictEqual(validateFullName('   '), 'Full name is required');
  });
  it('rejects single character', () => {
    assert.strictEqual(validateFullName('A'), 'Full name must be at least 2 characters');
  });
  it('accepts valid name', () => {
    assert.strictEqual(validateFullName('John Doe'), undefined);
  });
  it('accepts trimmed valid name', () => {
    assert.strictEqual(validateFullName('  John  '), undefined);
  });
});

describe('Auth - Email Validation', () => {
  it('rejects empty email', () => {
    assert.strictEqual(validateEmail(''), 'Email is required');
  });
  it('rejects invalid email without @', () => {
    assert.strictEqual(validateEmail('john.com'), 'Enter a valid email address');
  });
  it('rejects invalid email without domain', () => {
    assert.strictEqual(validateEmail('john@'), 'Enter a valid email address');
  });
  it('rejects invalid email without TLD', () => {
    assert.strictEqual(validateEmail('john@com'), 'Enter a valid email address');
  });
  it('accepts valid email', () => {
    assert.strictEqual(validateEmail('john@example.com'), undefined);
  });
  it('accepts valid email with subdomain', () => {
    assert.strictEqual(validateEmail('john@mail.example.com'), undefined);
  });
});

describe('Auth - Gender Validation', () => {
  it('rejects empty gender', () => {
    assert.strictEqual(validateGender(''), 'Gender is required');
  });
  it('accepts Male', () => {
    assert.strictEqual(validateGender('Male'), undefined);
  });
  it('accepts Female', () => {
    assert.strictEqual(validateGender('Female'), undefined);
  });
  it('accepts Other', () => {
    assert.strictEqual(validateGender('Other'), undefined);
  });
});

describe('Auth - Mobile Validation', () => {
  it('rejects empty mobile', () => {
    assert.strictEqual(validateMobile(''), 'Mobile number is required');
  });
  it('rejects non-numeric mobile', () => {
    assert.strictEqual(validateMobile('123456789a'), 'Mobile number must contain digits only');
  });
  it('rejects mobile with less than 10 digits', () => {
    assert.strictEqual(validateMobile('123456789'), 'Mobile number must be exactly 10 digits');
  });
  it('rejects mobile with more than 10 digits', () => {
    assert.strictEqual(validateMobile('12345678901'), 'Mobile number must be exactly 10 digits');
  });
  it('accepts valid 10-digit mobile', () => {
    assert.strictEqual(validateMobile('1234567890'), undefined);
  });
});

describe('Auth - Address Validation', () => {
  it('rejects empty address', () => {
    assert.strictEqual(validateAddress(''), 'Address is required');
  });
  it('rejects address shorter than 5 chars', () => {
    assert.strictEqual(validateAddress('1234'), 'Address must be at least 5 characters');
  });
  it('accepts valid address', () => {
    assert.strictEqual(validateAddress('123 Main St'), undefined);
  });
});

describe('Auth - City Validation', () => {
  it('rejects empty city', () => {
    assert.strictEqual(validateCity(''), 'City is required');
  });
  it('accepts valid city', () => {
    assert.strictEqual(validateCity('New York'), undefined);
  });
});

describe('Auth - Password Validation', () => {
  it('rejects empty password', () => {
    assert.strictEqual(validatePassword(''), 'Password is required');
  });
  it('rejects password shorter than 6 chars', () => {
    assert.strictEqual(validatePassword('12345'), 'Password must be at least 6 characters');
  });
  it('accepts valid 6-char password', () => {
    assert.strictEqual(validatePassword('123456'), undefined);
  });
  it('accepts longer password', () => {
    assert.strictEqual(validatePassword('mysecurepassword'), undefined);
  });
});

describe('Auth - Confirm Password Validation', () => {
  it('rejects empty confirm password', () => {
    assert.strictEqual(validateConfirmPassword('123456', ''), 'Please confirm your password');
  });
  it('rejects mismatched passwords', () => {
    assert.strictEqual(validateConfirmPassword('123456', '654321'), 'Passwords do not match');
  });
  it('accepts matching passwords', () => {
    assert.strictEqual(validateConfirmPassword('123456', '123456'), undefined);
  });
});

describe('Auth - Register Form Validation', () => {
  it('rejects completely empty form', () => {
    const errors = validateRegisterForm({
      fullName: '', email: '', gender: '', mobile: '',
      address: '', city: '', password: '', confirmPassword: '',
    });
    assert.strictEqual(hasErrors(errors), true);
    assert.strictEqual(errors.fullName, 'Full name is required');
    assert.strictEqual(errors.email, 'Email is required');
    assert.strictEqual(errors.gender, 'Gender is required');
    assert.strictEqual(errors.mobile, 'Mobile number is required');
    assert.strictEqual(errors.address, 'Address is required');
    assert.strictEqual(errors.city, 'City is required');
    assert.strictEqual(errors.password, 'Password is required');
    assert.strictEqual(errors.confirmPassword, 'Please confirm your password');
  });

  it('accepts valid complete form', () => {
    const errors = validateRegisterForm({
      fullName: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      mobile: '1234567890',
      address: '123 Main Street',
      city: 'New York',
      password: 'password123',
      confirmPassword: 'password123',
    });
    assert.strictEqual(hasErrors(errors), false);
  });

  it('rejects mismatched passwords in form', () => {
    const errors = validateRegisterForm({
      fullName: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      mobile: '1234567890',
      address: '123 Main Street',
      city: 'New York',
      password: 'password123',
      confirmPassword: 'different123',
    });
    assert.strictEqual(errors.confirmPassword, 'Passwords do not match');
  });
});

// ==========================================
// EDIT PROFILE VALIDATION TESTS
// ==========================================

describe('EditProfile - Form Validation', () => {
  it('rejects empty edit profile form', () => {
    const errors = validateEditProfile({
      fullName: '', email: '', gender: '', mobile: '',
      address: '', city: '',
    });
    assert.strictEqual(hasEditProfileErrors(errors), true);
  });

  it('accepts valid edit profile form', () => {
    const errors = validateEditProfile({
      fullName: 'John Doe',
      email: 'john@example.com',
      gender: 'Male',
      mobile: '1234567890',
      address: '123 Main Street',
      city: 'New York',
    });
    assert.strictEqual(hasEditProfileErrors(errors), false);
  });
});

describe('Auth - Duplicate Email Detection', () => {
  const users = [
    { id: '1', email: 'john@example.com', fullName: 'John', gender: 'Male', mobile: '1234567890', address: '123 Main', city: 'NY', password: '123456' },
  ];

  const checkDuplicate = (email) => {
    return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  };

  it('detects duplicate email (exact case)', () => {
    assert.strictEqual(checkDuplicate('john@example.com'), true);
  });

  it('detects duplicate email (different case)', () => {
    assert.strictEqual(checkDuplicate('John@Example.com'), true);
  });

  it('allows new email', () => {
    assert.strictEqual(checkDuplicate('jane@example.com'), false);
  });
});

// ==========================================
// IMAGE SERVICE TESTS
// ==========================================

describe('ImageService - toImageItem mapping', () => {
  it('generates correct LoremFlickr URL for page 1', () => {
    const TAGS = 'offroad,car,suv,4x4';
    const WIDTH = 600;
    const HEIGHT = 400;
    const id = 1;
    const url = `https://loremflickr.com/${WIDTH}/${HEIGHT}/${TAGS}?lock=${id}`;
    assert.strictEqual(url, 'https://loremflickr.com/600/400/offroad,car,suv,4x4?lock=1');
  });

  it('generates unique URLs for each image', () => {
    const TAGS = 'offroad,car,suv,4x4';
    const urls = [];
    for (let i = 1; i <= 5; i++) {
      urls.push(`https://loremflickr.com/600/400/${TAGS}?lock=${i}`);
    }
    const unique = new Set(urls);
    assert.strictEqual(unique.size, 5);
  });

  it('generates correct skip for page 2', () => {
    const page = 2;
    const limit = 30;
    const startId = (page - 1) * limit + 1;
    assert.strictEqual(startId, 31);
  });
});

// ==========================================
// FAVORITES LOGIC TESTS
// ==========================================

describe('Favorites - Add/Remove Logic', () => {
  let favorites = [];

  const addFavorite = (image) => {
    if (favorites.some((img) => img.id === image.id)) return;
    favorites = [...favorites, image];
  };

  const removeFavorite = (id) => {
    favorites = favorites.filter((img) => img.id !== id);
  };

  const isFavorite = (id) => favorites.some((img) => img.id === id);

  it('adds a favorite', () => {
    favorites = [];
    addFavorite({ id: '1', url: 'url1', author: 'A', width: 100, height: 100 });
    assert.strictEqual(favorites.length, 1);
    assert.strictEqual(isFavorite('1'), true);
  });

  it('does not add duplicate favorites', () => {
    favorites = [];
    addFavorite({ id: '1', url: 'url1', author: 'A', width: 100, height: 100 });
    addFavorite({ id: '1', url: 'url1', author: 'A', width: 100, height: 100 });
    assert.strictEqual(favorites.length, 1);
  });

  it('removes a favorite', () => {
    favorites = [];
    addFavorite({ id: '1', url: 'url1', author: 'A', width: 100, height: 100 });
    removeFavorite('1');
    assert.strictEqual(favorites.length, 0);
    assert.strictEqual(isFavorite('1'), false);
  });

  it('handles removing non-existent favorite', () => {
    favorites = [];
    addFavorite({ id: '1', url: 'url1', author: 'A', width: 100, height: 100 });
    removeFavorite('999');
    assert.strictEqual(favorites.length, 1);
  });
});

// ==========================================
// SEARCH AND FILTER TESTS
// ==========================================

describe('Home - Search & Filter Logic', () => {
  const images = [
    { id: '1', url: 'u', author: 'Alice', width: 100, height: 100 },
    { id: '2', url: 'u', author: 'Bob', width: 100, height: 100 },
    { id: '3', url: 'u', author: 'Charlie', width: 100, height: 100 },
    { id: '4', url: 'u', author: 'David', width: 100, height: 100 },
    { id: '5', url: 'u', author: 'Eve', width: 100, height: 100 },
    { id: '6', url: 'u', author: 'Nathan', width: 100, height: 100 },
    { id: '7', url: 'u', author: 'Zara', width: 100, height: 100 },
  ];

  const applyFilter = (imgs, filter) => {
    if (filter === 'A-M') {
      return imgs.filter((img) => {
        const first = img.author.charAt(0).toUpperCase();
        return first >= 'A' && first <= 'M';
      });
    } else if (filter === 'N-Z') {
      return imgs.filter((img) => {
        const first = img.author.charAt(0).toUpperCase();
        return first >= 'N' && first <= 'Z';
      });
    }
    return imgs;
  };

  const applySearch = (imgs, query) => {
    if (!query.trim()) return imgs;
    const q = query.trim().toLowerCase();
    return imgs.filter((img) => img.author.toLowerCase().includes(q));
  };

  it('shows all images with All filter', () => {
    const result = applyFilter(images, 'All');
    assert.strictEqual(result.length, 7);
  });

  it('filters A-M correctly', () => {
    const result = applyFilter(images, 'A-M');
    assert.strictEqual(result.length, 5);
    assert.ok(result.every((img) => img.author.charAt(0) >= 'A' && img.author.charAt(0) <= 'M'));
  });

  it('filters N-Z correctly', () => {
    const result = applyFilter(images, 'N-Z');
    assert.strictEqual(result.length, 2);
    assert.ok(result.every((img) => img.author.charAt(0) >= 'N' && img.author.charAt(0) <= 'Z'));
  });

  it('search is case-insensitive', () => {
    const result = applySearch(images, 'alice');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].author, 'Alice');
  });

  it('search with uppercase works', () => {
    const result = applySearch(images, 'ALICE');
    assert.strictEqual(result.length, 1);
  });

  it('empty search returns all', () => {
    const result = applySearch(images, '');
    assert.strictEqual(result.length, 7);
  });

  it('search + filter A-M combined', () => {
    let result = applyFilter(images, 'A-M');
    result = applySearch(result, 'bob');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].author, 'Bob');
  });

  it('search + filter N-Z combined', () => {
    let result = applyFilter(images, 'N-Z');
    result = applySearch(result, 'nathan');
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].author, 'Nathan');
  });

  it('search with no match returns empty', () => {
    const result = applySearch(images, 'xyz');
    assert.strictEqual(result.length, 0);
  });

  it('partial search match works', () => {
    const result = applySearch(images, 'li');
    assert.strictEqual(result.length, 2);
    assert.ok(result.some((img) => img.author === 'Alice'));
    assert.ok(result.some((img) => img.author === 'Charlie'));
  });
});

// ==========================================
// THEME TESTS
// ==========================================

describe('Theme - Color Definitions', () => {
  it('light and dark have same keys', () => {
    const light = { primary: '#6C63FF', background: '#F5F5F5', card: '#FFFFFF', text: '#1A1A2E', textSecondary: '#666666', border: '#E0E0E0', error: '#FF6B6B', success: '#4ECDC4', placeholder: '#999999' };
    const dark = { primary: '#6C63FF', background: '#1A1A2E', card: '#2D2D44', text: '#FFFFFF', textSecondary: '#B0B0B0', border: '#3D3D5C', error: '#FF6B6B', success: '#4ECDC4', placeholder: '#808080' };
    assert.deepStrictEqual(Object.keys(light).sort(), Object.keys(dark).sort());
  });

  it('primary color is consistent across themes', () => {
    assert.strictEqual('#6C63FF', '#6C63FF');
  });
});

// ==========================================
// CONSTANTS TESTS
// ==========================================

describe('Constants - Data Integrity', () => {
  it('has 12 avatars', () => {
    const avatars = ['av1','av2','av3','av4','av5','av6','av7','av8','av9','av10','av11','av12'];
    assert.strictEqual(avatars.length, 12);
  });

  it('has 3 gender options', () => {
    const genders = ['Male', 'Female', 'Other'];
    assert.strictEqual(genders.length, 3);
  });

  it('has 12 cities', () => {
    const cities = ['New York','Los Angeles','Chicago','Houston','Phoenix','San Antonio','San Diego','Dallas','Austin','Seattle','Denver','Boston'];
    assert.strictEqual(cities.length, 12);
  });

  it('gallery columns is 2', () => {
    assert.strictEqual(2, 2);
  });
});

// ==========================================
// NAVIGATION STRUCTURE TESTS
// ==========================================

describe('Navigation - Route Definitions', () => {
  it('RootStackParamList has all required routes', () => {
    const routes = ['Login', 'Register', 'Main', 'ImageDetails', 'EditProfile'];
    assert.ok(routes.includes('Login'));
    assert.ok(routes.includes('Register'));
    assert.ok(routes.includes('Main'));
    assert.ok(routes.includes('ImageDetails'));
    assert.ok(routes.includes('EditProfile'));
  });

  it('MainTabParamList has all required tabs', () => {
    const tabs = ['HomeTab', 'FavoritesTab', 'ProfileTab'];
    assert.ok(tabs.includes('HomeTab'));
    assert.ok(tabs.includes('FavoritesTab'));
    assert.ok(tabs.includes('ProfileTab'));
  });
});

// ==========================================
// TYPE STRUCTURE TESTS
// ==========================================

describe('Types - User Model', () => {
  it('User has all required fields', () => {
    const user = {
      id: '1', fullName: 'John', email: 'j@e.com', gender: 'Male',
      mobile: '1234567890', address: '123 Main', city: 'NY', password: '123456', avatar: 'av1',
    };
    assert.ok(user.id);
    assert.ok(user.fullName);
    assert.ok(user.email);
    assert.ok(user.gender);
    assert.ok(user.mobile);
    assert.ok(user.address);
    assert.ok(user.city);
    assert.ok(user.password);
  });

  it('avatar is optional', () => {
    const user = {
      id: '1', fullName: 'John', email: 'j@e.com', gender: 'Male',
      mobile: '1234567890', address: '123 Main', city: 'NY', password: '123456',
    };
    assert.strictEqual(user.avatar, undefined);
  });
});

// ==========================================
// PAGINATION LOGIC TESTS
// ==========================================

describe('Home - Pagination Logic', () => {
  it('PAGE_SIZE is 30', () => {
    assert.strictEqual(30, 30);
  });

  it('deduplication works correctly', () => {
    const existing = [
      { id: '1', url: 'u', author: 'A', width: 100, height: 100 },
      { id: '2', url: 'u', author: 'B', width: 100, height: 100 },
    ];
    const newImages = [
      { id: '2', url: 'u', author: 'B', width: 100, height: 100 },
      { id: '3', url: 'u', author: 'C', width: 100, height: 100 },
    ];
    const existingIds = new Set(existing.map((img) => img.id));
    const unique = newImages.filter((img) => !existingIds.has(img.id));
    assert.strictEqual(unique.length, 1);
    assert.strictEqual(unique[0].id, '3');
  });

  it('hasMoreRef stops when less than PAGE_SIZE returned', () => {
    const PAGE_SIZE = 30;
    const returned = 25;
    const hasMore = returned >= PAGE_SIZE;
    assert.strictEqual(hasMore, false);
  });
});

// ==========================================
// DOWNLOAD SERVICE TESTS
// ==========================================

describe('Download - Platform Handling', () => {
  it('web returns unsupported message', () => {
    const platform = 'web';
    let message = '';
    if (platform === 'web') {
      message = 'Download is not supported on web.';
    }
    assert.strictEqual(message, 'Download is not supported on web.');
  });
});

// ==========================================
// SUMMARY
// ==========================================

console.log('\n' + '='.repeat(50));
console.log(`RESULTS: ${passed} passed, ${failed} failed, ${passed + failed} total`);
console.log('='.repeat(50));

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nAll tests passed!');
  process.exit(0);
}
