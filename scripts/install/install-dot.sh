#!/usr/bin/env bash

# NOTE: can't in target dir execute this curl script

#UserLocation=0
#read -r -p "Are you sure to install dotfiles? 🍻 [y|N] " response
#if [[ $response =~ (y|yes|Y) ]];then
#UserLocation=1
#print("Installing ... 💉")
#fi

function isCmdExist() {
  local cmd="$1"
  local BIN="$HOME/.local/bin/"

  if [ ! -d "$BIN" ]; then
    mkdir -p "$BIN"
  fi

  #which "$cmd" >/dev/null 2>&1
  if [[ $? -ne 0 ]]; then
    echo "🍺 Installing $cmd"
    sh -c "$(curl -fL chezmoi.io/get)"
    mv ./bin/chezmoi ~/.local/bin/chezmoi
  fi
}

# TODO: add remove old or bk odl chezmoi and acquire user if to bk or delete
function init() {
  local TARGET="$HOME/.local/share/chezmoi"
  local URL="https://gitlab.com/oeyoews/dotfiles.git"

  if [[ -d "$TARGET" ]]; then
    rm -rf "$TARGET"
  fi
    chezmoi init --depth 1 "$URL"
}

function apply() {
  chezmoi apply -R
}

main() {
  isCmdExist chezmoi
  init
  apply
}

main