import frappe
from frappe_modern_theme.frappe_modern_theme.doctype.modern_theme_settings.modern_theme_settings import get_settings


@frappe.whitelist()
def get_theme_settings():
    return get_settings()