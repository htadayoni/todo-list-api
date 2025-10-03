const supabase = require('../config/supabase');

/**
 * Authentication middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    // Add user information to request object
    req.user = {
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || '',
      email_confirmed: user.email_confirmed_at ? true : false,
      token: token
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token provided
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      
      if (!error && user) {
        req.user = {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          email_confirmed: user.email_confirmed_at ? true : false
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    // Continue without authentication
    next();
  }
};

/**
 * Middleware to check if user email is confirmed
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireEmailConfirmation = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (!req.user.email_confirmed) {
    return res.status(403).json({
      success: false,
      message: 'Email confirmation required. Please check your email and confirm your account.'
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  optionalAuth,
  requireEmailConfirmation
};
