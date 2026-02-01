# 🐛 Debug: Unable to Add Video

## Step 1: Check Browser Console for Errors

1. Open your browser at http://localhost:3000
2. Press **F12** (or Cmd+Option+I on Mac) to open Developer Tools
3. Click on the **"Console"** tab
4. Try to add a video
5. Look for any RED error messages

**Common errors you might see:**
- "Failed to add video"
- "Network error"
- "Supabase error"
- "Auth error"

---

## Step 2: Verify You're Logged In

Check the navigation bar at the top:

### ✅ If Logged In (GOOD):
You should see:
- **"Add Video"** button
- **"Sign Out"** button

### ❌ If NOT Logged In (PROBLEM):
You'll see:
- **"Login"** button
- **"Sign Up"** button

**If you're NOT logged in:**
1. Click "Sign Up"
2. Create a new account
3. Then try adding video

---

## Step 3: Test Add Video Step by Step

1. Make sure you're on http://localhost:3000
2. Verify you're logged in (see "Add Video" button)
3. Click **"Add Video"**
4. You should be redirected to: http://localhost:3000/add-video
5. Paste a YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
6. Click **"Add Video"** button
7. Wait a moment...

**What happens next?**
- ✅ Redirects to video player page → WORKING
- ❌ Shows error message → Copy the error
- ❌ Nothing happens → Check console (F12)
- ❌ Redirects to login → You're not logged in

---

## Step 4: Check Network Tab

1. Open Developer Tools (F12)
2. Click **"Network"** tab
3. Try adding video again
4. Look for a request to the videos endpoint
5. Check if it says "200 OK" or shows an error

---

## Common Issues & Solutions

### Issue 1: "You must be logged in to add videos"
**Solution:** 
1. Click "Sign Up"
2. Create account: test@example.com / password123
3. Try again

### Issue 2: "Failed to add video"
**Solution:**
- Check browser console for specific error
- Make sure Supabase keys are correct in .env.local
- Restart server

### Issue 3: Button does nothing
**Solution:**
- Check browser console (F12)
- Look for JavaScript errors
- Try refreshing page

### Issue 4: "Invalid URL"
**Solution:**
- Make sure you're pasting a full URL starting with https://
- Try: https://www.youtube.com/watch?v=dQw4w9WgXcQ

---

## Test with This Exact URL

Copy and paste this EXACT URL when adding video:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

---

## Check Server is Running

Open Terminal and check:
```bash
curl http://localhost:3000
```

Should return HTML content.

---

## Quick Test Checklist

- [ ] Server is running (http://localhost:3000 opens)
- [ ] I'm logged in (see "Add Video" button)
- [ ] I can click "Add Video" button
- [ ] Add video page loads (http://localhost:3000/add-video)
- [ ] I can paste a URL
- [ ] I can click "Add Video" button on form
- [ ] No errors in console (F12)

---

## If Still Not Working

Tell me:
1. What error message do you see (if any)?
2. What happens when you click "Add Video"?
3. Are you logged in (do you see "Add Video" button in nav)?
4. What does the browser console show (F12)?
