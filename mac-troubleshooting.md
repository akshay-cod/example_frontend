# Mac Troubleshooting Guide for GiftCards India

## Quick Fix (Most Common Solution)

```bash
# 1. Navigate to your home directory
cd ~

# 2. Create the project in Desktop (where you definitely have permissions)
cd ~/Desktop
mkdir giftcards-india
cd giftcards-india

# 3. Check Node version
node --version
# Should show v18.19.1

# 4. If you get permission errors, fix npm permissions
sudo chown -R $(whoami) ~/.npm

# 5. Try installing with npm
npm install

# 6. If npm fails, try with yarn
# Install yarn first if you don't have it
npm install -g yarn
yarn install

# 7. Start the development server
npm run dev
# OR
yarn dev
```

## If You're Still Getting Errors

### Option 1: Use VS Code Terminal
1. Open VS Code
2. File → Open Folder → Select your project folder
3. Terminal → New Terminal
4. Run commands from VS Code's integrated terminal

### Option 2: Reset npm completely
```bash
# Remove npm completely and reinstall
rm -rf ~/.npm
rm -rf ~/.nvm
rm -rf /usr/local/lib/node_modules

# Reinstall nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

# Install Node 18
nvm install 18.19.1
nvm use 18.19.1
```

### Option 3: Use different package manager
```bash
# Install pnpm (often works better than npm on Mac)
curl -fsSL https://get.pnpm.io/install.sh | sh
source ~/.zshrc

# Use pnpm instead
pnpm install
pnpm dev
```

## Verification Commands

After setup, verify everything works:
```bash
# Check versions
node --version    # Should be v18.19.1
npm --version     # Should be 9.x or 10.x

# Check project structure
ls -la

# Try running the dev server
npm run dev
```

## Common Error Solutions

### EPERM Operation Not Permitted
- Move to a directory you own (like ~/Desktop)
- Fix npm permissions with `sudo chown -R $(whoami) ~/.npm`

### Command Not Found
- Reload shell: `source ~/.zshrc`
- Check PATH: `echo $PATH`

### Port Already in Use
- Kill process: `lsof -ti:3000 | xargs kill -9`
- Or use different port: `npm run dev -- --port 3001`

### Module Not Found
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules package-lock.json && npm install`