#export PATH=/opt/homebrew/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin
export BREW_PATH=/opt/homebrew
export PATH=${BREW_PATH}/bin:$PATH
export PATH=${BREW_PATH}/sbin:$PATH

export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
