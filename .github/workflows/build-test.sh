#!/bin/sh
PKG_DIR="$1"

sed -i 's/git\.openwrt\.org\/project\/luci/github\.com\/openwrt\/luci/g' ./feeds.conf.default
./scripts/feeds update luci
./scripts/feeds install luci
mv ./bin/$PKG_DIR ./package/
wget https://raw.githubusercontent.com/kongfl888/po2lmo/master/po2lmo -O /usr/bin/po2lmo
chmod 777 /usr/bin/po2lmo
ls -l ./package/$PKG_DIR/root/*
mkdir -p ./logs
ls -l ./package/$PKG_DIR/root/* >./logs/lsfiles.txt
make defconfig
#j$(nproc)
make package/$PKG_DIR/compile V=s -j1 BUILD_LOG=1

tar -cJf logs.tar.xz logs
mv logs.tar.xz bin
