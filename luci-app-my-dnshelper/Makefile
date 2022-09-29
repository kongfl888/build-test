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

LUCI_TITLE:=LuCI App for my-dnshelper which is a helper of dnsmasq.
LUCI_PKGARCH:=all
#LUCI_DEPENDS:=+dnsmasq-full

define Package/$(PKG_NAME)/conffiles
/etc/config/my-dnshelper
/etc/my-dnshelper/
endef

define Package/$(PKG_NAME)/postinst
#!/bin/sh
	chmod a+x ${IPKG_INSTROOT}/etc/init.d/my-dnshelper >/dev/null 2>&1 || echo ""
	chmod a+x ${IPKG_INSTROOT}/usr/share/my-dnshelper/* >/dev/null 2>&1 || echo ""
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

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
