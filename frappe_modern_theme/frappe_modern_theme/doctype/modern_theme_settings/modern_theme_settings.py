# Copyright (c) 2025, Yanky and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ModernThemeSettings(Document):
	pass


@frappe.whitelist()
def get_settings():
	doc = frappe.get_single("Modern Theme Settings")
	return {
		"light_bg": doc.light_bg,
		"dark_bg": doc.dark_bg,
		"enable": bool(doc.enable_wallpaper)
	}