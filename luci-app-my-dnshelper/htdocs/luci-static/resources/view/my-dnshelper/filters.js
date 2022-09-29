'use strict';
'require form';
'require view';
'require fs';
'require uci';
'require poll';
'require rpc';

return view.extend({
	load: function(){
		return Promise.all([
			fs.lines('/tmp/my-dnshelper/count.txt').then(function(s) {
				var lines=0;
				try{
					console.log(s.length);
					if (s != '') {
						lines=s[0].split(',')[0];
					}
				} catch(e) {}
				return lines;
			}),
			fs.trimmed('/tmp/my-dnshelper/my-dnshelper.updated')
		]);
	},
	render: function(stats){
		var m, s, o, ud,rc;
		rc='';
        rc = stats[0].toString();
		ud = stats[1].trim();
		if (!ud) {ud = _("[Not updated]");}
		if ( ud == "0") {ud = _("Updating..."); rc="?";}

		m = new form.Map('my-dnshelper', _('DNS Filter'),
		_('Support for AdGuardHome / Host / DNSMASQ / Domain rules auto-convert')
		);

		s = m.section(form.TypedSection, 'my-dnshelper');
		s.anonymous = true;

		o = s.option(form.DynamicList, "url", _("Filter Rules Subscription URL"));
		o.value("https://cdn.jsdelivr.net/gh/privacy-protection-tools/anti-AD@master/adblock-for-dnsmasq.conf", _("anti-AD (Privacy-Protect|Preferred)"));
		o.value("https://adguardteam.github.io/AdGuardSmy-dnshelper/Filters/filter.txt", _("AdGuard"));
		o.value("https://easylist-downloads.adblockplus.org/easylistchina+easylist.txt", _("Easylistchina+Easylist"));
		o.value("https://block.energized.pro/extensions/porn-lite/formats/domains.txt", _("Anti-Porn"));
		o.value("https://raw.githubusercontent.com/kongfl888/ad-rules/master/antihosts-gambling-porn.txt", _("Anti-Gambling-Porn"));

		o = s.option(form.Button, "bfilter");
		o.title = _("Subscribe Rules Data");
		o.inputtitle = _("Update");
		o.inputstyle = "apply";
		o.onclick = function () {
			fs.exec('/usr/share/my-dnshelper/waiter',['-u']);
			window.alert(_("Please wait for the background update to complete."));
		};
		o.description = "<strong>"+_("Last Update Checked")+":</strong> %s<br/>".format(ud)+"<strong>"+rc+_("Records")+"</strong><br/>";

		o = s.option(form.Button, "bcfilter");
		o.title = _("Delete Filter Rules");
		o.inputtitle = _("Delete All Subscribe Rules");
		o.inputstyle = "apply";
		o.onclick = function () {
			fs.exec('/usr/share/my-dnshelper/waiter',['--xf']).then(function(s){
				try{
					window.location=location;
				}catch(e){}
			});
		};

		return m.render();

	}

});
