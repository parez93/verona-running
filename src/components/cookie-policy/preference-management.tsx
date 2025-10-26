import React from "react";
import { useTranslations } from "next-intl";

const PreferenceManagement = () => {
    const t = useTranslations("cookiePolicy.preferenceManagement");

    const browserLinks = [
        { name: t("browserLinks.chrome"), href: "https://support.google.com/chrome/answer/95647?hl=it&p=cpn_cookies" },
        { name: t("browserLinks.firefox"), href: "https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" },
        { name: t("browserLinks.safari"), href: "https://support.apple.com/it-it/guide/safari/manage-cookies-and-website-data-sfri11471/" },
        { name: t("browserLinks.ie"), href: "http://windows.microsoft.com/it-it/windows-vista/block-or-allow-cookies" },
        { name: t("browserLinks.edge"), href: "https://support.microsoft.com/it-it/help/4027947" },
        { name: t("browserLinks.brave"), href: "https://support.brave.com/hc/articles/360022806212-How-do-I-use-Shields-while-browsing" },
        { name: t("browserLinks.opera"), href: "https://help.opera.com/latest/web-preferences/#cookies" }
    ];

    return (
        <div className="pb-[25px]">
            <h2 className="text-[17px] text-[#262626] font-bold mb-4">
                {t("title")}
            </h2>
            <p className="mb-4">{t("paragraph1")}</p>

            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                {t("subsection1.title")}
            </h3>
            <p className="mb-4">{t("subsection1.intro")}</p>

            <ul className="list-disc ml-5 mb-4">
                <li className="mb-2">{t("subsection1.list.item1")}</li>
                <li className="mb-2">{t("subsection1.list.item2")}</li>
                <li className="mb-2">{t("subsection1.list.item3")}</li>
            </ul>

            <p className="mb-4">{t("subsection1.note")}</p>
            <p className="mb-4">{t("subsection1.moreInfo")}</p>

            <ul className="list-disc ml-5 mb-4">
                {browserLinks.map((link) => (
                    <li key={link.name} className="mb-2">
                        <a href={link.href} className="text-link underline" target="_blank" rel="noopener noreferrer">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>

            <p className="mb-4">{t("paragraph2")}</p>

            <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                {t("subsection2.title")}
            </h3>
            <p className="mb-4">{t("subsection2.text")}</p>
        </div>
    );
};

export default PreferenceManagement;
