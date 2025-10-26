import React from 'react';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/lib/kRoutes";

const TermsAndConditions = () => {
    const t = useTranslations('termsAndConditions');

    return (
        <div className="bg-white font-sans text-foreground">
            <div className="p-2">
                <div className="max-w-[1263px] mx-auto my-[30px] rounded-[3px] text-[#595858] text-[13px]">
                    <div className="px-[30px] py-[25px]">
                        <div className="pb-[25px]">
                            <h1 className="text-[19px] text-[#262626] mb-[5px]">
                                {t("title_main")} <strong className="font-bold">{t("title_strong")}</strong>
                            </h1>

                            <p className="mb-4">{t("p_intro_1")}</p>
                            <p className="mb-4">{t("p_intro_2")}</p>
                            <p>{t("p_intro_3")}</p>
                        </div>

                        <div className="pb-5">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_1")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>
                                <strong>{t("p1_strong")}</strong> {t("p1_text")}
                            </p>
                            <p className="mt-4">{t("p2")}</p>
                            <p className="mt-4">
                                <strong>{t("p3_strong")}</strong> {t("p3_text")}
                            </p>
                            <p className="mt-4">{t("p4")}</p>
                            <p className="mt-4">{t("p5")}</p>
                            <p className="mt-4">{t("p6")}</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_2")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>{t("p_def")}</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>{t("li_def_1")}</li>
                                <li>{t("li_def_2")}</li>
                                <li>{t("li_def_3")}</li>
                                <li>{t("li_def_4")}</li>
                                <li>{t("li_def_5")}</li>
                                <li>{t("li_def_6")}</li>
                                <li>{t("li_def_7")}</li>
                                <li>{t("li_def_8")}</li>
                            </ul>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_3")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>{t("p3_1")}</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>{t("li3_1")}</li>
                                <li>{t("li3_2")}</li>
                            </ul>
                            <p className="mt-4">{t("p3_2")}</p>
                            <p className="mt-4">{t("p3_3")}</p>
                            <p className="mt-4">{t("p3_4")}</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>{t("li3_3")}</li>
                                <li>{t("li3_4")}</li>
                                <li>{t("li3_5")}</li>
                                <li>{t("li3_6")}</li>
                            </ul>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_4")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>
                                {t("p4_1")}
                                <Link href={ROUTES.privacypolicy()}>{t("p4_link")}</Link>
                                {t("p4_2")}
                            </p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_5")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>{t("p5_1")}</p>
                            <p className="mt-4">{t("p5_2")}</p>
                            <p className="mt-4">{t("p5_3")}</p>
                            <p className="mt-4">{t("p5_4")}</p>
                            <p className="mt-4">{t("p5_5")}</p>
                            <p className="mt-4">{t("p5_6")}</p>
                            <ul className="list-disc space-y-2 ml-4">
                                <li>{t("li5_1")}</li>
                                <li>{t("li5_2")}</li>
                                <li>{t("li5_3")}</li>
                                <li>{t("li5_4")}</li>
                            </ul>
                            <p className="mt-4">{t("p5_7")}</p>
                            <p className="mt-4">{t("p5_8")}</p>
                            <p className="mt-4">{t("p5_9")}</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_6")}</h2>
                            </div>
                        </div>

                        <div>
                            <p>{t("p6_1")}</p>
                            <p className="mt-4">{t("p6_2")}</p>
                            <p className="mt-4">{t("p6_3")}</p>
                            <p className="mt-4">{t("p6_4")}</p>
                        </div>

                        <div className="pb-5 mt-4">
                            <div className="pb-[21px] border-b border-[#e5e5e5]">
                                <h2 className="text-[17px] text-[#262626] font-bold text-center">{t("h2_7")}</h2>
                            </div>
                        </div>

                        <div className="pb-5">
                            <p>{t("p7_1")}</p>
                            <p className="mt-4">{t("p7_2")}</p>
                            <p className="mt-4">{t("p7_3")}</p>
                        </div>

                        <div className="py-5 border-t border-[#e5e5e5] text-[12px] text-[#595858]">
                            <p className="mb-4">{t("p_footer")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
