const ADMIN_PASSWORD = 'admin123'

function adminAuth(req, res, next) {
  const password = req.headers['x-admin-password']

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Non autorisé' })
  }

  next()
}

module.exports = adminAuth
