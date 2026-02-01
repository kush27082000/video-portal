# 🔧 Fixed Git Authentication Issue

## Problem:
Git was using the wrong account (`kushBuddy`) instead of your personal account (`kush27082000`)

## Fix Applied:
1. ✅ Set **local** git config (not global):
   - User: `kush27082000`
   - Email: `kushagrasoni27082000@gmail.com`

2. ✅ Updated remote URL to include username:
   - Old: `https://github.com/kush27082000/video-portal.git`
   - New: `https://kush27082000@github.com/kush27082000/video-portal.git`

3. ✅ Cleared credential helper for this repo

---

## 🚀 Now Try Pushing Again:

```bash
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal
git push -u origin main
```

**When prompted:**
- Username: `kush27082000`
- Password: Use your **Personal Access Token** (NOT your GitHub password)

---

## 🔑 Get Personal Access Token (if you don't have one):

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `video-portal-deploy`
4. Select scopes: ✅ **repo** (all sub-checkboxes)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this as your password when pushing

---

## 🆘 If Still Getting 403 Error:

### Option 1: Use SSH Instead (Recommended)

```bash
# Check if you have SSH key
ls -la ~/.ssh/id_*.pub

# If no SSH key, create one:
ssh-keygen -t ed25519 -C "kushagrasoni27082000@gmail.com"

# Copy your public key:
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# Go to: https://github.com/settings/keys
# Click "New SSH key"
# Paste your public key
# Save

# Update remote to use SSH:
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal
git remote set-url origin git@github.com:kush27082000/video-portal.git

# Push:
git push -u origin main
```

### Option 2: Clear Keychain Credentials (macOS)

```bash
# Remove stored credentials
git credential-osxkeychain erase
host=github.com
protocol=https

# Press Enter twice, then try pushing again
```

### Option 3: Use HTTPS with Token in URL (Quick but less secure)

```bash
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal
git remote set-url origin https://YOUR_TOKEN@github.com/kush27082000/video-portal.git
git push -u origin main
```

---

## ✅ Verify Local Config:

```bash
cd /Users/kushagra.soni/Downloads/dummyjson/video-portal

# Check local config (this repo only)
git config --local --list

# Should show:
# user.name=kush27082000
# user.email=kushagrasoni27082000@gmail.com
```

---

**Now try pushing! The local config is set correctly.** 🚀
