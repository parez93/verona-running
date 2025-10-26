import { Bookmark, ChevronDown } from 'lucide-react';
import React from "react";
import { useTranslations } from "next-intl";

type DetailItemProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    initiallyOpen?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({ title, icon: Icon, children, initiallyOpen = false }) => (
    <details className="group border border-[#e5e5e5] rounded-[3px] overflow-hidden" open={initiallyOpen}>
        <summary className="list-none flex items-center justify-between p-4 cursor-pointer bg-white">
            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-[#333333]" />
                <h3 className="font-bold text-[#262626] text-[13px]">{title}</h3>
            </div>
            <ChevronDown className="h-5 w-5 text-[#333333] transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="px-4 pt-4 pb-4 border-t border-[#e5e5e5] bg-white text-[13px] text-[#595858] leading-relaxed">
            {children}
        </div>
    </details>
);

const DefinitionsLegalReferences = () => {
    const t = useTranslations("cookiePolicy.definitions");

    return (
        <div className="pt-[21px]">
            <ul className="list-none space-y-[21px]">
                <li>
                    <DetailItem
                        title={t("title")}
                        icon={Bookmark}
                        initiallyOpen={true}
                    >
                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.personalData.title")}
                        </h3>
                        <p className="mb-4">{t("items.personalData.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.usageData.title")}
                        </h3>
                        <p className="mb-4">{t("items.usageData.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.user.title")}
                        </h3>
                        <p className="mb-4">{t("items.user.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.dataSubject.title")}
                        </h3>
                        <p className="mb-4">{t("items.dataSubject.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.dataProcessor.title")}
                        </h3>
                        <p className="mb-4">{t("items.dataProcessor.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.dataController.title")}
                        </h3>
                        <p className="mb-4">{t("items.dataController.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.website.title")}
                        </h3>
                        <p className="mb-4">{t("items.website.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.service.title")}
                        </h3>
                        <p className="mb-4">{t("items.service.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.eu.title")}
                        </h3>
                        <p className="mb-4">{t("items.eu.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.cookie.title")}
                        </h3>
                        <p className="mb-4">{t("items.cookie.text")}</p>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.trackingTool.title")}
                        </h3>
                        <p className="mb-4">{t("items.trackingTool.text")}</p>

                        <div className="my-6 border-t border-gray-300"></div>

                        <h3 className="text-[13px] text-[#262626] font-bold mb-2">
                            {t("items.legalReferences.title")}
                        </h3>
                        <p className="mb-4">{t("items.legalReferences.text")}</p>
                    </DetailItem>
                </li>
            </ul>
        </div>
    );
};

export default DefinitionsLegalReferences;
