#
# [K] 2022
# This is free software, licensed under the GNU General Public License v2.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-my-dnshelper
PKG_VERSION:=1.0
PKG_RELEASE:=0

PKG_LICENSE:=GPLv2
PKG_MAINTAINER:=kongfl888
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)

include $(INCLUDE_DIR)/package.mk

define Package/luci-app-my-dnshelper
	SECTION:=luci
	CATEGORY:=LuCI
	SUBMENU:=3. Applications
	TITLE:=luci-app-my-dnshelper
	PKG_MAINTAINER:=K
	PKGARCH:=all
endef

define Package/luci-app-my-dnshelper/description
	luci-app-my-dnshelper
endef

define Build/Prepare
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/conffiles
/etc/config/my-dnshelper
/etc/my-dnshelper/
endef

define Package/$(PKG_NAME)/install
    $(INSTALL_DIR) $(1)/www
	cp -pR ./htdocs/* $(1)/www
	$(INSTALL_DIR) $(1)/
	cp -pR ./root/* $(1)/
	$(INSTALL_DIR) $(1)/usr/lib/lua/luci/i18n
	po2lmo ./po/zh-Hans/my-dnshelper.po $(1)/usr/lib/lua/luci/i18n/my-dnshelper.zh-cn.lmo
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
	chmod a+x ${IPKG_INSTROOT}/etc/init.d/my-dnshelper >/dev/null 2>&1 || echo ""
	chmod a+x ${IPKG_INSTROOT}/usr/share/my-dnshelper/* >/dev/null 2>&1 || echo ""
	chmod a+x ${IPKG_INSTROOT}/usr/bin/my-dnshelper >/dev/null 2>&1 || echo ""
	exit 0
endef

define Package/$(PKG_NAME)/prerm
#!/bin/sh
/etc/init.d/my-dnshelper stop >/dev/null 2>&1
exit 0
endef

define Package/$(PKG_NAME)/postrm
#!/bin/sh
	rm -rf /etc/my-dnshelper >/dev/null 2>&1 || echo ""
	rm -rf /usr/share/my-dnshelper >/dev/null 2>&1 || echo ""
	rm -rf /var/etc/dnsmasq-my-dnshelper.d >/dev/null 2>&1 || echo ""
	rm -f /tmp/luci-* >/dev/null 2>&1 || echo ""
	exit 0
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
