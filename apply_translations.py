#!/usr/bin/env python3
"""Apply translations to sections.jsx components"""

import re

def main():
    filepath = "src/components/sections.jsx"

    with open(filepath, 'r') as f:
        content = f.read()

    # Dictionary of replacements (pattern -> replacement)
    replacements = [
        # About section
        (r'<span className="section-num">01</span>',
         r'<span className="section-num">{t("about.num")}</span>'),
        (r'<span className="eyebrow">Founded 1912</span>',
         r'<span className="eyebrow">{t("about.eyebrow")}</span>'),
        (r'More than a<br /><em>century</em> of play\.',
         r'{t("about.title")}'),

        # Add more...
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    with open(filepath, 'w') as f:
        f.write(content)

    print(f"✅ Applied translations to {filepath}")

if __name__ == "__main__":
    main()
