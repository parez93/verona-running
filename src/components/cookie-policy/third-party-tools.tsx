"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const ThirdPartyTools: React.FC = () => {
    const t = useTranslations("third_party_tools");

    const accordionItemClasses =
        "border border-border rounded-[3px] bg-white shadow-[rgba(0,0,0,0.1)_0px_1px_0px_0px]";
    const accordionTriggerClasses =
        "text-[13px] font-normal text-left text-primary hover:no-underline py-3 pr-[25px] pl-[15px]";
    const accordionContentClasses = "p-[10px] text-[13px] text-[#595858]";

    return (
        <section>
            {/* --- ESPERIENZA --- */}
            <h3 className="mt-6 text-[13px] font-bold text-[#262626]">
                {t("experience.title")}
            </h3>
            <p className="text-[13px] text-[#595858] mt-2 mb-0">
                {t("experience.description")}
            </p>
            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                {t("experience.third_party_heading")}
            </h4>

            {/* FORMALOO */}
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="formaloo" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">
                                {t("experience.accordion.formaloo.title")}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>{t("experience.accordion.formaloo.paragraphs.0")}</p>
                            <p>{t("experience.accordion.formaloo.paragraphs.1")}</p>
                            <p>{t("experience.accordion.formaloo.paragraphs.2")}</p>

                            <div>
                                <p>{t("experience.accordion.formaloo.details.provider")}</p>
                                <p>{t("experience.accordion.formaloo.details.description")}</p>
                                <p>{t("experience.accordion.formaloo.details.data")}</p>
                            </div>

                            <p>
                                {t("experience.accordion.formaloo.details.location")}{" "}
                                <a
                                    href={t(
                                        "experience.accordion.formaloo.details.privacy_link"
                                    )}
                                    className="text-[#0066cc] underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </a>
                                .
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* --- MISURAZIONE --- */}
            <h3 className="mt-6 text-[13px] font-bold text-[#262626]">
                {t("measurement.title")}
            </h3>
            <p className="text-[13px] text-[#595858] mt-2 mb-0">
                {t("measurement.description")}
            </p>
            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                {t("measurement.owner_heading")}
            </h4>

            {/* MATOMO */}
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="matomo" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">
                                {t("measurement.accordion.matomo.title")}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>{t("measurement.accordion.matomo.paragraphs.0")}</p>
                            <p>{t("measurement.accordion.matomo.paragraphs.1")}</p>
                            <div>
                                <p>{t("measurement.accordion.matomo.duration_heading")}</p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>
                                        _pk_cvar*:{" "}
                                        {t(
                                            "measurement.accordion.matomo.duration_list._pk_cvar*"
                                        )}
                                    </li>
                                    <li>
                                        _pk_id*:{" "}
                                        {t(
                                            "measurement.accordion.matomo.duration_list._pk_id*"
                                        )}
                                    </li>
                                    <li>
                                        _pk_ref*:{" "}
                                        {t(
                                            "measurement.accordion.matomo.duration_list._pk_ref*"
                                        )}
                                    </li>
                                    <li>
                                        _pk_ses*:{" "}
                                        {t(
                                            "measurement.accordion.matomo.duration_list._pk_ses*"
                                        )}
                                    </li>
                                    <li>
                                        _pk_testcookie*:{" "}
                                        {t(
                                            "measurement.accordion.matomo.duration_list._pk_testcookie*"
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* --- TERZE PARTI --- */}
            <h4 className="mt-[19px] text-[13px] font-bold text-[#505762]">
                {t("measurement.third_party_heading")}
            </h4>

            {/* TREE-NATION */}
            <Accordion type="single" collapsible className="w-full mt-[21px]">
                <AccordionItem value="tree-nation" className={accordionItemClasses}>
                    <AccordionTrigger className={accordionTriggerClasses}>
                        <div className="flex items-center gap-x-4">
                            <FileText className="h-5 w-5 shrink-0 text-gray-600" />
                            <span className="flex-1">
                                {t(
                                    "measurement.accordion_third_party.tree_nation.title"
                                )}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className={accordionContentClasses}>
                        <div className="space-y-4 pt-2">
                            <p>
                                {t(
                                    "measurement.accordion_third_party.tree_nation.paragraphs.0"
                                )}
                            </p>
                            <p>
                                <a
                                    href={t(
                                        "measurement.accordion_third_party.tree_nation.cookies_policy_link"
                                    )}
                                    className="text-[#0066cc] underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Cookies Policy
                                </a>
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default ThirdPartyTools;
